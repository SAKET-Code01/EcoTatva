 import {
  Leaf,
  Flame,
  Cloud,
  CheckCircle2,
  CalendarDays,
  Award,
  ArrowUp,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Upload,
  Gamepad2,
  BookOpen,
  Bot,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ── Eco landscape illustration ──────────────────────────────────────────
const EcoIllustration = () => (
  <svg
    viewBox="0 0 560 200"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 top-0 h-full w-auto pointer-events-none"
    aria-hidden="true"
  >
    {/* Background hills */}
    <path
      d="M60 200 Q170 145 280 168 Q390 192 480 148 Q520 130 560 152 L560 200Z"
      fill="#bbf7d0"
      opacity="0.55"
    />
    <path
      d="M0 200 Q90 158 200 178 Q320 200 430 165 Q498 148 560 170 L560 200 L0 200Z"
      fill="#86efac"
      opacity="0.4"
    />

    {/* Globe */}
    <circle cx="370" cy="95" r="62" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
    {/* Equator */}
    <ellipse cx="370" cy="95" rx="62" ry="18" stroke="#93c5fd" strokeWidth="1" fill="none" />
    {/* Latitude rings */}
    <path d="M312 72 Q370 55 428 72" stroke="#93c5fd" strokeWidth="0.8" fill="none" />
    <path d="M310 118 Q370 135 430 118" stroke="#93c5fd" strokeWidth="0.8" fill="none" />
    {/* Longitude */}
    <path
      d="M370 33 Q392 64 392 95 Q392 126 370 157"
      stroke="#93c5fd" strokeWidth="1" fill="none"
    />
    <path
      d="M370 33 Q348 64 348 95 Q348 126 370 157"
      stroke="#93c5fd" strokeWidth="1" fill="none"
    />
    <line x1="370" y1="33" x2="370" y2="157" stroke="#93c5fd" strokeWidth="1" />

    {/* Wind turbine 1 — tall, left */}
    <line x1="192" y1="166" x2="192" y2="58" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <line x1="192" y1="58" x2="172" y2="24" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="192" y1="58" x2="216" y2="36" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="192" y1="58" x2="178" y2="84" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="192" cy="58" r="3.5" fill="#94a3b8" />

    {/* Wind turbine 2 — medium, mid */}
    <line x1="248" y1="168" x2="248" y2="108" stroke="#d1d5db" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="248" y1="108" x2="234" y2="84" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
    <line x1="248" y1="108" x2="266" y2="90" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
    <line x1="248" y1="108" x2="238" y2="128" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
    <circle cx="248" cy="108" r="2.5" fill="#9ca3af" />

    {/* Wind turbine 3 — small, far right */}
    <line x1="500" y1="165" x2="500" y2="100" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
    <line x1="500" y1="100" x2="486" y2="76" stroke="#e5e7eb" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="500" y1="100" x2="517" y2="82" stroke="#e5e7eb" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="500" y1="100" x2="492" y2="120" stroke="#e5e7eb" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="500" cy="100" r="2.5" fill="#9ca3af" />

    {/* Trees — left cluster */}
    <polygon points="36,174 55,128 74,174" fill="#4ade80" opacity="0.72" />
    <polygon points="60,178 80,136 100,178" fill="#22c55e" opacity="0.82" />
    <polygon points="20,180 38,148 56,180" fill="#86efac" opacity="0.62" />

    {/* Trees — right cluster */}
    <polygon points="524,172 542,130 560,172" fill="#4ade80" opacity="0.72" />
    <polygon points="504,178 524,134 544,178" fill="#22c55e" opacity="0.82" />

    {/* Birds */}
    <path d="M118 44 Q124 38 130 44 Q136 38 142 44" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M448 32 Q453 27 458 32 Q463 27 468 32" stroke="#94a3b8" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    <path d="M470 54 Q474 50 478 54 Q482 50 486 54" stroke="#b0b8c4" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

// ── Metric card ──────────────────────────────────────────────────────────
interface MetricCardProps {
  title: string;
  value: string;
  note: string;
  notePrefix: React.ReactNode;
  iconBg: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, note, notePrefix, iconBg, icon }: MetricCardProps) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-[2.1rem] font-bold mt-1.5 text-gray-900 leading-none">{value}</h3>
      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
        {notePrefix}
        {note}
      </p>
    </div>
    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      {icon}
    </div>
  </div>
);

// ── Main Dashboard component ─────────────────────────────────────────────
const Dashboard = () => {
  const { currentUser } = useAuth();

  const firstName =
    currentUser?.displayName?.split(' ')[0] ??
    currentUser?.email?.split('@')[0] ??
    'Eco Warrior';

  return (
    <div className="space-y-5">

      {/* ── Welcome banner ─────────────────────────────────────────── */}
      <section className="relative rounded-2xl bg-gradient-to-r from-[#f0fdf4] via-[#e8f8ee] to-[#dcfce7] px-8 py-7 overflow-hidden min-h-[148px]">
        <EcoIllustration />
        <div className="relative z-10 max-w-sm">
          <h1 className="text-[1.75rem] font-bold text-gray-900">
            Welcome back, {firstName}! 🌿
          </h1>
          <p className="text-gray-500 mt-1.5 text-[15px] leading-snug">
            Every action counts. Let's make our planet better together.
          </p>
        </div>
      </section>

      {/* ── Metric cards ───────────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          title="Total XP"
          value="1,200"
          note="150 XP today"
          notePrefix={<ArrowUp size={13} className="text-green-500 flex-shrink-0" />}
          iconBg="bg-green-600"
          icon={<Leaf size={22} className="text-white" strokeWidth={2.5} />}
        />
        <MetricCard
          title="Current Streak"
          value="5 Days"
          note="Keep it up!"
          notePrefix={<Flame size={13} className="text-orange-400 flex-shrink-0" />}
          iconBg="bg-orange-500"
          icon={<Flame size={22} className="text-white" strokeWidth={2.5} />}
        />
        <MetricCard
          title="CO₂ Saved"
          value="3.2 kg"
          note="This month"
          notePrefix={<Leaf size={13} className="text-green-400 flex-shrink-0" />}
          iconBg="bg-blue-500"
          icon={<Cloud size={22} className="text-white" strokeWidth={2.5} />}
        />
        <MetricCard
          title="Tasks Completed"
          value="12"
          note="This month"
          notePrefix={<CalendarDays size={13} className="text-gray-400 flex-shrink-0" />}
          iconBg="bg-purple-600"
          icon={<CheckCircle2 size={22} className="text-white" strokeWidth={2.5} />}
        />
      </section>

      {/* ── Middle row: Task · Events · Leaderboard ─────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Today's Task */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 size={15} className="text-gray-400" />
              <h2 className="font-semibold text-sm">Today's Task</h2>
            </div>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
              View All
            </button>
          </div>

          <div className="flex items-start gap-4 bg-[#f4fcf5] rounded-xl p-4">
            <div className="w-[60px] h-[60px] bg-green-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              🗑️
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">Segregate Waste</p>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                Separate dry and wet waste and upload a proof image.
              </p>
              <p className="mt-2.5 text-xs text-gray-500">
                Reward:{' '}
                <span className="text-green-600 font-semibold">🌿 50 XP</span>
              </p>
            </div>
          </div>

          <button className="mt-3 w-full py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 active:bg-green-800 transition-colors">
            Start Task
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-700">Upcoming Events</h2>
            </div>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: 'Tree Plantation Drive',
                location: 'Rourkela Park',
                date: '30 Apr, 2025',
                emoji: '🌳',
                bg: 'bg-green-100',
              },
              {
                name: 'Cleanliness Campaign',
                location: 'City Center',
                date: '02 May, 2025',
                emoji: '🧹',
                bg: 'bg-sky-50',
              },
            ].map((ev) => (
              <div key={ev.name} className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${ev.bg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}
                >
                  {ev.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{ev.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="flex-shrink-0" />
                    {ev.location}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <CalendarDays size={10} className="flex-shrink-0" />
                    {ev.date}
                  </p>
                </div>
                <button className="flex-shrink-0 text-xs font-semibold text-green-700 border border-green-200 rounded-lg px-2.5 py-1.5 hover:bg-green-50 transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={15} className="text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-700">Leaderboard</h2>
            </div>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-1.5">
            {(
              [
                { rank: 1, name: 'Rahul Sharma', xp: '2,000 XP', medal: '🥇', isYou: false, avatarBg: 'bg-amber-100', avatarText: 'text-amber-700' },
                { rank: 2, name: 'You',          xp: '1,200 XP', medal: '🥈', isYou: true,  avatarBg: 'bg-green-100', avatarText: 'text-green-700' },
                { rank: 3, name: 'Aman Verma',   xp: '950 XP',  medal: '🥉', isYou: false, avatarBg: 'bg-orange-100', avatarText: 'text-orange-700' },
                { rank: 4, name: 'Sneha Patil',  xp: '800 XP',  medal: null, isYou: false, avatarBg: 'bg-pink-100',  avatarText: 'text-pink-700' },
                { rank: 5, name: 'Raj Kumar',    xp: '700 XP',  medal: null, isYou: false, avatarBg: 'bg-blue-100',  avatarText: 'text-blue-700' },
              ] as const
            ).map(({ rank, name, xp, medal, isYou, avatarBg, avatarText }) => (
              <div
                key={rank}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                  isYou ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                {/* Medal / rank number */}
                <span className="w-6 text-center text-base leading-none flex-shrink-0">
                  {medal ?? (
                    <span className="text-xs font-semibold text-gray-400">{rank}</span>
                  )}
                </span>

                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full ${avatarBg} flex items-center justify-center text-xs font-bold ${avatarText} flex-shrink-0`}
                >
                  {name.charAt(0)}
                </div>

                {/* Name */}
                <span
                  className={`flex-1 truncate font-medium ${
                    isYou ? 'text-green-700' : 'text-gray-700'
                  }`}
                >
                  {isYou
                    ? `You (${firstName})`
                    : name}
                </span>

                {/* XP */}
                <span className="text-xs font-medium text-gray-400 flex-shrink-0">{xp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom row: XP · Badges · Community ────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* XP Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ArrowUp size={15} className="text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-700">XP Progress</h2>
            </div>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
              View Details
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Hexagon level badge */}
            <div className="flex-shrink-0">
              <svg viewBox="0 0 80 88" className="w-[60px] h-[66px]" fill="none">
                <path
                  d="M40 3 L76 23 L76 65 L40 85 L4 65 L4 23 Z"
                  fill="#16a34a"
                  stroke="#15803d"
                  strokeWidth="1.5"
                />
                <text x="40" y="56" textAnchor="middle" fontSize="26" fill="white">
                  🌿
                </text>
              </svg>
            </div>

            <div className="flex-1">
              <p className="font-bold text-gray-900">Level 3</p>
              <p className="text-sm text-gray-500">Eco Warrior</p>
              <div className="mt-2.5 w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                  style={{ width: '66%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">1,200 / 1,800 XP</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
            <Leaf size={12} className="text-green-500 flex-shrink-0" />
            Next Level: Eco Champion
          </p>
        </div>

        {/* Badges Earned */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={15} className="text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-700">Badges Earned</h2>
            </div>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🌱', label: 'Plant Lover',    bg: 'bg-green-100' },
              { emoji: '♻️', label: 'Waste Warrior',  bg: 'bg-green-50'  },
              { emoji: '💧', label: 'Water Saver',    bg: 'bg-sky-50'    },
              { emoji: '🔭', label: 'Eco Explorer',   bg: 'bg-purple-50' },
            ].map(({ emoji, label, bg }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-[52px] h-[52px] rounded-2xl ${bg} flex items-center justify-center text-2xl`}
                >
                  {emoji}
                </div>
                <span className="text-[10px] text-gray-500 text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle size={15} className="text-gray-400" />
              <h2 className="font-semibold text-sm text-gray-700">Community Feed</h2>
            </div>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
              View All
            </button>
          </div>

          {/* Post */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-sm font-bold text-pink-700 flex-shrink-0">
                S
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">Sneha Patil</p>
                <p className="text-[11px] text-gray-400">2h ago</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-snug mb-3">
            Completed my 7-day plastic free challenge! Let's keep our planet clean and green 🌍💚
          </p>

          {/* Post image placeholder */}
          <div className="w-full h-[108px] rounded-xl bg-gradient-to-br from-green-300 via-green-400 to-teal-400 flex items-center justify-center mb-3 overflow-hidden relative">
            <span className="text-5xl opacity-60">🌿</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
              <Heart size={14} />
              <span>24</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
              <MessageCircle size={14} />
              <span>5</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-green-600 transition-colors ml-auto">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Quick Actions ───────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="text-center flex-shrink-0">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide leading-tight">
              Quick
            </p>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide leading-tight">
              Actions
            </p>
          </div>

          <div className="w-px h-9 bg-gray-100 flex-shrink-0" />

          <div className="flex flex-wrap gap-2 flex-1">
            {[
              { icon: <Upload size={14} />,        label: 'Upload Proof' },
              { icon: <CalendarDays size={14} />,  label: 'Join Event'   },
              { icon: <BookOpen size={14} />,      label: 'Take Quiz'    },
              { icon: <Gamepad2 size={14} />,      label: 'Play Game'    },
              { icon: <Bot size={14} />,           label: 'Read Article' },
            ].map(({ icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EcoBot floating widget ──────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
        {/* Tooltip bubble */}
        <div className="bg-white border border-gray-100 rounded-2xl rounded-br-sm shadow-lg px-4 py-3 text-sm max-w-[200px]">
          <p className="font-semibold text-gray-800 text-xs">Hi! I'm EcoBot</p>
          <p className="text-gray-500 text-xs mt-0.5">How can I help you?</p>
        </div>
        {/* FAB */}
        <button
          type="button"
          className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          aria-label="Open EcoBot"
        >
          <Bot size={22} strokeWidth={2} />
        </button>
      </div>

    </div>
  );
};

export default Dashboard;