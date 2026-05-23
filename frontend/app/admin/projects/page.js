'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetProjects, adminCreateProject, adminUpdateProject, adminDeleteProject } from '@/lib/api';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const inputClass = 'w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-600 transition-colors';
const labelClass = 'text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block';

function ProjectForm({ project, onSave, onCancel }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: project || {
      title: '', tagline: '', problem: '', approach: '',
      techStack: '', metrics: '', githubUrl: '', demoUrl: '',
      paperUrl: '', featured: false, order: 0, status: 'draft'
    }
  });

  // Pre-fill arrays as comma-separated strings
  useEffect(() => {
    if (project) {
      setValue('techStack', project.techStack?.join(', ') || '');
      setValue('metrics', project.metrics?.map(m => `${m.label}:${m.value}`).join(', ') || '');
    }
  }, [project, setValue]);

  const onSubmit = async (data) => {
    // Parse comma-separated fields back to arrays
    data.techStack = data.techStack.split(',').map(s => s.trim()).filter(Boolean);
    data.metrics = data.metrics.split(',').map(s => {
      const [label, value] = s.split(':').map(x => x.trim());
      return label && value ? { label, value } : null;
    }).filter(Boolean);

    try {
      if (project) {
        await adminUpdateProject(project._id, data);
        toast.success('Project updated!');
      } else {
        await adminCreateProject(data);
        toast.success('Project created!');
      }
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving project');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{project ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onCancel} className="text-slate-500 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={labelClass}>Title *</label>
            <input {...register('title', { required: true })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tagline (one-line summary) *</label>
            <input {...register('tagline', { required: true })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Problem (markdown)</label>
            <textarea {...register('problem')} rows={4} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Approach (markdown)</label>
            <textarea {...register('approach')} rows={4} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Tech Stack (comma-separated)</label>
            <input {...register('techStack')} placeholder="YOLOv11, OpenCV, Python" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Metrics (label:value, comma-separated)</label>
            <input {...register('metrics')} placeholder="Accuracy:96.9%, Throughput:+10%" className={inputClass} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input {...register('githubUrl')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Demo URL</label>
              <input {...register('demoUrl')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Paper URL</label>
              <input {...register('paperUrl')} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <select {...register('status')} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Order</label>
              <input {...register('order')} type="number" className={inputClass} />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                <input {...register('featured')} type="checkbox" className="accent-primary-500" />
                Featured
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all text-sm">
              {project ? 'Update Project' : 'Create Project'}
            </button>
            <button type="button" onClick={onCancel}
              className="px-6 py-2.5 border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProjects() {
  const { loading } = useRequireAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const load = () => adminGetProjects().then(setProjects).catch(console.error);

  useEffect(() => { if (!loading) load(); }, [loading]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await adminDeleteProject(id);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button onClick={() => { setEditProject(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-all">
          <Plus size={16} /> New Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map(p => (
          <div key={p._id} className="glass-card p-5 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium text-sm">{p.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'published' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                  {p.status}
                </span>
                {p.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-400">Featured</span>}
              </div>
              <p className="text-slate-500 text-xs truncate">{p.tagline}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditProject(p); setShowForm(true); }}
                className="p-2 text-slate-500 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg transition-all">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(p._id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProjectForm
          project={editProject}
          onSave={() => { setShowForm(false); load(); }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
