'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetMessages, adminMarkRead, adminDeleteMessage } from '@/lib/api';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminMessages() {
  const { loading } = useRequireAuth();
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => adminGetMessages().then(setMessages).catch(console.error);

  useEffect(() => { if (!loading) load(); }, [loading]);

  const handleOpen = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      await adminMarkRead(msg._id).catch(() => {});
      setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, read: true } : m));
    }
  };

  const handleDelete = async (id) => {
    await adminDeleteMessage(id);
    toast.success('Deleted');
    setSelected(null);
    load();
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <Toaster position="bottom-center" />
      <h1 className="text-2xl font-bold text-white mb-8">
        Messages
        {messages.filter(m => !m.read).length > 0 && (
          <span className="ml-3 text-sm font-normal bg-amber-900/40 text-amber-400 px-2.5 py-1 rounded-full">
            {messages.filter(m => !m.read).length} unread
          </span>
        )}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-2">
          {messages.map(msg => (
            <button key={msg._id} onClick={() => handleOpen(msg)}
              className={`w-full text-left glass-card p-4 transition-all hover:border-primary-700/40
                ${selected?._id === msg._id ? 'border-primary-600/50' : ''}
                ${!msg.read ? 'border-l-2 border-l-amber-500' : ''}`}>
              <div className="flex items-start gap-3">
                {msg.read ? <MailOpen size={16} className="text-slate-600 mt-0.5 shrink-0" /> : <Mail size={16} className="text-amber-400 mt-0.5 shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${msg.read ? 'text-slate-400' : 'text-white'}`}>{msg.name}</p>
                  <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                  <p className="text-xs text-slate-600 mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </button>
          ))}
          {messages.length === 0 && <p className="text-slate-500 text-center py-12">No messages yet</p>}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{selected.name}</h3>
                <a href={`mailto:${selected.email}`} className="text-primary-400 text-sm hover:underline">{selected.email}</a>
              </div>
              <button onClick={() => handleDelete(selected._id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
                <Trash2 size={15} />
              </button>
            </div>
            <p className="text-white font-medium mb-3">{selected.subject}</p>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            <div className="mt-6 pt-4 border-t border-white/5">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-all">
                Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 flex items-center justify-center text-slate-600">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
}
