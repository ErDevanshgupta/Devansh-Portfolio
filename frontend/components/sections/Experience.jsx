'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { Briefcase, Code2, ExternalLink, Zap } from 'lucide-react';

const TYPE_STYLE = {
  Freelance: 'bg-amber-50  dark:bg-amber-900/40  text-amber-700  dark:text-amber-400  border border-amber-200  dark:border-amber-800/40',
  Research:  'bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/40',
  Industry:  'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800/40',
};

const ACCENT_BAR = {
  Freelance: 'bg-gradient-to-r from-amber-400 to-orange-400',
  Research:  'bg-gradient-to-r from-violet-500 to-purple-400',
  Industry:  'bg-gradient-to-r from-primary-600 to-primary-400',
};

import { useEffect, useState } from 'react';
import { getExperiences } from '@/lib/api';

function ExperienceCard({ exp }) {
  const accentBar  = ACCENT_BAR[exp.type]  || ACCENT_BAR.Industry;
  const badgeClass = TYPE_STYLE[exp.type]  || TYPE_STYLE.Industry;

  return (
    <div className="glass-card overflow-hidden
                    hover:border-primary-400/30 dark:hover:border-primary-700/40
                    hover:shadow-lg dark:hover:shadow-primary-900/15
                    transition-all duration-300">
      {/* Category accent bar */}
      <div className={`h-0.5 ${accentBar}`} />

      <div className="p-6">
        {/* ── Row 1: title + meta ───────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-4">
          <div className="min-w-0">
            <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-snug">
              {exp.role}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-0.5">
              {exp.company}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-slate-400 dark:text-slate-500 text-xs font-mono whitespace-nowrap">
              {exp.period}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${badgeClass}`}>
              {exp.type}
            </span>
          </div>
        </div>

        {/* ── Row 2: tech stack ─────────────────── */}
        {exp.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {exp.techStack.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        )}

        {/* ── Row 3: key impact pill ────────────── */}
        {exp.keyImpact && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                          bg-emerald-50 dark:bg-emerald-900/20
                          border border-emerald-200 dark:border-emerald-800/40">
            <Zap size={11} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 leading-none">
              {exp.keyImpact}
            </span>
          </div>
        )}

        {/* ── Client chips (Freelance only) ─────── */}
        {exp.clients?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Clients:</span>
            {exp.clients.map(c => (
              <span key={c}
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium
                               bg-slate-100 dark:bg-white/5
                               text-slate-700 dark:text-slate-300
                               border border-slate-200 dark:border-white/10">
                {c}
              </span>
            ))}
          </div>
        )}

        {/* ── Bullets ───────────────────────────── */}
        <ul className="space-y-2.5">
          {exp.points.map((pt, j) => (
            <li key={j} className="flex gap-2.5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              <span className="text-primary-500 dark:text-primary-500 mt-[3px] shrink-0 text-xs">▸</span>
              {pt}
            </li>
          ))}
        </ul>

        {/* ── CTA button ────────────────────────── */}
        {exp.ctaUrl && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
            <a href={exp.ctaUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 text-xs font-semibold
                          text-primary-600 dark:text-primary-400
                          hover:text-primary-700 dark:hover:text-primary-300
                          border border-primary-200 dark:border-primary-700/40
                          hover:border-primary-400 dark:hover:border-primary-500
                          bg-primary-50/60 dark:bg-primary-900/20
                          hover:bg-primary-50 dark:hover:bg-primary-900/30
                          px-3 py-1.5 rounded-lg transition-all duration-200">
              <ExternalLink size={11} />
              {exp.ctaLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    getExperiences().then(setExperiences).catch(console.error);
  }, []);

  return (
    <section id="experience" className="section-container">
      <SectionHeader
        label="04. Experience"
        title="Engineering Experience"
        subtitle="Building scalable products, intelligent systems, and production-ready software."
      />

      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute left-4 top-2 bottom-2 w-px
                        bg-gradient-to-b from-primary-500/70 via-primary-700/20 to-transparent
                        hidden md:block" />

        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="md:pl-14 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-3 w-8 h-8 rounded-full
                                bg-white dark:bg-dark-900
                                border-2 border-primary-500 dark:border-primary-600
                                hidden md:flex items-center justify-center
                                shadow-sm shadow-primary-200 dark:shadow-none">
                  {exp.type === 'Freelance'
                    ? <Code2 size={13} className="text-amber-500" />
                    : <Briefcase size={13} className="text-primary-600 dark:text-primary-400" />}
                </div>

                <ExperienceCard exp={exp} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
