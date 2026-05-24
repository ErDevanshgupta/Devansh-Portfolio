'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { scrollTo } from '@/lib/utils';

const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'Computer Vision Engineer',
  'AI Systems Builder',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — light & dark variants */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-850" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.07)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                     border border-primary-200 dark:border-primary-800/50
                     bg-primary-50/80 dark:bg-primary-900/20
                     text-primary-700 dark:text-primary-400 text-sm font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight"
        >
          Devansh <span className="gradient-text">Gupta</span>
        </motion.h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-mono mb-6 h-8"
        >
          <span className="text-primary-600 dark:text-primary-400">{'>'}</span>{' '}
          <span key={roleIndex} className="inline-block animate-fade-in-up">{ROLES[roleIndex]}</span>
          <span className="animate-blink text-primary-600 dark:text-primary-400 ml-1">|</span>
        </motion.div>

        {/* Value prop */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Scalable systems and intelligent applications — built with production-grade engineering fundamentals.
          <br className="hidden sm:block" />
          Full-Stack · Computer Vision · AI · Cloud-Native.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl
                       shadow-lg shadow-primary-200/60 dark:shadow-primary-900/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            View Projects <ExternalLink size={16} />
          </button>
          <a
            href="/resume.pdf" download
            className="px-8 py-4 border border-primary-300 dark:border-primary-600/50
                       text-primary-700 dark:text-primary-400
                       hover:bg-primary-50 dark:hover:bg-primary-600/10
                       font-semibold rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            Download Resume <Download size={16} />
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { href: 'https://github.com/ErDevanshgupta', icon: GithubIcon, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/er-devansh-gupta/', icon: LinkedinIcon, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:-translate-y-0.5">
              <Icon size={20} />
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, y: { repeat: Infinity, duration: 1.5 } }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowDown size={24} />
        </motion.button>
      </div>
    </section>
  );
}
