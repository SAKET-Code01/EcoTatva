import { Calendar, MapPin, Users, Plus } from 'lucide-react';

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Join events, meet like-minded people and create a bigger impact together.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-2xl font-medium hover:bg-green-700">
          <Plus size={18} />
          Create Event
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b pb-1">
        {['All Events', 'Nearby', 'Upcoming', 'My Events', 'Past Events'].map((tab) => (
          <button
            key={tab}
            className="px-6 py-2.5 rounded-2xl text-sm font-medium bg-green-600 text-white"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Events List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Event Card 1 */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
            <div className="w-56 h-56 bg-gray-100 flex items-center justify-center text-7xl flex-shrink-0">
              🌳
            </div>
            <div className="flex-1 p-6">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Tree Plantation</span>
              <h3 className="text-2xl font-semibold mt-3">Tree Plantation Drive</h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <MapPin size={14} /> Rourkela Park, Odisha
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <Calendar size={14} /> 30 Apr, 2025 • 8:00 AM - 11:00 AM
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Let's come together to plant more trees and make our city greener.
              </p>
              <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700">
                Join Event
              </button>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
            <div className="w-56 h-56 bg-gray-100 flex items-center justify-center text-7xl flex-shrink-0">
              🧹
            </div>
            <div className="flex-1 p-6">
              <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">Cleanliness</span>
              <h3 className="text-2xl font-semibold mt-3">Cleanliness Campaign</h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <MapPin size={14} /> City Center, Rourkela
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <Calendar size={14} /> 02 May, 2025 • 7:00 AM - 10:00 AM
              </p>
              <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700">
                Join Event
              </button>
            </div>
          </div>

          {/* Event Card 3 */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
            <div className="w-56 h-56 bg-gray-100 flex items-center justify-center text-7xl flex-shrink-0">
              🌍
            </div>
            <div className="flex-1 p-6">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Workshop</span>
              <h3 className="text-2xl font-semibold mt-3">Eco Awareness Workshop</h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <MapPin size={14} /> Community Hall, Rourkela
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <Calendar size={14} /> 05 May, 2025 • 10:00 AM - 01:00 PM
              </p>
              <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700">
                Join Event
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Upcoming Events</h3>
              <span className="text-green-600 text-sm font-medium">View All</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌳</div>
                <div>
                  <p className="font-medium">Tree Plantation Drive</p>
                  <p className="text-xs text-gray-500">30 Apr • Rourkela Park</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🧹</div>
                <div>
                  <p className="font-medium">Cleanliness Campaign</p>
                  <p className="text-xs text-gray-500">02 May • City Center</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌍</div>
                <div>
                  <p className="font-medium">Eco Awareness Workshop</p>
                  <p className="text-xs text-gray-500">05 May • Community Hall</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Event Stats */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Your Event Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-600">3</p>
                <p className="text-xs text-gray-500">Events Joined</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">12</p>
                <p className="text-xs text-gray-500">People Connected</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">150</p>
                <p className="text-xs text-gray-500">XP Earned</p>
              </div>
            </div>
          </div>

          {/* Create Your Own Event */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold">Create Your Own Event</h3>
            <p className="text-sm text-gray-600 mt-2">Have an idea to make a difference? Create an event and inspire others to join you!</p>
            <button className="mt-6 w-full py-3 bg-green-600 text-white rounded-2xl font-medium flex items-center justify-center gap-2">
              <Plus size={18} />
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;