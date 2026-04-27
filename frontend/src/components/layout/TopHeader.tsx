import { Bell, Search, ChevronDown, Flame, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const TopHeader = ({ isSidebarOpen, toggleSidebar }: TopHeaderProps) => {
  const { currentUser } = useAuth();

  const displayName =
    currentUser?.displayName ??
    currentUser?.email?.split('@')[0] ??
    'Eco User';

  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">

      {/* Hamburger - only on mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      {/* ── Search ────────────────────────── */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search for tasks, articles, events..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-300 transition-all"
          />
        </div>
      </div>

      {/* ── Right cluster ─────────────────── */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Notification bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-[14px] h-[14px] bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Streak pill */}
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 select-none">
          <Flame size={14} className="text-orange-500 flex-shrink-0" />
          <span className="text-sm font-semibold text-orange-600 whitespace-nowrap">
            5 Day Streak
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-100" />

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-2.5 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors"
        >
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-green-100 flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{displayName}</p>
            <p className="text-xs text-gray-400 leading-tight">Level 3 • Eco Warrior</p>
          </div>
          <ChevronDown size={15} className="text-gray-400 hidden sm:block flex-shrink-0" />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;