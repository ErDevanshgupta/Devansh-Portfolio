'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetMessages, adminGetProjects, adminGetPosts, adminGetAnalytics } from '@/lib/api';
import { FolderKanban, FileText, Mail, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { loading } = useRequireAuth();
  const [stats, setStats] = useState({ projects: 0, posts: 0, messages: 0, views: 0, unread: 0 });

  useEffect(() => {
    if (loading) return;
    Promise.all([adminGetProjects(), adminGetPosts(), adminGetMessages(), adminGetAnalytics()])
      .then(([projects, posts, messages, analytics]) => {
        const totalViews = Object.values(analytics.byPath || {}).reduce((a, b) => a + b, 0);
        setStats({
          projects: projects.length,
          posts: posts.length,
          messages: messages.length,
          views: totalViews,
          unread: messages.filter(m => !m.read).length,
        });
      })
      .catch(console.error);
  }, [loading]);

  if (loading) return <div className="text-slate-400">Loading...</div>;

  const CARDS = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-primary-400' },
    { label: 'Blog Posts', value: stats.posts, icon: FileText, color: 'text-violet-400' },
    { label: 'Messages', value: `${stats.messages} (${stats.unread} unread)`, icon: Mail, color: 'text-amber-400' },
    { label: 'Total Page Views (30d)', value: stats.views, icon: TrendingUp, color: 'text-emerald-400' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-6">
            <Icon size={22} className={`${color} mb-3`} />
            <p className="text-2xl font-extrabold text-white mb-1">{value}</p>
            <p className="text-slate-500 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
