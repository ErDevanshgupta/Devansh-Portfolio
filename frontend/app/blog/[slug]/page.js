import { getBlogPostBySlug, getBlogPosts } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  return { title: `${post.title} — Devansh Gupta`, description: post.excerpt };
}

export default async function BlogPost({ params }) {
  const post = await getBlogPostBySlug(params.slug);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="text-sm text-slate-500 hover:text-primary-400 transition-colors mb-10 inline-flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags?.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
        <p className="text-slate-400 text-lg mb-6">{post.excerpt}</p>

        <div className="flex items-center gap-5 text-xs text-slate-500 mb-10 pb-8 border-b border-white/5">
          <span className="flex items-center gap-1.5"><Calendar size={13} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} min read</span>
        </div>

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full rounded-2xl mb-10 border border-white/10" />
        )}

        {/* Markdown content */}
        <div className="prose prose-invert prose-slate prose-lg max-w-none
          prose-headings:text-white prose-a:text-primary-400 prose-code:text-primary-300
          prose-code:bg-dark-850 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-dark-850 prose-pre:border prose-pre:border-white/10">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
