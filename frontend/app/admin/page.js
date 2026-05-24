'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetMessages, adminGetProjects, adminGetPosts, adminGetAnalytics, adminGetCertifications } from '@/lib/api';
import { FolderKanban, FileText, Mail, TrendingUp, Award, Plus, ArrowRight, Clock, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { loading } = useRequireAuth();
  const [data, setData] = useState({
    projects: [],
    posts: [],
    messages: [],
    certifications: [],
    analytics: { byPath: {} }
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (loading) return;
    Promise.all([
      adminGetProjects(), 
      adminGetPosts(), 
      adminGetMessages(), 
      adminGetAnalytics().catch(() => ({ byPath: {} })),
      adminGetCertifications()
    ])
      .then(([projects, posts, messages, analytics, certifications]) => {
        setData({ projects, posts, messages, analytics, certifications });
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingData(false);
      });
  }, [loading]);

  if (loading || isLoadingData) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-white/5 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-4 gap-6"><div className="h-32 bg-white/5 rounded-2xl"></div><div className="h-32 bg-white/5 rounded-2xl"></div><div className="h-32 bg-white/5 rounded-2xl"></div><div className="h-32 bg-white/5 rounded-2xl"></div></div>
      </div>
    );
  }

  const { projects, posts, messages, analytics, certifications } = data;

  // Derived Stats
  const totalViews = Object.values(analytics.byPath || {}).reduce((a, b) => a + b, 0);
  const scheduledCount = posts.filter(p => p.status === 'published' && p.publishedAt && new Date(p.publishedAt) > new Date()).length;
  const publishedCount = posts.filter(p => p.status === 'published' && (!p.publishedAt || new Date(p.publishedAt) <= new Date())).length;
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const unreadMessages = messages.filter(m => !m.read).length;
  const inProgressCerts = certifications.filter(c => c.status === 'In Progress').length;
  const completedCerts = certifications.filter(c => c.status === 'Completed').length;
  const featuredProjects = projects.filter(p => p.featured).length;

  // Timeline Activity Generation
  const allActivity = [
    ...posts.map(p => ({ type: 'Blog', title: p.title, status: p.status, date: new Date(p.updatedAt || p.createdAt), href: '/admin/blog' })),
    ...projects.map(p => ({ type: 'Project', title: p.title, status: 'Updated', date: new Date(p.updatedAt || p.createdAt), href: '/admin/projects' })),
    ...certifications.map(c => ({ type: 'Certification', title: c.title, status: c.status, date: new Date(c.updatedAt || c.createdAt), href: '/admin/certifications' })),
    ...messages.map(m => ({ type: 'Message', title: `From ${m.name}`, status: m.read ? 'Read' : 'Unread', date: new Date(m.createdAt), href: '/admin/messages' }))
  ].sort((a, b) => b.date - a.date).slice(0, 10);

  // Content Overview
  const contentOverview = [
    ...posts.map(p => ({ id: p._id, type: 'Blog', title: p.title, status: p.status, date: new Date(p.updatedAt || p.createdAt), href: '/admin/blog' })),
    ...projects.map(p => ({ id: p._id, type: 'Project', title: p.title, status: p.status || (p.featured ? 'Featured' : 'Standard'), date: new Date(p.updatedAt || p.createdAt), href: '/admin/projects' }))
  ].sort((a, b) => b.date - a.date).slice(0, 6);

  const QUICK_ACTIONS = [
    { label: 'Create Blog Post', icon: FileText, href: '/admin/blog', color: 'text-violet-400', bg: 'bg-violet-400/10 hover:bg-violet-400/20', border: 'border-violet-500/20' },
    { label: 'Add Project', icon: FolderKanban, href: '/admin/projects', color: 'text-primary-400', bg: 'bg-primary-400/10 hover:bg-primary-400/20', border: 'border-primary-500/20' },
    { label: 'Upload Certificate', icon: Award, href: '/admin/certifications', color: 'text-amber-400', bg: 'bg-amber-400/10 hover:bg-amber-400/20', border: 'border-amber-500/20' },
    { label: 'Check Messages', icon: Mail, href: '/admin/messages', color: 'text-emerald-400', bg: 'bg-emerald-400/10 hover:bg-emerald-400/20', border: 'border-emerald-500/20' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Portfolio Control Center</h1>
          <p className="text-slate-400 text-sm">Monitor projects, blog performance, visitor activity, and portfolio updates.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-900 border border-white/5 rounded-full shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-semibold text-slate-300">Portfolio Healthy</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map(({ label, icon: Icon, href, color, bg, border }) => (
          <Link key={label} href={href} className={`group flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${bg} ${border} hover:-translate-y-1 hover:shadow-lg`}>
            <Icon size={28} className={`${color} mb-3 group-hover:scale-110 transition-transform`} />
            <span className={`text-sm font-bold ${color}`}>{label}</span>
          </Link>
        ))}
      </div>

      {/* HERO STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Views</p>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white mb-2">{totalViews}</p>
          <p className="text-xs text-slate-500">Across all tracked paths</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Projects</p>
            <FolderKanban size={16} className="text-primary-400" />
          </div>
          <p className="text-3xl font-black text-white mb-2">{projects.length}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-primary-400 font-semibold">{featuredProjects} Featured</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Blogs</p>
            <FileText size={16} className="text-violet-400" />
          </div>
          <p className="text-3xl font-black text-white mb-2">{posts.length}</p>
          <div className="flex gap-2 text-[10px] font-mono font-bold uppercase">
            <span className="text-emerald-400">{publishedCount} Live</span>
            <span className="text-amber-400">{scheduledCount} Sch</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certs</p>
            <Award size={16} className="text-amber-400" />
          </div>
          <p className="text-3xl font-black text-white mb-2">{certifications.length}</p>
          <div className="flex gap-2 text-[10px] font-mono font-bold uppercase">
            <span className="text-emerald-400">{completedCerts} Done</span>
            <span className="text-amber-400">{inProgressCerts} Prog</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Messages</p>
            <Mail size={16} className="text-rose-400" />
          </div>
          <p className="text-3xl font-black text-white mb-2">{messages.length}</p>
          <p className="text-xs text-rose-400 font-semibold">{unreadMessages} Unread</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* RECENT ACTIVITY TIMELINE */}
        <div className="lg:col-span-1 glass-card border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] flex flex-col h-[500px]">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={18} className="text-primary-500" /> Recent Activity
            </h2>
          </div>
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {allActivity.map((act, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== allActivity.length - 1 && <div className="absolute left-1.5 top-6 bottom-0 w-px bg-white/10" />}
                <div className="w-3 h-3 rounded-full bg-primary-500/20 border-2 border-primary-500 shrink-0 mt-1.5 z-10" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{act.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400">{act.type}</span>
                    <span className="text-slate-600 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-500">{act.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{new Date(act.date).toLocaleDateString()} {new Date(act.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT MANAGEMENT OVERVIEW */}
        <div className="lg:col-span-2 glass-card border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] flex flex-col h-[500px]">
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-violet-500" /> Content Overview
            </h2>
            <Link href="/admin/blog" className="text-xs font-semibold text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs font-bold uppercase tracking-widest text-slate-500 bg-white/[0.01]">
                  <th className="p-4 pl-6 font-medium">Type</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Updated</th>
                  <th className="p-4 pr-6 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {contentOverview.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 pl-6">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border 
                        ${item.type === 'Blog' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-primary-500/10 text-primary-400 border-primary-500/20'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-white max-w-[200px] truncate">{item.title}</td>
                    <td className="p-4">
                      <span className="text-xs text-slate-400">{item.status}</span>
                    </td>
                    <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <Link href={item.href} className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
                        <ExternalLink size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {contentOverview.length === 0 && (
                  <tr><td colSpan="5" className="p-8 text-center text-slate-500">No content found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
