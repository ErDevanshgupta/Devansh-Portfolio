'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetLogs } from '@/lib/api';
import { Activity, PlusCircle, Pencil, Trash2, Shield, Info } from 'lucide-react';

export default function LogsPage() {
  const { loading } = useRequireAuth();
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    adminGetLogs()
      .then(data => {
        setLogs(data || []);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [loading]);

  if (loading || isLoading) return <div className="text-slate-400 animate-pulse">Loading logs...</div>;

  const getActionBadge = (action) => {
    switch (action) {
      case 'CREATE': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider"><PlusCircle size={12} /> Create</span>;
      case 'UPDATE': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider"><Pencil size={12} /> Update</span>;
      case 'DELETE': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider"><Trash2 size={12} /> Delete</span>;
      case 'LOGIN': return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider"><Shield size={12} /> Auth</span>;
      default: return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[10px] font-bold uppercase tracking-wider"><Info size={12} /> {action}</span>;
    }
  };

  const getEntityColor = (entity) => {
    switch (entity) {
      case 'Blog': return 'text-violet-400 bg-violet-400/10 border-violet-500/20';
      case 'Project': return 'text-primary-400 bg-primary-400/10 border-primary-500/20';
      case 'Certification': return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
      case 'Skill': return 'text-cyan-400 bg-cyan-400/10 border-cyan-500/20';
      case 'Experience': return 'text-rose-400 bg-rose-400/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Activity className="text-primary-500" /> System Activity Logs
        </h1>
        <p className="text-slate-400 text-sm mt-1">A complete audit trail of all changes made in the portfolio control center.</p>
      </div>

      <div className="glass-card border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/[0.02]">
                <th className="p-4 pl-6 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Entity Type</th>
                <th className="p-4 pr-6 font-medium w-full">Entity Details</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 whitespace-nowrap">
                    <p className="text-white font-medium">{new Date(log.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                  </td>
                  <td className="p-4">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider ${getEntityColor(log.entityType)}`}>
                      {log.entityType}
                    </span>
                  </td>
                  <td className="p-4 pr-6">
                    <p className="text-white font-semibold">{log.entityName}</p>
                    {log.details && <p className="text-xs text-slate-400 mt-1">{log.details}</p>}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-500">
                    <Activity size={32} className="mx-auto mb-3 opacity-20" />
                    <p>No activity logs recorded yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
