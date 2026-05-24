'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetCertifications, adminCreateCertification, adminUpdateCertification, adminDeleteCertification, adminToggleFeaturedCertification, adminUploadImage } from '@/lib/api';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Star, Upload, ImageIcon } from 'lucide-react';

const inputClass = 'w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-600 transition-colors';

function CertForm({ cert, onSave, onCancel }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: cert || { title: '', provider: '', category: 'Cloud', description: '', tags: '', issueDate: '', expiryDate: '', credentialId: '', certificateUrl: '', logo: '', certificateImage: '', status: 'Completed', displayOrder: 0 }
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const logoUrl = watch('logo');

  useEffect(() => {
    if (cert) {
      setValue('tags', cert.tags?.join(', ') || '');
      if (cert.issueDate) setValue('issueDate', new Date(cert.issueDate).toISOString().slice(0, 10));
      if (cert.expiryDate) setValue('expiryDate', new Date(cert.expiryDate).toISOString().slice(0, 10));
    }
  }, [cert, setValue]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingLogo(true);
      const url = await adminUploadImage(file);
      setValue('logo', url);
      toast.success('Logo uploaded');
    } catch (err) {
      toast.error('Failed to upload logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleCertUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCert(true);
      const url = await adminUploadImage(file);
      setValue('certificateUrl', url);
      toast.success('Certificate file uploaded');
    } catch (err) {
      toast.error('Failed to upload certificate');
    } finally {
      setUploadingCert(false);
    }
  };

  const onSubmit = async (data) => {
    data.tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
    if (!data.issueDate) delete data.issueDate;
    if (!data.expiryDate) delete data.expiryDate;
    
    try {
      cert ? await adminUpdateCertification(cert._id, data) : await adminCreateCertification(data);
      toast.success(cert ? 'Certification updated!' : 'Certification created!');
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving certification');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{cert ? 'Edit Certification' : 'New Certification'}</h2>
          <button onClick={onCancel}><X size={20} className="text-slate-500 hover:text-white" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="flex gap-6 items-start">
            <div className="w-24 shrink-0">
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2 block">Logo</label>
              {logoUrl ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden group bg-white p-2">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer text-white text-xs">
                      Change
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-white/10 hover:border-primary-500/50 rounded-xl cursor-pointer bg-dark-950 transition-colors">
                  {uploadingLogo ? <span className="text-xs text-slate-400">Wait...</span> : <Upload size={16} className="text-slate-500" />}
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                </label>
              )}
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Title *</label>
                <input {...register('title', { required: true })} className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Provider *</label>
                <input {...register('provider', { required: true })} className={inputClass} />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Description</label>
                <input {...register('description')} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Category</label>
              <select {...register('category')} className={inputClass}>
                {['Cloud', 'AI/ML', 'Programming', 'Languages', 'Cybersecurity', 'DevOps', 'Research', 'Full Stack'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Status</label>
              <select {...register('status')} className={inputClass}>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Tags (comma-separated)</label>
            <input {...register('tags')} placeholder="AWS, Security, Python" className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Issue Date</label>
              <input type="date" {...register('issueDate')} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Expiry Date</label>
              <input type="date" {...register('expiryDate')} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Credential ID</label>
              <input {...register('credentialId')} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Verification URL / Upload Certificate</label>
            <div className="flex gap-2">
              <input {...register('certificateUrl')} placeholder="https://..." className={inputClass} />
              <label className="shrink-0 flex items-center gap-2 px-4 py-2 bg-dark-900 hover:bg-dark-800 border border-white/10 rounded-xl cursor-pointer transition-colors">
                {uploadingCert ? <span className="text-xs text-slate-400">Uploading...</span> : <><Upload size={14} className="text-slate-400" /> <span className="text-xs text-white">Upload File</span></>}
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleCertUpload} disabled={uploadingCert} />
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary-900/20">
              {cert ? 'Save Changes' : 'Create Certification'}
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

export default function AdminCertifications() {
  const { loading } = useRequireAuth();
  const [certs, setCerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCert, setEditCert] = useState(null);

  const load = () => adminGetCertifications().then(setCerts).catch(console.error);
  useEffect(() => { if (!loading) load(); }, [loading]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    await adminDeleteCertification(id);
    toast.success('Deleted');
    load();
  };

  const handleToggleFeatured = async (id) => {
    await adminToggleFeaturedCertification(id);
    toast.success('Featured status updated');
    load();
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Certifications & Continuous Learning</h1>
        <button onClick={() => { setEditCert(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> Add Certification
        </button>
      </div>

      <div className="space-y-4">
        {certs.map(cert => (
          <div key={cert._id} className="glass-card p-5 flex items-center gap-4">
            {cert.logo ? (
              <div className="w-12 h-12 rounded bg-white flex items-center justify-center p-1 shrink-0">
                <img src={cert.logo} alt={cert.provider} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center shrink-0">
                <ImageIcon size={20} className="text-slate-500" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold truncate">{cert.title}</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0 ${cert.status === 'Completed' ? 'bg-emerald-900/40 text-emerald-400' : cert.status === 'In Progress' ? 'bg-amber-900/40 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                  {cert.status}
                </span>
                <span className="text-xs text-primary-400 bg-primary-900/20 px-2 rounded border border-primary-800/40">{cert.category}</span>
              </div>
              <p className="text-sm text-slate-400">{cert.provider}</p>
            </div>

            <div className="flex gap-2 items-center">
              <button onClick={() => handleToggleFeatured(cert._id)} className={`p-2 rounded-lg transition-colors ${cert.featured ? 'text-amber-400 bg-amber-400/10' : 'text-slate-600 hover:text-amber-400 hover:bg-white/5'}`}>
                <Star size={18} fill={cert.featured ? "currentColor" : "none"} />
              </button>
              <button onClick={() => { setEditCert(cert); setShowForm(true); }} className="p-2 text-slate-500 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(cert._id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {certs.length === 0 && <p className="text-slate-500 text-center py-12">No certifications added yet.</p>}
      </div>

      {showForm && <CertForm cert={editCert} onSave={() => { setShowForm(false); load(); }} onCancel={() => setShowForm(false)} />}
    </div>
  );
}
