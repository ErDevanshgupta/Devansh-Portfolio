'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { getProjects } from '@/lib/api';
import { PROJECTS_DATA } from '@/lib/projectsData';
import { ExternalLink, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CATEGORY_STYLE = {
  Freelance: 'bg-amber-50  dark:bg-amber-900/30  text-amber-700  dark:text-amber-400  border-amber-200  dark:border-amber-800/40',
  Research:  'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40',
  Personal:  'bg-blue-50   dark:bg-blue-900/30   text-blue-700   dark:text-blue-400   border-blue-200   dark:border-blue-800/40',
  Industry:  'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-800/40',
};

const SPECIAL_BADGE_STYLE = {
  'Production System': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
  'Published Research':'bg-violet-50  dark:bg-violet-900/20  text-violet-700  dark:text-violet-400  border-violet-200  dark:border-violet-800/40',
  'Patent-backed':     'bg-amber-50   dark:bg-amber-900/20   text-amber-700   dark:text-amber-400   border-amber-200   dark:border-amber-800/40',
};

function ProjectCard({ project, index }) {
  const category   = project.category || 'Personal';
  const badgeClass = CATEGORY_STYLE[category] || CATEGORY_STYLE.Personal;

  const links = [
    project.demoUrl  && project.demoUrl  !== '#' && { href: project.demoUrl,  icon: ExternalLink, label: 'Live'  },
    project.paperUrl && project.paperUrl !== '#' && { href: project.paperUrl, icon: BookOpen,     label: 'Paper' },
    project.githubUrl                            && { href: project.githubUrl, icon: GithubIcon,   label: 'Code'  },
  ].filter(Boolean);

  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="glass-card flex flex-col h-full
                      hover:border-primary-400/35 dark:hover:border-primary-600/50
                      hover:shadow-lg dark:hover:shadow-primary-900/20
                      hover:-translate-y-1 transition-all duration-300 overflow-hidden">

        {/* Category accent bar */}
        <div className={`h-0.5 ${
          category === 'Freelance' ? 'bg-gradient-to-r from-amber-400  to-orange-400' :
          category === 'Research'  ? 'bg-gradient-to-r from-violet-500 to-purple-400' :
                                     'bg-gradient-to-r from-primary-500 to-cyan-400'
        }`} />

        <div className="p-6 flex flex-col gap-4 flex-1">
          {/* Category badge + special badge + external links */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${badgeClass}`}>
                {category}
              </span>
              {project.specialBadge && (
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${SPECIAL_BADGE_STYLE[project.specialBadge] || ''}`}>
                  {project.specialBadge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              {links.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                   className="text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Title + tagline */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-2 leading-tight">
              {project.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Key metrics */}
          {project.metrics?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.metrics.slice(0, 2).map(m => (
                <div key={m.label}
                     className="flex items-center gap-1.5
                                bg-primary-50 dark:bg-primary-900/30
                                border border-primary-200 dark:border-primary-800/40
                                px-3 py-1.5 rounded-lg">
                  <TrendingUp size={11} className="text-primary-600 dark:text-primary-400 shrink-0" />
                  <span className="text-primary-700 dark:text-primary-300 font-bold text-sm">{m.value}</span>
                  <span className="text-slate-500 text-xs">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
            {project.techStack?.slice(0, 6).map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
            {project.techStack?.length > 6 && (
              <span className="tech-badge">+{project.techStack.length - 6}</span>
            )}
          </div>

          {/* Case study link */}
          {project.slug && (
            <Link href={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-sm font-semibold
                         text-primary-600 dark:text-primary-400
                         hover:text-primary-700 dark:hover:text-primary-300
                         transition-colors group/link mt-1">
              View Case Study
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data?.length ? data : PROJECTS_DATA))
      .catch(() => setProjects(PROJECTS_DATA))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section-container">
      <SectionHeader
        label="03. Projects"
        title="What I've Built"
        subtitle="End-to-end systems — from architecture to production deployment."
      />

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card h-64 animate-pulse p-6">
              <div className="h-3 bg-slate-200 dark:bg-white/10 rounded mb-4 w-1/4" />
              <div className="h-5 bg-slate-200 dark:bg-white/10 rounded mb-3 w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-white/5 rounded mb-2 w-full" />
              <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
