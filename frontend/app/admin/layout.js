'use client';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FolderKanban, FileText, Mail, BarChart2, LogOut, Home } from 'lucide-react';
import { adminLogout } from '@/lib/api';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: BarChart2 },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
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
    <aside className="fixed left-0 top-0 h-full w-60 bg-dark-900 border-r border-white/5 flex flex-col z-50">
      <div className="p-6 border-b border-white/5">
        <p className="text-white font-bold">Admin Panel</p>
        <p className="text-slate-500 text-xs mt-1">{admin?.email}</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
              ${pathname === href ? 'bg-primary-600/20 text-primary-400 border border-primary-700/30'
                                 : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all">
          <Home size={16} /> View Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 px-4 py-2 rounded-lg hover:bg-red-900/10 transition-all">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-dark-950">
        <AdminSidebar />
        <main className="flex-1 ml-60 p-8">{children}</main>
      </div>
    </AuthProvider>
  );
}
