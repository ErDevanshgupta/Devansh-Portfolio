'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { Code2, Target, Compass, Mail } from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Animated stat cell ───────────────────────────── */
function StatCell({ value, label, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="text-center"
    >
      <motion.span
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.12, type: 'spring', stiffness: 220 }}
        className="block text-xl font-extrabold gradient-text leading-none mb-0.5"
      >
        {value}
      </motion.span>
      <span className="text-[10px] text-slate-500 dark:text-slate-500 font-medium leading-snug">
        {label}
      </span>
    </motion.div>
  );
}

const STATS = [
  { value: '10+',   label: 'Publications' },
  { value: '96.9%', label: 'Peak Accuracy'},
  { value: '5+',    label: 'Internships'  },
  { value: 'N5→N4', label: 'Japanese'     },
];

/* ── Right-side info card ────────────────────────── */
function InfoCard({ icon: Icon, label, iconBg, iconBorder, iconColor, children }) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className="glass-card p-5
                 hover:border-primary-400/30 dark:hover:border-primary-700/40
                 hover:shadow-md dark:hover:shadow-primary-900/15
                 transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${iconBg} ${iconBorder}`}>
          <Icon size={15} className={iconColor} />
        </div>
        <h4 className="text-slate-900 dark:text-white font-semibold text-sm">{label}</h4>
      </div>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-container">
      <SectionHeader label="01. About" title="Who I Am" />

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* ── Left ─────────────────────────────── */}
        <AnimatedSection>
          <div className="space-y-6">

            {/* Profile mini-row */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative shrink-0 w-14 h-14 rounded-full overflow-hidden
                           ring-2 ring-primary-400/50 dark:ring-primary-500/40
                           shadow-md shadow-primary-500/15"
              >
                <Image
                  src="/profile-pic.png" alt="Devansh Gupta"
                  width={56} height={56}
                  className="w-full h-full object-cover object-top" priority
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full
                                 bg-emerald-400 border-2 border-white dark:border-dark-900"
                      style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }} />
              </motion.div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-base leading-tight">
                  Devansh Gupta
                </h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-0.5">
                  Software Engineer · Full Stack Developer
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 font-mono">
                  TIET · Kurukshetra, India
                </p>
              </div>
            </div>

            {/* Short intro */}
            <div className="text-slate-600 dark:text-slate-400 text-base leading-relaxed space-y-3">
              <p>
                I&apos;m a{' '}
                <span className="text-slate-900 dark:text-white font-semibold">
                  Software Engineer and Full Stack Developer
                </span>{' '}
                building scalable systems, intelligent applications, and production-ready software.
                My work spans real-time AI for industrial automation, medical imaging pipelines
                for cancer detection, and full-stack platforms serving live users across markets.
              </p>
              <p>
                I take{' '}
                <span className="text-slate-900 dark:text-white font-medium">end-to-end ownership</span>
                {' '}— from system architecture and API design through to production deployment,
                monitoring, and iteration. My stack centers on React, Next.js, Node.js, TypeScript,
                Python, and AWS — with a strong focus on{' '}
                <span className="text-slate-900 dark:text-white font-medium">
                  performance, maintainability, and engineering fundamentals
                </span>.
              </p>
              <p>
                I actively leverage{' '}
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  AI-assisted development workflows
                </span>{' '}
                to move faster on complex problems while maintaining high engineering standards.
              </p>
            </div>

            {/* Location + availability */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2.5 text-sm font-mono
                               text-primary-700 dark:text-primary-400
                               border border-primary-200 dark:border-primary-800/50
                               bg-primary-50/80 dark:bg-primary-900/20
                               px-4 py-2 rounded-full">
                <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  📍
                </motion.span>
                Kurukshetra, India
                <span className="text-primary-300 dark:text-primary-700 mx-0.5">·</span>
                <motion.span
                  className="flex items-center gap-1.5"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
                        style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
                  Open to Remote
                </motion.span>
              </span>
            </motion.div>

            {/* Social links */}
            <div className="flex gap-2">
              {[
                { href: 'https://github.com/ErDevanshgupta',             icon: GithubIcon,  label: 'GitHub'   },
                { href: 'https://www.linkedin.com/in/er-devansh-gupta/', icon: LinkedinIcon,label: 'LinkedIn' },
                { href: 'mailto:erdevanshgupta@gmail.com',               icon: Mail,        label: 'Email'    },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href}
                   target={label !== 'Email' ? '_blank' : undefined}
                   rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl
                              text-slate-600 dark:text-slate-400
                              bg-slate-100 dark:bg-white/5
                              border border-slate-200 dark:border-white/[0.08]
                              hover:text-primary-700 dark:hover:text-primary-400
                              hover:border-primary-200 dark:hover:border-primary-800/40
                              hover:bg-primary-50 dark:hover:bg-primary-900/20
                              transition-all duration-200">
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </div>

            {/* Stats strip */}
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-white/5 py-4">
                {STATS.map((s, i) => (
                  <StatCell key={s.label} value={s.value} label={s.label} index={i} />
                ))}
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* ── Right: info cards ─────────────────── */}
        <div className="space-y-4">

          {/* What I Build */}
          <AnimatedSection delay={0.05}>
            <InfoCard
              icon={Code2}
              label="What I Build"
              iconBg="bg-primary-50 dark:bg-primary-900/30"
              iconBorder="border-primary-100 dark:border-primary-800/40"
              iconColor="text-primary-600 dark:text-primary-400"
            >
              <div className="space-y-2">
                {['Full Stack Systems', 'Scalable Architectures', 'AI Applications', 'Cloud Infrastructure'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 text-sm">
                    <span className="text-primary-500 dark:text-primary-400 text-xs shrink-0">▸</span>
                    {item}
                  </div>
                ))}
              </div>
            </InfoCard>
          </AnimatedSection>

          {/* What I Care About */}
          <AnimatedSection delay={0.1}>
            <InfoCard
              icon={Target}
              label="What I Care About"
              iconBg="bg-emerald-50 dark:bg-emerald-900/30"
              iconBorder="border-emerald-100 dark:border-emerald-800/40"
              iconColor="text-emerald-600 dark:text-emerald-400"
            >
              <div className="flex flex-wrap gap-2">
                {['Ownership', 'Performance', 'Maintainability', 'System Design'].map(item => (
                  <span key={item}
                        className="text-xs px-2.5 py-1 rounded-full font-medium
                                   bg-emerald-50 dark:bg-emerald-900/20
                                   text-emerald-700 dark:text-emerald-400
                                   border border-emerald-200 dark:border-emerald-800/40">
                    {item}
                  </span>
                ))}
              </div>
            </InfoCard>
          </AnimatedSection>

          {/* Currently Exploring */}
          <AnimatedSection delay={0.15}>
            <InfoCard
              icon={Compass}
              label="Currently Exploring"
              iconBg="bg-violet-50 dark:bg-violet-900/30"
              iconBorder="border-violet-100 dark:border-violet-800/40"
              iconColor="text-violet-600 dark:text-violet-400"
            >
              <div className="space-y-2">
                {['Distributed Systems', 'Applied AI / LLMs', 'Japanese (JLPT N4)'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </InfoCard>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
