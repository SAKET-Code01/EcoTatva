import { Heart, MessageCircle, Share2, Plus, Users, TrendingUp } from 'lucide-react';

const Community = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600 mt-1">Share your actions, inspire others, make an impact!</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-3xl font-medium transition-colors">
          <Plus size={20} />
          Create Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-4 mb-8 overflow-x-auto">
        {['All Posts', 'Following', 'My Posts', 'Popular'].map((tab, i) => (
          <button
            key={i}
            className={`px-6 py-2 rounded-3xl font-medium whitespace-nowrap transition-all ${
              i === 0 ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-8">
          {/* Post 1 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-xl">🌳</div>
              <div>
                <p className="font-semibold">Rahul Sharma</p>
                <p className="text-xs text-gray-500">2 hours ago • Rourkela, Odisha</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">Planted 5 trees today with my friends! 🌱 Let's keep our planet green.</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-3xl">#TreePlantation</span>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-3xl">#GoGreen</span>
            </div>
            <div className="flex gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2"><Heart size={18} /> 28</div>
              <div className="flex items-center gap-2"><MessageCircle size={18} /> 6</div>
              <div className="flex items-center gap-2"><Share2 size={18} /> Share</div>
            </div>
          </div>

          {/* Post 2 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-xl">♻️</div>
              <div>
                <p className="font-semibold">Sneha Patil</p>
                <p className="text-xs text-gray-500">5 hours ago • Bhubaneswar, Odisha</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">Completed my 7-day No Plastic Challenge! Let's keep our planet clean and green! 💚</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-3xl">#NoPlastic</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-3xl">#SustainableLiving</span>
            </div>
            <div className="flex gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2"><Heart size={18} /> 35</div>
              <div className="flex items-center gap-2"><MessageCircle size={18} /> 8</div>
              <div className="flex items-center gap-2"><Share2 size={18} /> Share</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Trending Hashtags */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={18} /> Trending Hashtags
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-green-600">#GoGreen</span><span className="text-gray-400">128 posts</span></div>
              <div className="flex justify-between"><span className="text-green-600">#TreePlantation</span><span className="text-gray-400">97 posts</span></div>
              <div className="flex justify-between"><span className="text-green-600">#NoPlastic</span><span className="text-gray-400">74 posts</span></div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-4">Top Contributors</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-2xl flex items-center justify-center text-lg">🥇</div>
                <div className="flex-1">
                  <p className="font-medium">Rahul Sharma</p>
                  <p className="text-xs text-gray-500">2,000 XP</p>
                </div>
              </div>
              {/* Add more contributors */}
            </div>
          </div>

          {/* EcoTatva Bot */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">🤖</div>
              <div>
                <p className="font-semibold">EcoTatva Bot</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-4 text-sm">
              Hi! I'm EcoTatva Bot 🌱<br />
              How can I help you today?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;