import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog — Devansh Gupta',
  description: 'Technical writing on ML, computer vision, full-stack, and system design.'
};

export const revalidate = 60;

export default async function Blog() {
  let posts = [];
  try { posts = await getBlogPosts(); } catch {}

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-mono text-primary-600 dark:text-primary-400 tracking-widest uppercase block mb-3">Blog</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Technical Writing</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Engineering essays on full-stack systems, applied AI, and the craft of shipping.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <p className="text-slate-500">First post coming soon...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(post => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="glass-card overflow-hidden flex flex-col
                           hover:border-primary-400/35 dark:hover:border-primary-700/40
                           hover:shadow-lg dark:hover:shadow-primary-900/20
                           hover:-translate-y-1 transition-all duration-300 group"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-dark-850">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-slate-900 dark:text-white font-bold text-xl mb-2 leading-tight group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags?.slice(0, 3).map(t => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500">
                      <Clock size={12} /> {post.readTime} min read
                    </span>
                    <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all font-semibold">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
