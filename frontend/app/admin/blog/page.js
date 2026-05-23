'use client';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useAuth';
import { adminGetPosts, adminCreatePost, adminUpdatePost, adminDeletePost } from '@/lib/api';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Clock } from 'lucide-react';

const inputClass = 'w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-600 transition-colors';

function BlogForm({ post, onSave, onCancel }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: post || { title: '', excerpt: '', content: '', tags: '', status: 'draft' }
  });

  useEffect(() => {
    if (post) setValue('tags', post.tags?.join(', ') || '');
  }, [post, setValue]);

  const onSubmit = async (data) => {
    data.tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
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
      <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{post ? 'Edit Post' : 'New Post'}</h2>
          <button onClick={onCancel}><X size={20} className="text-slate-500 hover:text-white" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Title *</label>
            <input {...register('title', { required: true })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Excerpt</label>
            <textarea {...register('excerpt')} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Content (Markdown)</label>
            <textarea {...register('content')} rows={14} className={`${inputClass} resize-none font-mono text-xs`} />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Tags (comma-separated)</label>
            <input {...register('tags')} placeholder="machine-learning, computer-vision" className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1 block">Status</label>
            <select {...register('status')} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm">
              {post ? 'Update Post' : 'Create Post'}
            </button>
            <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-white/10 text-slate-400 rounded-xl text-sm">
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

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <button onClick={() => { setEditPost(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm">
          <Plus size={16} /> New Post
        </button>
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
