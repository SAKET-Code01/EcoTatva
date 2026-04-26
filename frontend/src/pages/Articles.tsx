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

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button className="px-6 py-2.5 bg-green-600 text-white rounded-3xl text-sm font-medium">All Articles</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Sustainability</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Climate Change</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Biodiversity</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Waste Management</button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-3xl text-sm font-medium">Energy</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Articles */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article 1 */}
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

          {/* Article 2 */}
          <div className="flex bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="w-72 bg-orange-100 flex items-center justify-center text-7xl flex-shrink-0">🐢</div>
            <div className="flex-1 p-6">
              <span className="px-4 py-1 text-xs font-medium bg-sky-100 text-sky-700 rounded-full">Climate Change</span>
              <h3 className="text-xl font-semibold mt-3">Plastic Pollution: Problems and Solutions</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">How plastic waste is destroying our oceans and what we can do.</p>
              <div className="flex items-center gap-5 mt-6 text-sm text-gray-500">
                <span>24 Apr, 2025</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
                <span className="flex items-center gap-1"><Eye size={14} /> 1.8K views</span>
              </div>
              <button className="mt-6 text-green-600 font-medium flex items-center gap-2 hover:text-green-700">
                Read More <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-6 flex items-start">
              <Bookmark className="text-gray-400 hover:text-green-600 cursor-pointer" size={24} />
            </div>
          </div>

          {/* Article 3 */}
          <div className="flex bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="w-72 bg-blue-100 flex items-center justify-center text-7xl flex-shrink-0">🏙️</div>
            <div className="flex-1 p-6">
              <span className="px-4 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">Energy</span>
              <h3 className="text-xl font-semibold mt-3">Sustainable Cities: The Future We Need</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">How smart cities are reducing carbon emissions and improving quality of life.</p>
              <div className="flex items-center gap-5 mt-6 text-sm text-gray-500">
                <span>23 Apr, 2025</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
                <span className="flex items-center gap-1"><Eye size={14} /> 1.6K views</span>
              </div>
              <button className="mt-6 text-green-600 font-medium flex items-center gap-2 hover:text-green-700">
                Read More <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-6 flex items-start">
              <Bookmark className="text-gray-400 hover:text-green-600 cursor-pointer" size={24} />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Reading Stats */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Your Reading Stats</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>Articles Read</span><span className="font-semibold">12</span></div>
              <div className="flex justify-between"><span>Total Read Time</span><span className="font-semibold">2h 45m</span></div>
              <div className="flex justify-between"><span>XP Earned</span><span className="font-semibold">350</span></div>
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Popular Articles</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-4xl">🌳</div>
                <div>
                  <p className="font-medium">The Importance of Trees in Our Lives</p>
                  <p className="text-xs text-gray-500">2.1K views</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-4xl">🐢</div>
                <div>
                  <p className="font-medium">Plastic Pollution: Problems and Solutions</p>
                  <p className="text-xs text-gray-500">1.8K views</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-4xl">🏙️</div>
                <div>
                  <p className="font-medium">Sustainable Cities: The Future We Need</p>
                  <p className="text-xs text-gray-500">1.6K views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;