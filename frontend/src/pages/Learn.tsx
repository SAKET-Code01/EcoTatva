import { BookOpen, Clock, Trophy, Lightbulb } from 'lucide-react';

const Learn = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learn</h1>
          <p className="text-gray-600">Explore, learn and grow your knowledge about the environment.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button className="px-6 py-2.5 bg-green-600 text-white rounded-3xl text-sm font-medium whitespace-nowrap">All Topics</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium whitespace-nowrap">Sustainability</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium whitespace-nowrap">Climate Change</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium whitespace-nowrap">Biodiversity</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium whitespace-nowrap">Waste Management</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium whitespace-nowrap">Water Conservation</button>
      </div>

      {/* Featured Lessons */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Featured Lessons</h2>
          <button className="text-green-600 text-sm font-medium flex items-center gap-1">View All →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="h-40 bg-emerald-100 flex items-center justify-center text-6xl">🌱</div>
            <div className="p-5">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Sustainability</span>
              <h3 className="font-semibold mt-3">10 Simple Ways to Live More Sustainably</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">Small changes in your daily life can make a big impact.</p>
              <div className="flex justify-between items-center mt-4 text-xs">
                <span className="text-gray-500">Beginner • 1.2K views</span>
                <span className="flex items-center gap-1 text-emerald-600"><span>▶</span> 7 min</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="h-40 bg-sky-100 flex items-center justify-center text-6xl">🌍</div>
            <div className="p-5">
              <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full">Climate Change</span>
              <h3 className="font-semibold mt-3">Understanding Climate Change and Its Effects</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">Learn about the causes, effects and solutions to climate change.</p>
              <div className="flex justify-between items-center mt-4 text-xs">
                <span className="text-gray-500">Intermediate • 2.1K views</span>
                <span className="flex items-center gap-1 text-emerald-600"><span>▶</span> 6 min</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="h-40 bg-amber-100 flex items-center justify-center text-6xl">♻️</div>
            <div className="p-5">
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Waste Management</span>
              <h3 className="font-semibold mt-3">Waste Segregation: A Step Towards a Cleaner Earth</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">How segregating waste can help build a cleaner and healthier planet.</p>
              <div className="flex justify-between items-center mt-4 text-xs">
                <span className="text-gray-500">Beginner • 1.5K views</span>
                <span className="flex items-center gap-1 text-emerald-600"><span>▶</span> 7 min</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="h-40 bg-blue-100 flex items-center justify-center text-6xl">💧</div>
            <div className="p-5">
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Water Conservation</span>
              <h3 className="font-semibold mt-3">Water Conservation 101</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">Learn the basics of saving water every day.</p>
              <div className="flex justify-between items-center mt-4 text-xs">
                <span className="text-gray-500">Beginner • 1.1K views</span>
                <span className="flex items-center gap-1 text-emerald-600"><span>▶</span> 5 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <button className="text-green-600 text-sm font-medium flex items-center gap-1">View All →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Continue Card 1 */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-4">
              <div className="text-5xl">🌍</div>
              <div className="flex-1">
                <h3 className="font-semibold">Introduction to Sustainability</h3>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500 w-[60%] rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>60% Complete</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 6 min left</span>
                </p>
              </div>
            </div>
          </div>

          {/* Continue Card 2 */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-4">
              <div className="text-5xl">🐠</div>
              <div className="flex-1">
                <h3 className="font-semibold">Biodiversity and Its Importance</h3>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500 w-[40%] rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>40% Complete</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 4 min left</span>
                </p>
              </div>
            </div>
          </div>

          {/* Continue Card 3 */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-4">
              <div className="text-5xl">♻️</div>
              <div className="flex-1">
                <h3 className="font-semibold">Reduce, Reuse, Recycle</h3>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500 w-[70%] rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>70% Complete</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 3 min left</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Learning Goal */}
      <div className="bg-white rounded-3xl p-6 flex items-center gap-6 border border-gray-100 shadow-sm">
        <div className="text-5xl">📖</div>
        <div className="flex-1">
          <h3 className="font-semibold">Daily Learning Goal</h3>
          <p className="text-sm text-gray-600">Learn for 15 minutes daily and earn 30 XP!</p>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-2 bg-green-600 w-[67%] rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">10 / 15 min</p>
        </div>
        <button className="bg-green-600 text-white px-8 py-3 rounded-2xl font-medium">Continue Learning</button>
      </div>
    </div>
  );
};

export default Learn;