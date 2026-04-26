import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BookOpen,
  Newspaper,
  Gamepad2,
  Users,
  Trophy,
  Award,
  User,
  Bot,
  Settings,
  Leaf,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',   icon: LayoutDashboard, path: '/'            },
  { label: 'Tasks',       icon: CheckSquare,     path: '/tasks'       },
  { label: 'Events',      icon: CalendarDays,    path: '/events'      },
  { label: 'Learn',       icon: BookOpen,        path: '/learn'       },
  { label: 'Articles',    icon: Newspaper,       path: '/articles'    },
  { label: 'Games',       icon: Gamepad2,        path: '/games'       },
  { label: 'Community',   icon: Users,           path: '/community'   },
  { label: 'Leaderboard', icon: Trophy,          path: '/leaderboard' },
  { label: 'Badges',      icon: Award,           path: '/badges'      },
  { label: 'Profile',     icon: User,            path: '/profile'     },
  { label: 'Chatbot',     icon: Bot,             path: '/chatbot',    badge: 'New' },
  { label: 'Settings',    icon: Settings,        path: '/settings'    },
] as const;

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-screen w-[230px] bg-white border-r border-gray-100 flex flex-col z-40 select-none">

    {/* ── Logo ─────────────────────────── */}
    <div className="px-5 pt-5 pb-4 border-b border-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <Leaf size={20} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-[15px] leading-tight">EcoTatva</p>
          <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
            Rooted in Nature, Driven by Change
          </p>
        </div>
      </div>
    </div>

    {/* ── Nav ──────────────────────────── */}
    <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-none">
      <ul className="space-y-0.5">
        {navItems.map(({ label, icon: Icon, path, badge }) => (
          <li key={label}>
            <NavLink
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className="flex-shrink-0"
                  />
                  <span className="flex-1 truncate">{label}</span>
                  {badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    {/* ── Go Green card ────────────────── */}
    <div className="m-3 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-4 text-white relative overflow-hidden shadow-sm">
      {/* Decorative plant silhouette */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.12] text-[80px] leading-none pointer-events-none select-none">
        🌱
      </div>
      <p className="font-bold text-sm relative z-10">Go Green Today! 🌿</p>
      <p className="text-[11px] text-green-100 mt-1 leading-relaxed relative z-10">
        Small steps make big impact.
      </p>
      <button className="mt-3 bg-white text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors relative z-10">
        Learn More
      </button>
    </div>
  </aside>
);

export default Sidebar;