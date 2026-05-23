import { getProjectBySlug, getProjects } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, BookOpen } from 'lucide-react';
import Link from 'next/link';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const project = await getProjectBySlug(params.slug);
    return { title: `${project.title} — Devansh Gupta`, description: project.tagline };
  } catch {
    return { title: 'Project — Devansh Gupta' };
  }
}

export default async function ProjectDetail({ params }) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    return (
      <div className="min-h-screen pt-32 text-center text-slate-400">
        <p>Project not found.</p>
        <Link href="/#projects" className="text-primary-400 hover:underline mt-4 block">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <Link href="/#projects" className="text-sm text-slate-500 hover:text-primary-400 transition-colors mb-8 inline-block">
          ← Back to Projects
        </Link>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{project.title}</h1>
        <p className="text-xl text-slate-400 mb-8">{project.tagline}</p>

        {/* Metrics */}
        {project.metrics?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {project.metrics.map(m => (
              <div key={m.label} className="glass-card p-4 text-center">
                <p className="text-2xl font-extrabold gradient-text">{m.value}</p>
                <p className="text-slate-500 text-xs mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack?.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>

        {/* Cover image */}
        {project.coverImage && (
          <img src={project.coverImage} alt={project.title}
            className="w-full rounded-2xl mb-10 border border-white/10" />
        )}

        {/* Problem */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-600/20 border border-primary-700/50 rounded-lg flex items-center justify-center text-sm">?</span>
            Problem
          </h2>
          <div className="prose prose-invert prose-slate max-w-none text-slate-400">
            <ReactMarkdown>{project.problem}</ReactMarkdown>
          </div>
        </section>

        {/* Approach */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-600/20 border border-primary-700/50 rounded-lg flex items-center justify-center text-sm">→</span>
            Approach
          </h2>
          <div className="prose prose-invert prose-slate max-w-none text-slate-400">
            <ReactMarkdown>{project.approach}</ReactMarkdown>
          </div>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/5">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-primary-600/50 text-slate-400 hover:text-primary-400 rounded-xl transition-all text-sm">
              <GithubIcon size={16} /> View Code
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all text-sm">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.paperUrl && (
            <a href={project.paperUrl} target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 border border-violet-700/50 text-violet-400 hover:bg-violet-600/10 rounded-xl transition-all text-sm">
              <BookOpen size={16} /> Read Paper
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
