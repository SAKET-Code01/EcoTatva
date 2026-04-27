import { Leaf, Flame, Cloud, Droplet, TreePine, Award, Calendar } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Profile Section */}
      <div className="bg-gradient-to-r from-[#f0f9f0] to-[#e6f4e8] rounded-3xl p-8 flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-shrink-0">
          {/* Gender-neutral SK initials avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-inner">
            SK
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <h1 className="text-4xl font-bold text-gray-900">Saket Kumar Seth</h1>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-3xl text-sm font-medium flex items-center gap-1">
              <Leaf size={16} /> Eco Warrior
            </span>
            <span className="text-green-600 font-medium">• Level 3</span>
          </div>

          <p className="text-gray-600 mt-3 text-lg">"Be the change you wish to see in the world."</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="text-green-600">📍</span>
              <span>Rourkela, Odisha</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">📅</span>
              <span>Joined Jan 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✉️</span>
              <span>saketkumar16102006@gmail.com</span>
            </div>
          </div>
        </div>

        <button className="px-8 py-3 bg-white border border-green-600 text-green-600 rounded-3xl font-semibold hover:bg-green-50 transition-colors flex items-center gap-2 self-start lg:self-center">
          ✏️ Edit Profile
        </button>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: "🌱", value: "1,250", label: "Eco Points", trend: "+120 this week" },
          { icon: "⚡", value: "80", label: "Energy", trend: "Refills in 02:30:15" },
          { icon: "🔥", value: "5", label: "Day Streak", trend: "Keep it up! 🔥" },
          { icon: "🌳", value: "24", label: "Trees Planted", trend: "Keep growing! 🌱" },
          { icon: "🌍", value: "3.2 kg", label: "CO₂ Reduced", trend: "Great impact! 💚" },
          { icon: "💧", value: "1,250 L", label: "Water Saved", trend: "Keep saving! 💧" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xs text-green-600 mt-1">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Achievements + Recent Activity + Impact Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Achievements */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Achievements</h3>
            <span className="text-green-600 cursor-pointer text-sm">View All →</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {["🌱", "🌿", "💧", "♻️", "📚"].map((badge, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                  {badge}
                </div>
                <p className="text-xs mt-2 font-medium text-gray-700">Badge {i+1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <span className="text-2xl">🌳</span>
              <div>
                <p className="font-medium">Planted 5 trees today</p>
                <p className="text-green-600 text-xs">+50 XP • 2 hours ago</p>
              </div>
            </div>
            {/* Add more activity items as needed */}
          </div>
        </div>

        {/* Impact Overview */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-green-200 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">65%</div>
              <div className="text-xs text-gray-500 -mt-1">Great Progress!</div>
            </div>
          </div>
          <p className="mt-6 text-sm font-medium text-gray-700">You're doing amazing!</p>
        </div>
      </div>

      {/* More sections can be added later (Streak Calendar, Eco Personality, etc.) */}
    </div>
  );
};

export default Profile;