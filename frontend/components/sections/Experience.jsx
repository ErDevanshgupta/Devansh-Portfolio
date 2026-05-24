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
  Industry:  'bg-gradient-to-r from-primary-500 to-cyan-400',
};

const EXPERIENCES = [
  {
    role: 'Freelance Full Stack Engineer',
    company: 'Self-Employed · Remote — India & Japan',
    period: '2024 – Present',
    type: 'Freelance',
    clients: ['Kanhaji Japan', 'Shyama Corporation', 'Indozaika'],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Nginx', 'AWS EC2'],
    keyImpact: 'Production system live at kanhaji.jp — serving real users in Japan',
    ctaUrl: 'https://kanhaji.jp',
    ctaLabel: 'View Live Project',
    points: [
      'Architected and shipped Kanhaji Japan (kanhaji.jp) — a full-stack cross-border e-commerce platform with GMO & Square payment gateways, role-based admin controls, and automated order workflows.',
      'Engineered production infrastructure using Redis caching, Docker containerization, Nginx reverse proxy, and AWS EC2 — reducing API latency and enabling horizontal scaling.',
      'Delivered full-stack digital systems for Shyama Corporation and Indozaika (Japan-based restaurant) — covering online ordering, business workflows, and customer-facing experiences end-to-end.',
    ],
  },
  {
    role: 'AI Systems Engineer (Consulting)',
    company: 'REDAI Precision Tools · Chiayi, Taiwan',
    period: 'Jan 2025 – June 2025',
    type: 'Industry',
    techStack: ['YOLOv11', 'Intel RealSense', 'OpenCV', 'Python', 'RGB-D Imaging', 'Edge AI'],
    keyImpact: '96.9% segmentation accuracy · 10% production throughput increase',
    points: [
      'Architected a real-time vision inspection system using Intel RealSense RGB-D + YOLOv11 — achieving 96.9% segmentation and 93.2% detection accuracy, directly replacing a manual QA step on the assembly line.',
      'Delivered a measurable 10% improvement in production throughput by eliminating inspection bottlenecks and enabling continuous unattended operation in an Industry 4.0 environment.',
      'Optimized edge inference pipelines to meet industrial latency constraints without cloud dependency — enabling reliable deployment in high-throughput factory environments.',
    ],
  },
  {
    role: 'AI Research Engineer Intern',
    company: 'National Chung Cheng University · Taiwan',
    period: 'Dec 2024 – June 2025',
    type: 'Research',
    techStack: ['Python', 'Hyperspectral Imaging', 'ML Pipelines', 'Computer Vision'],
    keyImpact: 'Novel GI cancer detection pipeline — targeting Impact Factor 2–4 journals',
    points: [
      'Designed SAVE (Spectrum-Aided Visual Enhancement) — a hyperspectral ML pipeline for early-stage GI cancer detection with clinically meaningful sensitivity improvements over conventional endoscopic imaging.',
      'Built end-to-end spectral feature extraction and lesion differentiation pipelines, enabling high-precision classification of pre-cancerous tissue from hyperspectral endoscopy data.',
      'Contributed to peer-reviewed research targeting journals with Impact Factor 2–4, advancing non-invasive cancer screening methodology.',
    ],
  },
  {
    role: 'Research Engineer Intern',
    company: 'Chip Ready.org · Taiwan',
    period: 'Jan 2025 – June 2025',
    type: 'Research',
    techStack: ['Semiconductor Lifecycle Analysis', 'Supply Chain Modeling', 'Technical Documentation'],
    keyImpact: 'Structured supply-chain analysis used for strategic chip workflow planning',
    points: [
      'Modelled the complete semiconductor product lifecycle — fab to test, packaging, and logistics — producing structured supply-chain analysis used to guide strategic planning for chip workflows.',
      'Authored technical training modules that reduced onboarding time for incoming semiconductor program engineers, improving team ramp-up efficiency.',
    ],
  },
  {
    role: 'Cloud & DevOps Intern',
    company: 'Wipro FullStride Cloud · Gurugram, India',
    period: 'July 2024 – Sept 2024',
    type: 'Industry',
    techStack: ['Terraform', 'AWS', 'CI/CD', 'IaC', 'Real-Time Systems'],
    keyImpact: 'Automated cloud deployment pipelines on live client infrastructure',
    points: [
      'Engineered a horizontally scalable real-time chat system on AWS using Terraform IaC — enabling low-latency multi-user communication with fully automated, repeatable deployment pipelines.',
      'Designed fault-tolerant cloud architecture patterns that reduced manual intervention in deployment cycles, contributing directly to productivity on live client infrastructure.',
    ],
  },
  {
    role: 'ML Engineering Trainee',
    company: 'Meritech Software Pvt. Ltd. · Mohali, India',
    period: 'May 2023 – Aug 2023',
    type: 'Industry',
    techStack: ['Python', 'ML Pipelines', 'Data Preprocessing'],
    points: [
      'Optimized data preprocessing, training, and evaluation pipelines for production ML models — improving robustness and reducing variance across deployment environments.',
    ],
  },
];

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
          {EXPERIENCES.map((exp, i) => (
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
