'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetPosts, adminCreatePost, adminUpdatePost, adminDeletePost, adminUploadImage } from '@/lib/api';
import { useForm, Controller } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Clock, Upload, ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const inputClass = 'w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-600 transition-colors';

function BlogForm({ post, onSave, onCancel }) {
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: post || { 
      title: '', excerpt: '', content: '', tags: '', status: 'draft', coverImage: '',
      publishedAt: post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''
    }
  });

  const [uploadingCover, setUploadingCover] = useState(false);
  const coverImage = watch('coverImage');

  useEffect(() => {
    if (post) {
      setValue('tags', post.tags?.join(', ') || '');
      if (post.publishedAt) {
        setValue('publishedAt', new Date(post.publishedAt).toISOString().slice(0, 16));
      }
    }
  }, [post, setValue]);

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const url = await adminUploadImage(file);
      setValue('coverImage', url);
      toast.success('Cover image uploaded');
    } catch (err) {
      toast.error('Failed to upload cover image');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleEditorImageUpload = async (file) => {
    try {
      const url = await adminUploadImage(file);
      return url;
    } catch (err) {
      toast.error('Failed to upload image');
      return null;
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const url = await handleEditorImageUpload(files[0]);
      if (url) {
        const currentContent = watch('content');
        setValue('content', currentContent + `\n![image](${url})\n`);
      }
    }
  };

  const onSubmit = async (data) => {
    data.tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
    if (!data.publishedAt) delete data.publishedAt;
    try {
      post ? await adminUpdatePost(post._id, data) : await adminCreatePost(data);
      toast.success(post ? 'Post updated!' : 'Post created!');
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving post');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{post ? 'Edit Post' : 'New Post'}</h2>
          <button onClick={onCancel}><X size={20} className="text-slate-500 hover:text-white" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Cover Image */}
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2 block">Cover Image</label>
            {coverImage ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm backdrop-blur-sm">
                    Change Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 hover:border-primary-500/50 rounded-xl cursor-pointer bg-dark-950 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploadingCover ? <span className="text-sm text-slate-400">Uploading...</span> : (
                    <>
                      <ImageIcon size={24} className="text-slate-500 mb-2" />
                      <p className="text-sm text-slate-400"><span className="font-semibold text-primary-400">Click to upload</span> or drag and drop</p>
                    </>
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploadingCover} />
              </label>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Title *</label>
              <input {...register('title', { required: true })} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Tags (comma-separated)</label>
              <input {...register('tags')} placeholder="machine-learning, computer-vision" className={inputClass} />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Excerpt</label>
            <textarea {...register('excerpt')} rows={2} className={`${inputClass} resize-none`} />
          </div>

          <div data-color-mode="dark">
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block flex justify-between">
              <span>Content (Markdown)</span>
              <span className="text-[10px] text-slate-600 normal-case tracking-normal">You can drag & drop images here</span>
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={400}
                  className="!bg-dark-950 !border-white/10 !rounded-xl overflow-hidden"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Status</label>
              <select {...register('status')} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Publish Date (Scheduling)</label>
              <input type="datetime-local" {...register('publishedAt')} className={inputClass} />
              <p className="text-[10px] text-slate-500 mt-1">If set to a future date, it won&apos;t appear publicly until then.</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary-900/20">
              {post ? 'Save Changes' : 'Create Post'}
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

export default function AdminBlog() {
  const { loading } = useRequireAuth();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const load = () => adminGetPosts().then(setPosts).catch(console.error);
  useEffect(() => { if (!loading) load(); }, [loading]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await adminDeletePost(id);
    toast.success('Deleted');
    load();
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  const scheduledCount = posts.filter(p => p.status === 'published' && p.publishedAt && new Date(p.publishedAt) > new Date()).length;
  const publishedCount = posts.filter(p => p.status === 'published' && (!p.publishedAt || new Date(p.publishedAt) <= new Date())).length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <button onClick={() => { setEditPost(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="glass-card px-4 py-3 flex-1 flex flex-col items-center justify-center border-emerald-900/30">
          <span className="text-2xl font-bold text-emerald-400">{publishedCount}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Published</span>
        </div>
        <div className="glass-card px-4 py-3 flex-1 flex flex-col items-center justify-center border-blue-900/30">
          <span className="text-2xl font-bold text-blue-400">{scheduledCount}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Scheduled</span>
        </div>
        <div className="glass-card px-4 py-3 flex-1 flex flex-col items-center justify-center border-slate-700/50">
          <span className="text-2xl font-bold text-slate-300">{draftCount}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Drafts</span>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map(p => (
          <div key={p._id} className="glass-card p-5 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium text-sm truncate">{p.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${p.status === 'published' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                  {p.status}
                </span>
                {p.publishedAt && new Date(p.publishedAt) > new Date() && (
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0 bg-blue-900/40 text-blue-400">
                    Scheduled
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-slate-600 text-xs"><Clock size={10} /> {p.readTime} min</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditPost(p); setShowForm(true); }} className="p-2 text-slate-500 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(p._id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-slate-500 text-center py-12">No posts yet. Write your first one!</p>}
      </div>

      {showForm && <BlogForm post={editPost} onSave={() => { setShowForm(false); load(); }} onCancel={() => setShowForm(false)} />}
    </div>
  );
}
