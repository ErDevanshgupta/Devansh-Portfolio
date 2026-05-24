import { getProjectBySlug, getProjects } from '@/lib/api';
import { PROJECTS_DATA } from '@/lib/projectsData';
import Link from 'next/link';
import { ExternalLink, BookOpen, ArrowLeft, TrendingUp, Zap, Target } from 'lucide-react';

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

/* Pull from static data first, API second */
async function fetchProject(slug) {
  const staticProject = PROJECTS_DATA.find(p => p.slug === slug);
  if (staticProject) return staticProject;
  try { return await getProjectBySlug(slug); } catch { return null; }
}

export async function generateStaticParams() {
  const staticSlugs = PROJECTS_DATA.map(p => ({ slug: p.slug }));
  try {
    const apiProjects = await getProjects();
    const apiSlugs    = apiProjects.map(p => ({ slug: p.slug }));
    return [...staticSlugs, ...apiSlugs];
  } catch {
    return staticSlugs;
  }
}

export async function generateMetadata({ params }) {
  const project = await fetchProject(params.slug);
  if (!project) return { title: 'Project — Devansh Gupta' };
  return {
    title: `${project.title} — Devansh Gupta`,
    description: project.tagline,
  };
}

/* ── Content section component ─────────────────────── */
function ContentSection({ icon: Icon, accent, title, points }) {
  return (
    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden">
      <div className={`h-0.5 ${accent}`} />
      <div className="p-6 md:p-8">
        <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-5">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center
                           bg-primary-50 dark:bg-primary-900/30
                           border border-primary-100 dark:border-primary-800/40 shrink-0">
            <Icon size={17} className="text-primary-600 dark:text-primary-400" />
          </span>
          {title}
        </h2>
        <ul className="space-y-3">
          {points.map((pt, i) => (
            <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              <span className="text-primary-500 mt-[3px] shrink-0 text-xs">▸</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────── */
export default async function ProjectDetail({ params }) {
  const project = await fetchProject(params.slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 text-center text-slate-500">
        <p className="text-lg mb-4">Project not found.</p>
        <Link href="/#projects" className="text-primary-600 dark:text-primary-400 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const category   = project.category || 'Personal';
  const badgeClass = CATEGORY_STYLE[category] || CATEGORY_STYLE.Personal;

  /* Links row */
  const links = [
    project.demoUrl   && project.demoUrl   !== '#' && { href: project.demoUrl,   icon: ExternalLink, label: 'Live Project', primary: true  },
    project.paperUrl  && project.paperUrl  !== '#' && { href: project.paperUrl,  icon: BookOpen,     label: 'Read Paper',   primary: false },
    project.githubUrl && project.githubUrl !== '#' && { href: project.githubUrl, icon: GithubIcon,   label: 'View Code',    primary: false },
  ].filter(Boolean);

  /* Detect whether this is a static project (has built/engineering/impact) or API project (has problem/approach) */
  const isStaticProject = Boolean(project.built);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back */}
        <Link href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500
                     hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-10">
          <ArrowLeft size={15} />
          Back to Projects
        </Link>

        {/* ── Hero block ────────────────────────────── */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden mb-6">
          <div className={`h-1 ${
            category === 'Freelance' ? 'bg-gradient-to-r from-amber-400  to-orange-400' :
            category === 'Research'  ? 'bg-gradient-to-r from-violet-500 to-purple-400' :
                                       'bg-gradient-to-r from-primary-500 to-cyan-400'
          }`} />
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${badgeClass}`}>
                {category}
              </span>
              {project.subtitle && (
                <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">
                  {project.subtitle}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* ── Metrics grid ─────────────────────────── */}
        {project.metrics?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {project.metrics.map(m => (
              <div key={m.label}
                   className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]
                              rounded-xl p-4 text-center">
                <p className="text-2xl font-extrabold gradient-text mb-1">{m.value}</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs font-medium">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Tech stack ───────────────────────────── */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]
                        rounded-2xl p-6 mb-6">
          <p className="text-xs font-mono text-primary-600 dark:text-primary-400 tracking-widest uppercase mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>

        {/* ── Structured sections (static projects) ── */}
        {isStaticProject && (
          <div className="space-y-4 mb-6">
            {project.built?.length > 0 && (
              <ContentSection
                icon={Zap}
                accent="bg-gradient-to-r from-primary-500 to-cyan-400"
                title="What I Built"
                points={project.built}
              />
            )}
            {project.engineering?.length > 0 && (
              <ContentSection
                icon={TrendingUp}
                accent="bg-gradient-to-r from-primary-600 to-primary-400"
                title="Scalability & Engineering"
                points={project.engineering}
              />
            )}
            {project.impact?.length > 0 && (
              <ContentSection
                icon={Target}
                accent={
                  category === 'Freelance' ? 'bg-gradient-to-r from-amber-400 to-orange-400' :
                  category === 'Research'  ? 'bg-gradient-to-r from-violet-500 to-purple-400' :
                                             'bg-gradient-to-r from-emerald-500 to-teal-400'
                }
                title="Ownership & Impact"
                points={project.impact}
              />
            )}
          </div>
        )}

        {/* ── Markdown sections (API/admin projects) ── */}
        {!isStaticProject && (project.problem || project.approach) && (
          <div className="space-y-4 mb-6">
            {project.problem && (
              <ContentSection
                icon={Zap}
                accent="bg-gradient-to-r from-primary-500 to-cyan-400"
                title="Problem"
                points={[project.problem]}
              />
            )}
            {project.approach && (
              <ContentSection
                icon={Target}
                accent="bg-gradient-to-r from-emerald-500 to-teal-400"
                title="Approach"
                points={[project.approach]}
              />
            )}
          </div>
        )}

        {/* ── Keywords ────────────────────────────── */}
        {project.keywords?.length > 0 && (
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]
                          rounded-2xl p-6 mb-6">
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-3">
              Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {project.keywords.map(k => (
                <span key={k}
                      className="text-xs px-3 py-1 rounded-full font-medium
                                 bg-slate-100 dark:bg-white/5
                                 text-slate-600 dark:text-slate-400
                                 border border-slate-200 dark:border-white/10">
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Links ───────────────────────────────── */}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4">
            {links.map(({ href, icon: Icon, label, primary }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                 className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all
                   ${primary
                     ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-200 dark:shadow-primary-900/30'
                     : 'border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-700 dark:hover:text-primary-400'
                   }`}>
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
