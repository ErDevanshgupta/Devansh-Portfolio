'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { Code2, Cpu, Cloud, BookOpen, Mail } from 'lucide-react';

/* ── Inline SVG icons (no extra dep) ─────────────── */
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

/* ── Stats ────────────────────────────────────────── */
const STATS = [
  { value: '10+',   label: 'Publications' },
  { value: '96.9%', label: 'Peak Accuracy' },
  { value: '5+',    label: 'Internships' },
  { value: 'N5→N4', label: 'Japanese' },
];

/* ── Highlight cards ──────────────────────────────── */
const HIGHLIGHTS = [
  {
    icon: Code2,
    label: 'Full-Stack Engineering',
    desc: 'React, Next.js, Node.js, TypeScript, Python. End-to-end ownership from API design to production deployment.',
  },
  {
    icon: Cpu,
    label: 'AI & Computer Vision',
    desc: 'YOLOv11, real-time inference, 96.9% production accuracy. Medical imaging pipelines for GI cancer detection.',
  },
  {
    icon: Cloud,
    label: 'Cloud & Infrastructure',
    desc: 'AWS, Docker, Kubernetes, Terraform. Cloud-native architectures built for scale and fault tolerance.',
  },
  {
    icon: BookOpen,
    label: 'Continuous Learner',
    desc: 'JLPT N5 certified, N4 in progress. Cross-cultural engineering experience across India and Taiwan.',
  },
];

/* ── Animated stat cell ───────────────────────────── */
function StatCell({ value, label, index }) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      className="flex flex-col items-center justify-center py-4 px-2 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.09 + 0.15, type: 'spring', stiffness: 220 }}
        className="text-xl font-extrabold gradient-text leading-none mb-1"
      >
        {value}
      </motion.span>
      <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="section-container">
      <SectionHeader label="01. About" title="Who I Am" />

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* ── Left: bio ────────────────────────────── */}
        <AnimatedSection>
          <div className="space-y-5 text-slate-600 dark:text-slate-400 text-base leading-relaxed">

            <p>
              I&apos;m a{' '}
              <span className="text-slate-900 dark:text-white font-semibold">
                Software Engineer and Full-Stack Developer
              </span>{' '}
              focused on building scalable systems, intelligent applications, and production-ready
              software with strong engineering fundamentals. I recently graduated in Computer
              Engineering from{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                Thapar Institute of Engineering and Technology
              </span>
              , bringing hands-on experience across full-stack engineering, cloud infrastructure,
              computer vision, and AI-driven systems.
            </p>

            <p>
              My work spans developing{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                real-time AI systems for industrial automation
              </span>
              , building{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                medical imaging pipelines for cancer detection
              </span>
              , and engineering full-stack applications with modern cloud-native architectures.
              At{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                National Chung Cheng University
              </span>{' '}
              and{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                REDAI Precision Tools, Taiwan
              </span>
              , I delivered production-focused AI solutions involving computer vision,
              hyperspectral imaging, and real-time inference under real-world constraints.
            </p>

            <p>
              I build with{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                React, Next.js, Node.js, TypeScript, Python, AWS, Docker,
              </span>{' '}
              and{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                Kubernetes
              </span>{' '}
              — caring deeply about{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                performance, maintainability, and system design
              </span>
              . I actively leverage AI-assisted development workflows to move faster and focus
              on solving high-value problems rather than repetitive implementation work.
            </p>

            <p>
              Beyond engineering, I believe in continuous learning and adaptability. Having
              worked in Taiwan, I completed{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                JLPT N5 Japanese certification
              </span>{' '}
              and am currently preparing for N4 — reflecting the same consistency and growth
              mindset I bring to every engineering challenge. My goal is straightforward: build
              reliable software, take ownership of meaningful problems, and continuously improve
              as a{' '}
              <span className="text-slate-900 dark:text-white font-medium">
                high-impact engineer
              </span>
              .
            </p>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-1"
            >
              <span className="inline-flex items-center gap-2.5 text-sm font-mono
                               text-primary-700 dark:text-primary-400
                               border border-primary-200 dark:border-primary-800/50
                               bg-primary-50/80 dark:bg-primary-900/20
                               px-4 py-2 rounded-full">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  📍
                </motion.span>
                Kurukshetra, India
                <span className="text-primary-300 dark:text-primary-700 mx-0.5">·</span>
                <motion.span
                  className="flex items-center gap-1.5"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
                    style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }}
                  />
                  Open to Remote
                </motion.span>
              </span>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ── Right: identity card + stats + cards ─── */}
        <div className="space-y-4">

          {/* Identity / profile card */}
          <AnimatedSection delay={0.05}>
            <div className="glass-card overflow-hidden">
              {/* Gradient top bar */}
              <div className="h-0.5 bg-gradient-to-r from-primary-500 via-cyan-400 to-primary-600" />

              <div className="p-5">
                {/* Avatar row */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Profile photo */}
                  <div className="relative shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 rounded-full overflow-hidden
                                 ring-2 ring-primary-400/50 dark:ring-primary-500/40
                                 shadow-lg shadow-primary-500/20 dark:shadow-primary-500/10"
                    >
                      <Image
                        src="/profile-pic.png"
                        alt="Devansh Gupta"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </motion.div>
                    {/* Online dot */}
                    <span
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full
                                 bg-emerald-400 border-2 border-white dark:border-dark-900"
                      style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }}
                    />
                  </div>

                  {/* Name + title */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">
                      Devansh Gupta
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-0.5">
                      Software Engineer · Full-Stack Developer
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 font-mono">
                      TIET · Kurukshetra, India
                    </p>
                  </div>
                </div>

                {/* Current role pill */}
                <div className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl
                                bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 mb-4">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest leading-none mb-0.5">
                      Currently
                    </p>
                    <p className="text-slate-900 dark:text-white text-sm font-semibold truncate">
                      Freelance Full Stack Engineer
                    </p>
                    <p className="text-slate-500 text-xs truncate">
                      Open to Full-Time SWE / Full-Stack Roles
                    </p>
                  </div>
                </div>

                {/* Social / contact buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { href: 'https://github.com/ErDevanshgupta', icon: GithubIcon, label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/er-devansh-gupta/', icon: LinkedinIcon, label: 'LinkedIn' },
                    { href: 'mailto:erdevanshgupta@gmail.com', icon: Mail, label: 'Email' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={label !== 'Email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-medium
                                 text-slate-600 dark:text-slate-400
                                 bg-slate-100 dark:bg-white/5
                                 hover:bg-primary-50 dark:hover:bg-primary-900/30
                                 hover:text-primary-700 dark:hover:text-primary-400
                                 border border-transparent hover:border-primary-200 dark:hover:border-primary-800/40
                                 transition-all duration-200"
                    >
                      <Icon size={15} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats strip */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-white/5">
                {STATS.map((s, i) => (
                  <StatCell key={s.label} value={s.value} label={s.label} index={i} />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Highlight cards 2 × 2 */}
          <div className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
              <AnimatedSection key={label} delay={0.12 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className="glass-card p-4 h-full cursor-default
                             hover:border-primary-400/40 dark:hover:border-primary-600/50
                             hover:shadow-md dark:hover:shadow-primary-900/20
                             transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3
                                  bg-primary-50 dark:bg-primary-900/30
                                  border border-primary-100 dark:border-primary-800/40
                                  group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50
                                  transition-colors">
                    <Icon size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-slate-900 dark:text-white font-semibold text-sm mb-1">
                    {label}
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
