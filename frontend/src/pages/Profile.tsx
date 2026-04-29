import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Leaf, Edit3, X, Upload, Camera, Mail, Calendar,
  TrendingUp, Droplets, Wind, TreePine, Zap, Flame, Star,
  Lock, CheckCircle, Loader2, AlertCircle,
} from 'lucide-react';
import {
  doc, getDoc, collection, query, where, orderBy,
  limit, getDocs, setDoc, serverTimestamp,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';

// ─────────────────────── Types ───────────────────────
interface UserProfile {
  displayName?: string;
  bio?: string;
  photoURL?: string;
  ecoPoints?: number;
  streak?: number;
  level?: number;
  joinedAt?: { toDate: () => Date } | null;
}
interface TaskDoc {
  userId: string;
  status: string;
  ecoPoints?: number;
  co2Reduced?: number;
  waterSaved?: number;
  treesPlanted?: number;
  completedAt?: { toDate: () => Date } | null;
  taskName?: string;
}
interface StatsState {
  ecoPoints: number;
  streak: number;
  treesPlanted: number;
  co2Reduced: number;
  waterSaved: number;
  completedTasks: number;
  level: number;
}
interface ActivityItem {
  id: string;
  taskName: string;
  ecoPoints: number;
  completedAt: Date | null;
  icon: string;
}

// ─────────────────────── Constants ───────────────────────
const FALLBACK_AVATAR = 'https://api.dicebear.com/7.x/initials/svg?seed=EcoTatva&backgroundColor=10b981'; // clean gender-neutral avatar
const FALLBACK_BIO = '"Be the change you wish to see in the world."';

function getLevelTitle(level: number): string {
  if (level <= 2) return 'Eco Sprout';
  if (level <= 5) return 'Eco Warrior';
  if (level <= 9) return 'Eco Champion';
  return 'Eco Legend';
}
function getLevelColor(level: number): string {
  if (level <= 2) return 'bg-emerald-100 text-emerald-700';
  if (level <= 5) return 'bg-green-100 text-green-700';
  if (level <= 9) return 'bg-teal-100 text-teal-700';
  return 'bg-lime-100 text-lime-800';
}
function formatJoinedDate(iso?: string | null): string {
  if (!iso) return 'Recently';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
function relativeTime(date: Date | null): string {
  if (!date) return 'some time ago';
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}
function capitalize(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
function getImpactLabel(pct: number): string {
  if (pct === 0) return 'Getting Started!';
  if (pct <= 25) return 'Getting Started!';
  if (pct <= 50) return 'Making Progress!';
  if (pct <= 75) return 'Great Progress!';
  if (pct < 100) return 'Almost There!';
  return 'Eco Master! 🏆';
}
function getTaskIcon(taskName?: string): string {
  if (!taskName) return '🌱';
  const n = taskName.toLowerCase();
  if (n.includes('tree') || n.includes('plant')) return '🌳';
  if (n.includes('water') || n.includes('save')) return '💧';
  if (n.includes('recycle') || n.includes('waste')) return '♻️';
  if (n.includes('energy') || n.includes('electric')) return '⚡';
  if (n.includes('co2') || n.includes('carbon') || n.includes('air')) return '🌍';
  return '🌱';
}

// ─────────────────────── Skeleton ───────────────────────
function StatSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm animate-pulse">
      <div className="w-10 h-10 bg-gray-100 rounded-full mb-3" />
      <div className="h-7 w-16 bg-gray-100 rounded mb-2" />
      <div className="h-3 w-20 bg-gray-100 rounded" />
    </div>
  );
}

// ─────────────────────── Edit Profile Modal ───────────────────────
interface EditModalProps {
  initialName: string;
  initialBio: string;
  initialPhotoURL: string;
  uid: string;
  onClose: () => void;
  onSaved: (name: string, bio: string, photo: string) => void;
}
function EditModal({ initialName, initialBio, initialPhotoURL, uid, onClose, onSaved }: EditModalProps) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio === FALLBACK_BIO ? '' : initialBio);
  const [photoURL] = useState(initialPhotoURL);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewURL, setPreview] = useState(initialPhotoURL);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setToast({ type: 'error', msg: 'Display name cannot be empty.' });
      return;
    }
    setSaving(true);
    setToast(null);
    try {
      let finalPhotoURL = photoURL;
      if (photoFile) {
        const storageRef = ref(storage, `profilePhotos/${uid}`);
        await uploadBytes(storageRef, photoFile);
        finalPhotoURL = await getDownloadURL(storageRef);
      }
      const finalName = capitalize(name.trim());
      const finalBio = bio.trim() || FALLBACK_BIO;
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        displayName: finalName,
        bio: finalBio,
        photoURL: finalPhotoURL,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: finalName,
          photoURL: finalPhotoURL,
        });
      }
      setToast({ type: 'success', msg: 'Profile saved successfully!' });
      setTimeout(() => {
        onSaved(finalName, finalBio, finalPhotoURL);
        onClose();
      }, 900);
    } catch (err) {
      console.error('Profile save error:', err);
      setToast({ type: 'error', msg: 'Failed to save. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5 flex items-center justify-between border-b border-green-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Edit3 size={20} className="text-green-600" />
            Edit Profile
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-6 space-y-5">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={previewURL || FALLBACK_AVATAR}
                alt="Preview"
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_AVATAR; }}
              />
              <button onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
              <Upload size={14} />
              Upload new photo
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 placeholder-gray-400 text-sm transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / Quote</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder={FALLBACK_BIO}
              rows={3}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 placeholder-gray-400 text-sm resize-none transition-all"
            />
          </div>
          {toast && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium ${toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {toast.msg}
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} disabled={saving} className="flex-1 py-2.5 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-2xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
              {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────── Main Profile Component ───────────────────────
const Profile = () => {
  const { currentUser } = useAuth();
  const [firestoreProfile, setFirestoreProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<StatsState | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState(FALLBACK_BIO);
  const [avatarURL, setAvatarURL] = useState(FALLBACK_AVATAR);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const uid = currentUser.uid;
    const fetchAll = async () => {
      setLoading(true);
      try {
        const userSnap = await getDoc(doc(db, 'users', uid));
        const profile: UserProfile = userSnap.exists() ? (userSnap.data() as UserProfile) : {};
        setFirestoreProfile(profile);

        const rawName = profile.displayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'Eco User';
        setDisplayName(capitalize(rawName));
        setBio(profile.bio || FALLBACK_BIO);

        // PRIORITY ORDER YOU ASKED FOR:
        // 1. User-uploaded photo from Firestore
        // 2. Real Google profile photo
        // 3. Clean gender-neutral avatar
        setAvatarURL(profile.photoURL || currentUser.photoURL || FALLBACK_AVATAR);

        // rest of stats & activity (kept 100% same)
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', uid),
          where('status', '==', 'completed')
        );
        const tasksSnap = await getDocs(tasksQuery);
        const tasks = tasksSnap.docs.map(d => d.data() as TaskDoc);

        const completedTasks = tasks.length;
        const totalEcoPoints = tasks.reduce((s, t) => s + (t.ecoPoints ?? 0), 0);
        const totalCO2 = tasks.reduce((s, t) => s + (t.co2Reduced ?? 0), 0);
        const totalWater = tasks.reduce((s, t) => s + (t.waterSaved ?? 0), 0);
        const totalTrees = tasks.reduce((s, t) => s + (t.treesPlanted ?? 0), 0);

        setStats({
          ecoPoints: totalEcoPoints || (profile.ecoPoints ?? 0),
          streak: profile.streak ?? 0,
          treesPlanted: totalTrees,
          co2Reduced: totalCO2,
          waterSaved: totalWater,
          completedTasks,
          level: profile.level ?? 1,
        });

        const recentQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', uid),
          where('status', '==', 'completed'),
          orderBy('completedAt', 'desc'),
          limit(5)
        );
        const recentSnap = await getDocs(recentQuery);
        const recentItems: ActivityItem[] = recentSnap.docs.map(d => {
          const data = d.data() as TaskDoc;
          return {
            id: d.id,
            taskName: data.taskName || 'Eco Task',
            ecoPoints: data.ecoPoints ?? 0,
            completedAt: data.completedAt ? data.completedAt.toDate() : null,
            icon: getTaskIcon(data.taskName),
          };
        });
        setActivity(recentItems);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setStats({
          ecoPoints: 0, streak: 0, treesPlanted: 0,
          co2Reduced: 0, waterSaved: 0, completedTasks: 0, level: 1,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [currentUser]);

  const handleProfileSaved = useCallback((name: string, bio: string, photo: string) => {
    setDisplayName(name);
    setBio(bio);
    setAvatarURL(photo || currentUser?.photoURL || FALLBACK_AVATAR);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbf8]">
        <div className="text-center space-y-3">
          <Loader2 size={32} className="animate-spin text-green-500 mx-auto" />
          <p className="text-gray-500 font-medium">Loading profile…</p>
        </div>
      </div>
    );
  }

  const level = stats?.level ?? firestoreProfile?.level ?? 1;
  const levelTitle = getLevelTitle(level);
  const levelColor = getLevelColor(level);
  const joinedDate = formatJoinedDate(currentUser.metadata?.creationTime);
  const impactPct = Math.min(100, Math.round(((stats?.ecoPoints ?? 0) / 5000) * 100));
  const impactLabel = getImpactLabel(impactPct);
  const ct = stats?.completedTasks ?? 0;
  const tw = stats?.treesPlanted ?? 0;
  const ws = stats?.waterSaved ?? 0;

  const badges = [
    { emoji: '🌱', name: 'First Step', unlocked: ct >= 1 },
    { emoji: '🌿', name: 'Green Thumb', unlocked: tw >= 5 },
    { emoji: '💧', name: 'Water Saver', unlocked: ws >= 100 },
    { emoji: '♻️', name: 'Recycler', unlocked: ct >= 10 },
    { emoji: '📚', name: 'Learner', unlocked: ct >= 20 },
  ];

  const statCards = [
    { icon: <span className="text-4xl">🌱</span>, value: (stats?.ecoPoints ?? 0).toLocaleString(), label: 'Eco Points', trend: '+XP from tasks', color: 'text-green-600' },
    { icon: <Zap size={28} className="text-yellow-500" />, value: '80', label: 'Energy', trend: 'Refills over time', color: 'text-yellow-600' },
    { icon: <Flame size={28} className="text-orange-500" />, value: String(stats?.streak ?? 0), label: 'Day Streak', trend: stats?.streak ? 'Keep it up! 🔥' : 'Start your streak!', color: 'text-orange-600' },
    { icon: <TreePine size={28} className="text-emerald-600" />, value: String(stats?.treesPlanted ?? 0), label: 'Trees Planted', trend: 'Keep growing! 🌱', color: 'text-emerald-600' },
    { icon: <Wind size={28} className="text-blue-500" />, value: `${(stats?.co2Reduced ?? 0).toFixed(1)} kg`, label: 'CO₂ Reduced', trend: 'Great impact! 💚', color: 'text-blue-600' },
    { icon: <Droplets size={28} className="text-cyan-500" />, value: `${(stats?.waterSaved ?? 0).toLocaleString()} L`, label: 'Water Saved', trend: 'Keep saving! 💧', color: 'text-cyan-600' },
  ];

  return (
    <>
      {showModal && (
        <EditModal
          initialName={displayName}
          initialBio={bio}
          initialPhotoURL={avatarURL}
          uid={currentUser.uid}
          onClose={() => setShowModal(false)}
          onSaved={handleProfileSaved}
        />
      )}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* HERO SECTION – FULLY DYNAMIC (real Google photo first + clean gender-neutral fallback) */}
        <div className="bg-gradient-to-r from-[#f0f9f0] to-[#e6f4e8] rounded-3xl p-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <img
              src={avatarURL}
              alt={displayName}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_AVATAR; }}
            />
          </div>

          <div className="flex-1 text-center lg:text-left min-w-0">
            <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap">
              <h1 className="text-4xl font-bold text-gray-900">{displayName}</h1>
              <span className={`${levelColor} px-4 py-1 rounded-3xl text-sm font-medium flex items-center gap-1`}>
                <Leaf size={16} />
                {levelTitle}
              </span>
              <span className="text-green-600 font-medium">• Level {level}</span>
            </div>
            <p className="text-gray-600 mt-3 text-lg italic">{bio}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm justify-center lg:justify-start text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-green-600" />
                <span>{currentUser.email || 'No email'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 bg-white border border-green-600 text-green-600 rounded-3xl font-semibold hover:bg-green-50 active:scale-95 transition-all flex items-center gap-2 self-start lg:self-center shadow-sm whitespace-nowrap"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        {/* ALL OTHER ADVANCED SECTIONS KEPT EXACTLY AS BEFORE */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)
            : statCards.map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                <div className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</div>
              </div>
            ))
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Achievements */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Star size={20} className="text-yellow-500" />
                Achievements
              </h3>
              <span className="text-green-600 cursor-pointer text-sm font-medium hover:underline">
                View All →
              </span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {badges.map((badge, i) => (
                <div key={i} className="text-center group">
                  <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl shadow-inner relative transition-all duration-200 ${badge.unlocked ? 'bg-gradient-to-br from-green-100 to-emerald-100 group-hover:scale-105' : 'bg-gray-100 grayscale'}`}>
                    {badge.emoji}
                    {!badge.unlocked && (
                      <div className="absolute inset-0 rounded-2xl bg-white/60 flex items-center justify-center">
                        <Lock size={14} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <p className={`text-xs mt-2 font-medium ${badge.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{badges.filter(b => b.unlocked).length} / {badges.length} unlocked</span>
                <div className="flex gap-1">
                  {badges.map((b, i) => <div key={i} className={`w-2 h-2 rounded-full ${b.unlocked ? 'bg-green-500' : 'bg-gray-200'}`} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-600" />
              Recent Activity
            </h3>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-gray-100 rounded-2xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="text-5xl mb-3">🌱</span>
                <p className="text-gray-500 text-sm leading-relaxed">
                  No activity yet.<br />
                  <span className="text-green-600 font-medium">Start your first eco task!</span>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activity.map(item => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{item.taskName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-green-600 text-xs font-medium">+{item.ecoPoints} XP</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-400 text-xs">{relativeTime(item.completedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Impact Overview */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900 w-full text-center">Impact Overview</h3>
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#d1fae5" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 50}`} strokeDashoffset={`${2 * Math.PI * 50 * (1 - impactPct / 100)}`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-green-600">{impactPct}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-gray-700">{impactLabel}</p>
              <p className="text-xs text-gray-400 mt-1">{(stats?.ecoPoints ?? 0).toLocaleString()} / 5,000 XP goal</p>
            </div>
            <div className="w-full space-y-2 pt-2 border-t border-gray-100">
              {[
                { label: 'Tasks Done', value: ct, icon: <CheckCircle size={13} className="text-green-500" /> },
                { label: 'Trees', value: `${tw} planted`, icon: <TreePine size={13} className="text-emerald-500" /> },
                { label: 'CO₂ Saved', value: `${(stats?.co2Reduced ?? 0).toFixed(1)} kg`, icon: <Wind size={13} className="text-blue-400" /> },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    {row.icon}
                    {row.label}
                  </div>
                  <span className="font-semibold text-gray-700">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;