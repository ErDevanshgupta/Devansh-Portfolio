'use client';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink, MessageSquare } from 'lucide-react';
import { scrollTo } from '@/lib/utils';

/* ── Terminal card sub-components ────────────────── */
const TCmd = ({ text }) => (
  <div className="flex gap-2">
    <span className="text-primary-500 dark:text-primary-400 shrink-0">$</span>
    <span className="text-slate-600 dark:text-slate-400">{text}</span>
  </div>
);

const TRow = ({ label, value, accent }) => (
  <div className="flex gap-0 pl-3">
    <span className="text-slate-400 dark:text-slate-600 shrink-0 w-20">{label}</span>
    <span className={accent
      ? 'text-primary-600 dark:text-primary-400'
      : 'text-slate-600 dark:text-slate-400'}>
      {value}
    </span>
  </div>
);

const TProject = ({ name, badge, color }) => (
  <div className="flex items-center justify-between pl-3">
    <span className="text-slate-600 dark:text-slate-400">{name}</span>
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${color}`}>
      ● {badge}
    </span>
  </div>
);

function TerminalCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-primary-500/5 dark:bg-primary-500/8 rounded-3xl blur-2xl pointer-events-none" />
      <div className="relative glass-card overflow-hidden
                      shadow-xl shadow-slate-200/40 dark:shadow-black/25
                      border-slate-200/80 dark:border-white/[0.12]">

        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3
                        bg-slate-50/80 dark:bg-white/[0.025]
                        border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 ml-2 select-none">
            devansh@systems — ~/portfolio
          </span>
        </div>

        {/* Body */}
        <div className="p-5 font-mono text-[11.5px] leading-[1.75] space-y-0.5">

          <TCmd text="cat engineering-profile.json" />
          <div className="h-1.5" />

          <TRow label="Role" value="Full Stack + AI Engineer" />
          <div className="flex gap-0 pl-3">
            <span className="text-slate-400 dark:text-slate-600 shrink-0 w-20">Status</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              Open to Opportunities
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"
                    style={{ boxShadow: '0 0 5px rgba(52,211,153,0.9)' }} />
            </span>
          </div>
          <TRow label="Base" value="India · Open to Remote" />

          <div className="h-2" />
          <TCmd text="stack --active" />
          <div className="h-1" />
          <TRow label="Frontend" value="Next.js · React · TypeScript" accent />
          <TRow label="Backend" value="Node.js · Express · MongoDB" accent />
          <TRow label="Cloud" value="AWS · Docker · Kubernetes" accent />
          <TRow label="AI / ML" value="Python · YOLOv11 · OpenCV" accent />

          <div className="h-2" />
          <TCmd text="ls ./production" />
          <div className="h-1" />
          <TProject name="kanhaji.jp"
            badge="LIVE"
            color="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" />
          <TProject name="AI Vision Inspector"
            badge="PROD"
            color="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400" />
          <TProject name="GI Cancer Pipeline"
            badge="PUB"
            color="bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400" />
          <TProject name="SDN Routing Patent"
            badge="FILED"
            color="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" />

          <div className="h-2" />
          <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
            <span>$</span>
            <span className="inline-block w-[9px] h-[14px] bg-primary-500 dark:bg-primary-400 ml-0.5 align-middle animate-blink" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stat item ───────────────────────────────────── */
const STATS = [
  { value: '10+', label: 'Publications' },
  { value: '1',   label: 'Patent'       },
  { value: '3+',  label: 'Live Products'},
  { value: '5+',  label: 'Internships'  },
];

const TECH = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'Kubernetes', 'AI/ML'];

/* ── Animation preset ────────────────────────────── */
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0  },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── Page ────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100
                      dark:from-dark-950 dark:via-dark-900 dark:to-dark-850" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.07)_0%,transparent_55%)]
                      dark:bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.14)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05)_0%,transparent_55%)]
                      dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08)_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-28 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center
                        min-h-screen md:min-h-0 md:py-36">

          {/* ── Left: content ──────────────────── */}
          <div className="space-y-7">

            {/* Availability badge */}
            <motion.div {...up(0)}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                              border border-primary-200 dark:border-primary-800/50
                              bg-primary-50/80 dark:bg-primary-900/20
                              text-primary-700 dark:text-primary-400 text-sm font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                      style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
                Available for opportunities
              </div>
            </motion.div>

            {/* Name + role */}
            <motion.header {...up(0.08)}>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold
                             text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-3">
                Devansh <span className="gradient-text">Gupta</span>
              </h1>
              <h2 className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Software Engineer · Full Stack Developer
              </h2>
            </motion.header>

            {/* Positioning headline */}
            <motion.p {...up(0.15)}
              className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
              Engineering scalable software, intelligent systems, and real-world products —
              from architecture to deployment.
            </motion.p>

            {/* CTAs */}
            <motion.div {...up(0.22)} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl
                           shadow-lg shadow-primary-200/60 dark:shadow-primary-900/40
                           transition-all duration-200 hover:-translate-y-0.5
                           flex items-center gap-2 text-sm">
                View Projects <ExternalLink size={14} />
              </button>
              <a href="/resume.pdf" download
                 className="px-6 py-3
                            border border-slate-300 dark:border-white/15
                            text-slate-700 dark:text-slate-300
                            hover:border-primary-400 dark:hover:border-primary-600/70
                            hover:text-primary-700 dark:hover:text-primary-400
                            font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5
                            flex items-center gap-2 text-sm">
                Download Resume <Download size={14} />
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3
                           text-slate-500 dark:text-slate-400
                           hover:text-primary-600 dark:hover:text-primary-400
                           font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5
                           flex items-center gap-2 text-sm">
                Let&apos;s Connect <MessageSquare size={14} />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div {...up(0.3)}
              className="flex flex-wrap gap-8 pt-3 border-t border-slate-200 dark:border-white/[0.08]">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-extrabold gradient-text leading-none mb-0.5">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech strip */}
            <motion.p {...up(0.36)}
              className="text-xs font-mono text-slate-400 dark:text-slate-600 tracking-wide">
              {TECH.join(' · ')}
            </motion.p>

          </div>

          {/* ── Right: terminal card ───────────── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block"
          >
            <TerminalCard />
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   text-slate-400 dark:text-slate-600
                   hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        <ArrowDown size={22} />
      </motion.button>
    </section>
  );
}
