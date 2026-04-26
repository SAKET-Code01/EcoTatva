import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopHeader = () => {
  const { currentUser } = useAuth();

  const fullName =
    currentUser?.displayName ||
    currentUser?.email?.split('@')[0] ||
    'User';

  const firstLetter = fullName.charAt(0).toUpperCase();

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center gap-5 shrink-0">
      <button className="text-gray-600 hover:text-black">
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search for tasks, articles, events..."
            className="w-full h-11 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-green-500"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-5">
        <button className="relative text-gray-600">
          <Bell size={21} />
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">
            3
          </span>
        </button>

        <div className="text-sm font-medium text-orange-600 whitespace-nowrap">
          🔥 5 Day Streak
        </div>

        <div className="flex items-center gap-3 border-l pl-5">
          <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center font-semibold text-green-700">
            {firstLetter}
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-800">
              {fullName}
            </p>
            <p className="text-xs text-gray-500">
              Level 3 • Eco Warrior
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;