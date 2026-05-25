import { getBlogPostBySlug, getBlogPosts } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  let post;
  try { post = await getBlogPostBySlug(params.slug); } catch { return { title: 'Blog | Devansh Gupta' }; }
  if (!post) return { title: 'Blog | Devansh Gupta' };
  return {
    title: `${post.title} | Devansh Gupta`,
    description: post.excerpt,
    keywords: post.tags || [],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Devansh Gupta'],
      images: post.coverImage ? [post.coverImage] : ['/profile-pic.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : ['/profile-pic.png'],
    }
  };
}

export default async function BlogPost({ params }) {
  let post;
  try { post = await getBlogPostBySlug(params.slug); } catch { notFound(); }
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.coverImage ? [post.coverImage] : [],
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": [{
        "@type": "Person",
        "name": "Devansh Gupta",
        "url": "https://erdevanshgupta.com"
      }]
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="text-sm text-slate-500 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-10 inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Tag chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags?.map(t => (
            <span key={t} className="tech-badge inline-flex items-center gap-1">
              <Tag size={10} /> {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-[1.15] tracking-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-7 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-5 text-xs text-slate-500 dark:text-slate-500 mb-10 pb-8 border-b border-slate-200 dark:border-white/5">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {post.readTime} min read
          </span>
        </div>

        {/* Cover */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-2xl mb-12 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/30"
          />
        )}

        {/* Markdown content */}
        <article
          className="prose prose-slate dark:prose-invert prose-lg max-w-none
                     prose-headings:text-slate-900 dark:prose-headings:text-white
                     prose-headings:font-extrabold prose-headings:tracking-tight
                     prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5
                     prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10
                     prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                     prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
                     prose-em:text-slate-800 dark:prose-em:text-slate-200
                     prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                     prose-code:text-primary-700 dark:prose-code:text-primary-300
                     prose-code:bg-primary-50 dark:prose-code:bg-dark-850
                     prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:font-medium
                     prose-code:before:content-none prose-code:after:content-none
                     prose-pre:bg-slate-50 dark:prose-pre:bg-dark-850
                     prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-white/10
                     prose-blockquote:not-italic
                     prose-blockquote:border-l-4 prose-blockquote:border-primary-500
                     prose-blockquote:bg-primary-50/60 dark:prose-blockquote:bg-primary-900/10
                     prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg
                     prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-200
                     prose-blockquote:font-medium
                     prose-img:rounded-2xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/10
                     prose-img:shadow-md dark:prose-img:shadow-black/20 prose-img:my-10
                     prose-li:text-slate-700 dark:prose-li:text-slate-300
                     prose-hr:border-slate-200 dark:prose-hr:border-white/10 prose-hr:my-12
                     prose-table:text-sm
                     prose-th:text-slate-900 dark:prose-th:text-white
                     prose-td:text-slate-700 dark:prose-td:text-slate-300"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="text-sm text-slate-500 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} /> More writing
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all"
          >
            Let&apos;s work together
          </Link>
        </div>
      </div>
    </div>
  );
}
