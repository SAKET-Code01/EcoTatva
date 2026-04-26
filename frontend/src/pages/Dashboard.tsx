import {
  Leaf,
  Flame,
  Cloud,
  CheckCircle2,
  CalendarDays,
  Award,
  ArrowUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const stats = [
  {
    title: 'Total XP',
    value: '1,200',
    note: '+150 XP today',
    color: 'bg-green-50 text-green-700',
    icon: <Leaf size={24} />,
  },
  {
    title: 'Current Streak',
    value: '5 Days',
    note: 'Keep it up!',
    color: 'bg-orange-50 text-orange-600',
    icon: <Flame size={24} />,
  },
  {
    title: 'CO₂ Saved',
    value: '3.2 kg',
    note: 'This month',
    color: 'bg-blue-50 text-blue-600',
    icon: <Cloud size={24} />,
  },
  {
    title: 'Tasks Completed',
    value: '12',
    note: 'This month',
    color: 'bg-purple-50 text-purple-600',
    icon: <CheckCircle2 size={24} />,
  },
];

const Dashboard = () => {
  const { currentUser } = useAuth();

  const userName =
    currentUser?.displayName?.split(' ')[0] ||
    currentUser?.email?.split('@')[0] ||
    'User';

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-[#f8fcf6] to-[#eef8ef] px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {userName}! 🌿
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          Every action counts. Let’s make our planet better together.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-4xl font-bold mt-2 text-gray-900">
                {item.value}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{item.note}</p>
            </div>

            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Today's Task</h2>
            <button className="text-green-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="rounded-2xl bg-[#f8fcf8] p-5 flex items-center justify-between gap-5">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Segregate Waste
              </h3>

              <p className="text-gray-600 mt-2 max-w-md">
                Separate dry and wet waste and upload a proof image.
              </p>

              <p className="mt-4 text-sm text-gray-500">Reward: 50 XP</p>
            </div>

            <button className="px-5 py-3 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700">
              Start Task
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Leaderboard</h2>
            <button className="text-green-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4 text-sm">
            {[
              ['Rahul Sharma', '2000 XP'],
              ['You', '1200 XP'],
              ['Aman Verma', '950 XP'],
              ['Sneha Patil', '800 XP'],
            ].map(([name, xp], i) => (
              <div
                key={name}
                className={`flex items-center justify-between rounded-2xl px-3 py-2 ${i === 1 ? 'bg-green-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold w-5">{i + 1}</span>
                  <span>{name}</span>
                </div>

                <span className="text-gray-500">{xp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUp size={18} className="text-green-600" />
            <h3 className="font-semibold text-lg">XP Progress</h3>
          </div>

          <p className="text-sm text-gray-500">Level 3 • Eco Warrior</p>

          <div className="w-full h-3 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full w-2/3 bg-green-600 rounded-full"></div>
          </div>

          <p className="text-sm text-gray-500 mt-3">1,200 / 1,800 XP</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-green-600" />
            <h3 className="font-semibold text-lg">Badges Earned</h3>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            {['🌱', '♻️', '💧', '🔭'].map((badge) => (
              <div
                key={badge}
                className="h-14 rounded-2xl bg-[#f8fcf8] flex items-center justify-center text-2xl"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={18} className="text-green-600" />
            <h3 className="font-semibold text-lg">Upcoming Events</h3>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Tree Plantation Drive</p>
              <p className="text-gray-500">30 Apr • Rourkela Park</p>
            </div>

            <div>
              <p className="font-medium">Cleanliness Campaign</p>
              <p className="text-gray-500">02 May • City Center</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;