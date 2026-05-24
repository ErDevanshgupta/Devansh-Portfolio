'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetSkills, adminCreateSkill, adminUpdateSkill, adminDeleteSkill } from '@/lib/api';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const inputClass = 'w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-600 transition-colors';

function SkillForm({ skill, onSave, onCancel }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: skill || { category: '', skills: '' }
  });

  useEffect(() => {
    if (skill) setValue('skills', skill.skills?.join(', ') || '');
  }, [skill, setValue]);

  const onSubmit = async (data) => {
    data.skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
    try {
      skill ? await adminUpdateSkill(skill._id, data) : await adminCreateSkill(data);
      toast.success(skill ? 'Skill group updated!' : 'Skill group created!');
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving skill group');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{skill ? 'Edit Skill Group' : 'New Skill Group'}</h2>
          <button onClick={onCancel}><X size={20} className="text-slate-500 hover:text-white" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Category *</label>
            <input {...register('category', { required: true })} placeholder="e.g. Frontend" className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Skills (comma-separated) *</label>
            <textarea {...register('skills', { required: true })} rows={4} placeholder="React, Next.js, TailwindCSS" className={`${inputClass} resize-none`} />
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-all">
              {skill ? 'Save Changes' : 'Create Group'}
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

export default function AdminSkills() {
  const { loading } = useRequireAuth();
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  const load = () => adminGetSkills().then(setSkills).catch(console.error);
  useEffect(() => { if (!loading) load(); }, [loading]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill group?')) return;
    await adminDeleteSkill(id);
    toast.success('Deleted');
    load();
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        <button onClick={() => { setEditSkill(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> Add Skill Group
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map(group => (
          <div key={group._id} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-md">{group.category}</h3>
              <div className="flex gap-2">
                <button onClick={() => { setEditSkill(group); setShowForm(true); }} className="p-1.5 text-slate-500 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(group._id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map(skill => (
                <span key={skill} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-slate-500 col-span-2 text-center py-12">No skill groups yet.</p>}
      </div>

      {showForm && <SkillForm skill={editSkill} onSave={() => { setShowForm(false); load(); }} onCancel={() => setShowForm(false)} />}
    </div>
  );
}
