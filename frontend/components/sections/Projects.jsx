'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { getProjects } from '@/lib/api';
import { ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

function ProjectCard({ project }) {
  return (
    <div className="glass-card p-6 flex flex-col gap-5 hover:border-primary-700/40 transition-all duration-300 hover:-translate-y-1 h-full">
      {/* Header */}
      <div>
        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{project.tagline}</p>
      </div>

      {/* Metrics */}
      {project.metrics?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.metrics.map(m => (
            <div key={m.label} className="flex items-center gap-1.5 bg-primary-900/30 border border-primary-800/40 px-3 py-1.5 rounded-lg">
              <TrendingUp size={12} className="text-primary-400" />
              <span className="text-primary-300 font-bold text-sm">{m.value}</span>
              <span className="text-slate-500 text-xs">{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.techStack?.slice(0, 5).map(t => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
        {project.techStack?.length > 5 && (
          <span className="tech-badge">+{project.techStack.length - 5}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank"
               className="text-slate-500 hover:text-primary-400 transition-colors">
              <GithubIcon size={18} />
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank"
               className="text-slate-500 hover:text-primary-400 transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        <Link href={`/projects/${project.slug}`}
          className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors group">
          Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section-container">
      <SectionHeader
        label="03. Projects"
        title="What I've Built"
        subtitle="End-to-end systems with measurable real-world results."
      />

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-6 h-64 animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-3 w-3/4" />
              <div className="h-3 bg-white/5 rounded mb-2 w-full" />
              <div className="h-3 bg-white/5 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">Projects coming soon.</p>
          <p className="text-sm mt-2">Check back after adding projects via the admin panel.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project._id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  );
}
