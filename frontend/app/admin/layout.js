'use client';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FolderKanban, FileText, Mail, BarChart2, LogOut, Home, Code, Briefcase, Award } from 'lucide-react';
import { adminLogout } from '@/lib/api';

const SIDEBAR_CATEGORIES = [
  {
    category: 'Main',
    items: [
      { href: '/admin', label: 'Dashboard', icon: BarChart2 },
    ]
  },
  {
    category: 'Content',
    items: [
      { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
      { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
      { href: '/admin/skills', label: 'Skills', icon: Code },
      { href: '/admin/experience', label: 'Experience', icon: Briefcase },
      { href: '/admin/certifications', label: 'Certifications', icon: Award },
    ]
  },
  {
    category: 'Communication',
    items: [
      { href: '/admin/messages', label: 'Messages', icon: Mail },
    ]
  },
  {
    category: 'Analytics & Settings',
    items: [
      { href: '/admin/logs', label: 'Activity Logs', icon: BarChart2 },
    ]
  }
];

function AdminSidebar() {
  const { admin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return null;

  const handleLogout = async () => {
    await adminLogout();
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-dark-950 border-r border-white/5 flex flex-col z-50 overflow-y-auto">
      <div className="p-6 border-b border-white/5 sticky top-0 bg-dark-950/90 backdrop-blur z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin Portal</p>
            <p className="text-primary-400 text-[10px] uppercase font-mono tracking-wider">Control Center</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-6">
        {SIDEBAR_CATEGORIES.map((cat) => (
          <div key={cat.category}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{cat.category}</p>
            <div className="space-y-1">
              {cat.items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link key={href} href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-primary-600/10 text-primary-400'
                        : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'}`}>
                    
                    {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary-500 rounded-r-full shadow-[0_0_8px_rgba(var(--primary-500),0.6)]" />}
                    
                    <Icon size={16} className={`${isActive ? 'text-primary-500' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 bg-dark-950 sticky bottom-0">
        <Link href="/" className="flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-all group">
          <Home size={16} className="text-slate-500 group-hover:text-slate-300" /> View Live Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-red-400 px-3 py-2.5 rounded-xl hover:bg-red-900/10 transition-all group mt-1">
          <LogOut size={16} className="text-slate-500 group-hover:text-red-400" /> Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-[#0A0A0A] selection:bg-primary-500/30">
        <AdminSidebar />
        <main className={`flex-1 ${!isLoginPage ? 'ml-[260px]' : ''}`}>
          <div className="p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
