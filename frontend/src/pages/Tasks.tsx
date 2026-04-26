import { useState } from 'react';
import { CalendarDays, CheckCircle2, Flame, Leaf, Upload, MapPin } from 'lucide-react';

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const dailyTasks = [
    {
      id: 1,
      title: 'Segregate Waste',
      desc: 'Separate dry and wet waste and upload a proof image.',
      reward: '50 XP',
      emoji: '🗑️',
      due: 'Due today',
    },
    {
      id: 2,
      title: 'Save Water',
      desc: 'Take a short shower or save at least 10 liters of water.',
      reward: '40 XP',
      emoji: '💧',
      due: 'Due today',
    },
    {
      id: 3,
      title: 'Avoid Plastic',
      desc: 'Use cloth bags and avoid single-use plastic today.',
      reward: '40 XP',
      emoji: '🛍️',
      due: 'Due today',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Complete tasks, earn XP and make a positive impact on the environment.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b pb-px">
        {['All Tasks', 'Daily Tasks', 'Weekly Challenges', 'Campaigns', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
            className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
              activeTab === tab.toLowerCase().replace(' ', '-') 
                ? 'bg-green-600 text-white shadow-sm' 
                : 'bg-white hover:bg-gray-100 text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Tasks Area */}
        <div className="lg:col-span-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <span className="text-2xl">☀️</span> Daily Tasks
            <span className="text-sm font-normal text-gray-500">Simple daily actions, big impact.</span>
          </h2>

          <div className="space-y-4">
            {dailyTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-3xl p-5 flex items-center gap-5 border border-gray-100 shadow-sm hover:shadow transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  {task.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <span className="text-xs px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Daily</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{task.desc}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <Leaf size={14} /> {task.reward}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      ⏰ {task.due}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-2xl hover:bg-green-700">
                    Upload Proof
                  </button>
                  <button className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-2xl hover:bg-gray-50">
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your Progress</h3>
              <span className="text-green-600 font-medium">75%</span>
            </div>
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full -rotate-12" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle cx="21" cy="21" r="15" fill="none" stroke="#16a34a" strokeWidth="6" strokeDasharray="94.2" strokeDashoffset="23.55" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-gray-900">9</span>
                <span className="text-xs text-gray-500 -mt-1">/ 12</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Complete more tasks to earn extra XP!</p>
          </div>

          {/* Task Calendar */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CalendarDays size={18} />
                Task Calendar
              </h3>
              <span className="text-sm text-gray-500">April 2025</span>
            </div>
            {/* Simple calendar placeholder - you can enhance later */}
            <div className="grid grid-cols-7 gap-px text-center text-xs bg-gray-100 rounded-2xl p-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className={`py-2 rounded-xl ${i === 29 ? 'bg-green-100 text-green-700 font-bold' : 'bg-white'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Streak + Rewards */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <Flame className="text-orange-500" size={32} />
              <div>
                <p className="font-semibold text-lg">5 Day Streak</p>
                <p className="text-sm text-gray-500">Keep it up! 🔥</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-3">Upcoming Rewards</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Complete 15 tasks</span>
                  <span className="text-green-600">500 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Complete 20 tasks</span>
                  <span className="text-green-600">1,000 XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* EcoBot Help */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-sm text-gray-500">Need Help?</p>
            <button className="mt-3 px-6 py-3 bg-green-600 text-white rounded-2xl text-sm font-medium flex items-center gap-2 mx-auto hover:bg-green-700">
              <span>💬</span> Chat with EcoBot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;