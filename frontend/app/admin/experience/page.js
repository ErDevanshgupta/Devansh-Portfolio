'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetExperiences, adminCreateExperience, adminUpdateExperience, adminDeleteExperience } from '@/lib/api';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const inputClass = 'w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-600 transition-colors';

function ExperienceForm({ exp, onSave, onCancel }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: exp || { role: '', company: '', period: '', type: 'Industry', techStack: '', keyImpact: '', points: '', clients: '', ctaUrl: '', ctaLabel: '' }
  });

  useEffect(() => {
    if (exp) {
      setValue('techStack', exp.techStack?.join(', ') || '');
      setValue('clients', exp.clients?.join(', ') || '');
      setValue('points', exp.points?.join('\n') || '');
    }
  }, [exp, setValue]);

  const onSubmit = async (data) => {
    data.techStack = data.techStack.split(',').map(s => s.trim()).filter(Boolean);
    data.clients = data.clients.split(',').map(s => s.trim()).filter(Boolean);
    data.points = data.points.split('\n').map(s => s.trim()).filter(Boolean);
    
    try {
      exp ? await adminUpdateExperience(exp._id, data) : await adminCreateExperience(data);
      toast.success(exp ? 'Experience updated!' : 'Experience created!');
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving experience');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{exp ? 'Edit Experience' : 'New Experience'}</h2>
          <button onClick={onCancel}><X size={20} className="text-slate-500 hover:text-white" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Role *</label>
              <input {...register('role', { required: true })} placeholder="e.g. Full Stack Engineer" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Company *</label>
              <input {...register('company', { required: true })} placeholder="e.g. Google" className={inputClass} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Period *</label>
              <input {...register('period', { required: true })} placeholder="e.g. 2022 - Present" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Type *</label>
              <select {...register('type', { required: true })} className={inputClass}>
                <option value="Industry">Industry</option>
                <option value="Research">Research</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Key Impact</label>
            <input {...register('keyImpact')} placeholder="e.g. Saved $1M in cloud costs" className={inputClass} />
          </div>

          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Tech Stack (comma-separated)</label>
            <input {...register('techStack')} placeholder="React, Node.js, AWS" className={inputClass} />
          </div>

          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Clients (comma-separated, for Freelance)</label>
            <input {...register('clients')} placeholder="Client A, Client B" className={inputClass} />
          </div>

          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Bullet Points (one per line) *</label>
            <textarea {...register('points', { required: true })} rows={5} placeholder="Architected a new system...&#10;Led a team of 4..." className={`${inputClass} resize-none leading-relaxed`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">CTA Label (Optional link button)</label>
              <input {...register('ctaLabel')} placeholder="e.g. View Live Project" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">CTA URL (Optional link URL)</label>
              <input {...register('ctaUrl')} placeholder="https://..." className={inputClass} />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary-900/20">
              {exp ? 'Save Changes' : 'Create Experience'}
            </button>
            <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminExperience() {
  const { loading } = useRequireAuth();
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editExp, setEditExp] = useState(null);

  const load = () => adminGetExperiences().then(setExperiences).catch(console.error);
  useEffect(() => { if (!loading) load(); }, [loading]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    await adminDeleteExperience(id);
    toast.success('Deleted');
    load();
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Experience Management</h1>
        <button onClick={() => { setEditExp(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map(exp => (
          <div key={exp._id} className="glass-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                <p className="text-primary-400 text-sm">{exp.company}</p>
                <p className="text-slate-500 text-xs mt-1">{exp.period} • {exp.type}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditExp(exp); setShowForm(true); }} className="p-2 text-slate-500 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(exp._id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            {exp.keyImpact && (
              <p className="text-emerald-400 text-xs font-semibold mt-3 bg-emerald-900/20 px-2.5 py-1 rounded-full inline-block border border-emerald-800/40">
                {exp.keyImpact}
              </p>
            )}
          </div>
        ))}
        {experiences.length === 0 && <p className="text-slate-500 text-center py-12">No experiences yet.</p>}
      </div>

      {showForm && <ExperienceForm exp={editExp} onSave={() => { setShowForm(false); load(); }} onCancel={() => setShowForm(false)} />}
    </div>
  );
}
