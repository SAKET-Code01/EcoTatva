import { Clock, Eye, Bookmark, ChevronRight } from 'lucide-react';

const Articles = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
            Articles <span className="text-3xl">📄</span>
          </h1>
          <p className="text-gray-600 mt-1">Read, learn and stay informed about environmental sustainability.</p>
        </div>

        <select className="bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm font-medium focus:outline-none">
          <option>Sort by: Latest</option>
          <option>Most Popular</option>
        </select>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button className="px-6 py-2.5 bg-green-600 text-white rounded-3xl text-sm font-medium">All Articles</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Sustainability</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Climate Change</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Biodiversity</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Waste Management</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Energy</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Article Cards will go here - clean version */}
          <div className="flex bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="w-72 bg-emerald-100 flex items-center justify-center text-7xl flex-shrink-0">🌳</div>
            <div className="flex-1 p-6">
              <span className="px-4 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Sustainability</span>
              <h3 className="text-xl font-semibold mt-3">The Importance of Trees in Our Lives</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">Trees are essential for our planet's health and our survival.</p>
              <div className="flex items-center gap-5 mt-6 text-sm text-gray-500">
                <span>25 Apr, 2025</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 4 min read</span>
                <span className="flex items-center gap-1"><Eye size={14} /> 2.1K views</span>
              </div>
              <button className="mt-6 text-green-600 font-medium flex items-center gap-2 hover:text-green-700">
                Read More <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-6 flex items-start">
              <Bookmark className="text-gray-400 hover:text-green-600 cursor-pointer" size={24} />
            </div>
          </div>
          {/* More articles can be added similarly */}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Your Reading Stats</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>Articles Read</span><span className="font-semibold">12</span></div>
              <div className="flex justify-between"><span>Total Read Time</span><span className="font-semibold">2h 45m</span></div>
              <div className="flex justify-between"><span>XP Earned</span><span className="font-semibold">350</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;