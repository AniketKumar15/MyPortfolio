import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, ImageIcon, Users, Settings, LogOut, MessageSquare } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/blogs', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: FolderOpen },
    { name: 'Projects', path: '/admin/projects', icon: ImageIcon },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Resume Builder', path: '/admin/resume', icon: Users },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-bg-secondary text-text-primary overflow-hidden font-sans">
      {/* Sidebar - Notion style minimal */}
      <aside className="w-64 bg-[#151515] border-r border-border-subtle flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border-subtle">
          <Link to={"/"} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center text-black font-bold text-xs">
              A
            </div>
            <span className="font-semibold tracking-tight">AK. Admin</span>
          </Link>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 px-2">Menu</div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'bg-bg-secondary text-accent'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-accent'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-border-subtle">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/admin/login';
            }}
            className="flex items-center gap-3 w-full px-2 py-1.5 text-sm font-medium text-text-secondary hover:text-accent hover:bg-bg-secondary rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-bg-secondary">
        {/* Topbar */}
        <header className="h-16 bg-[#151515] border-b border-border-subtle flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center text-sm font-medium text-text-secondary">
            <span>AK.</span>
            <span className="mx-2">/</span>
            <span className="text-accent">{navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">Admin User</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center font-bold text-sm">
              AU
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-8" data-lenis-prevent="true">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
