import {
  Home,
  CheckSquare,
  CalendarDays,
  BookOpen,
  FileText,
  Gamepad2,
  Users,
  Trophy,
  Award,
  User,
  Bot,
  Settings,
  Sprout,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menu = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { name: 'Events', icon: CalendarDays, path: '#' },
  { name: 'Learn', icon: BookOpen, path: '#' },
  { name: 'Articles', icon: FileText, path: '#' },
  { name: 'Games', icon: Gamepad2, path: '#' },
  { name: 'Community', icon: Users, path: '#' },
  { name: 'Leaderboard', icon: Trophy, path: '#' },
  { name: 'Badges', icon: Award, path: '#' },
  { name: 'Profile', icon: User, path: '#' },
  { name: 'Chatbot', icon: Bot, path: '#' },
  { name: 'Settings', icon: Settings, path: '#' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-md">
            <Sprout size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-700 leading-none">
              EcoTatva
            </h1>
            <p className="text-[11px] text-gray-500 mt-1">
              Rooted in Nature
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 text-sm font-medium transition ${isActive && item.path !== '#'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-3xl bg-[#eef8ef] p-4">
          <h3 className="font-semibold text-green-700">Go Green Today!</h3>
          <p className="text-sm text-gray-600 mt-2">
            Small steps create big impact.
          </p>

          <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2.5 rounded-xl">
            Learn More
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;