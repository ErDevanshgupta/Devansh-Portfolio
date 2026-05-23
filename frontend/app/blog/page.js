import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog — Devansh Gupta',
  description: 'Technical writing on ML, computer vision, full-stack, and system design.'
};

export default async function Blog() {
  let posts = [];
  try { posts = await getBlogPosts(); } catch {}

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-mono text-primary-400 tracking-widest uppercase block mb-3">Blog</span>
          <h1 className="text-4xl font-extrabold text-white mb-3">Technical Writing</h1>
          <p className="text-slate-400">ML, CV, system design, and lessons from the field.</p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <p className="text-slate-500">First post coming soon...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <Link key={post._id} href={`/blog/${post.slug}`}
                className="glass-card p-6 block hover:border-primary-700/40 transition-all hover:-translate-y-0.5 duration-300 group">
                <h2 className="text-white font-bold text-xl mb-2 group-hover:text-primary-300 transition-colors">{post.title}</h2>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min read</span>
                    {post.tags?.slice(0, 3).map(t => (
                      <span key={t} className="flex items-center gap-1"><Tag size={10} /> {t}</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-primary-400 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
