'use client';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { BookOpen, ExternalLink, Award, ChevronDown, ChevronUp } from 'lucide-react';

/* ── Area badge styles ───────────────────────────── */
const AREA_STYLE = {
  'Industrial AI':       'bg-amber-50  dark:bg-amber-900/20  text-amber-700  dark:text-amber-400  border-amber-200  dark:border-amber-800/40',
  'Medical Imaging':     'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40',
  'Medical AI':          'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40',
  'Environmental Science':'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
};

/* ── Featured papers (top 4) ────────────────────── */
const FEATURED_PAPERS = [
  {
    title: 'Deep Learning-Based Toolkit Inspection: Object Detection & Segmentation in Assembly Lines',
    journal: 'Computers, Materials & Continua',
    area: 'Industrial AI',
    year: '2025',
    tags: ['Computer Vision', 'YOLOv11', 'Industry 4.0', 'Industrial AI'],
    url: 'https://www.techscience.com/cmc/v86n1/64475',
    relevance: 'Production AI system — 96.9% segmentation accuracy in live industrial deployment.',
  },
  {
    title: 'Emulating Hyperspectral and Narrow-Band Imaging for Deep Learning-Driven GI Disorder Detection',
    journal: 'Bioengineering',
    area: 'Medical Imaging',
    year: '2025',
    tags: ['Medical Imaging', 'Deep Learning', 'Hyperspectral Imaging', 'Computer Vision'],
    url: 'https://www.mdpi.com/2306-5354/12/9/953',
    relevance: 'Built ML pipeline for non-invasive cancer screening — engineered end-to-end from data to inference.',
  },
  {
    title: 'Enhancing Early GI Disease Detection with Spectral Visualization and Deep Learning',
    journal: 'Bioengineering',
    area: 'Medical AI',
    year: '2025',
    tags: ['Deep Learning', 'Medical AI', 'GI Detection', 'Spectral Imaging'],
    url: 'https://www.mdpi.com/2306-5354/12/8/828',
    relevance: 'Designed spectral feature extraction pipeline enabling early-stage disease classification.',
  },
  {
    title: 'Novel Approach to Risk Stratification: Integrating Waist-Hip Ratio for Predicting Advanced Colorectal Neoplasia',
    journal: 'World Journal of Clinical Oncology',
    area: 'Medical AI',
    year: '2025',
    tags: ['Machine Learning', 'Risk Prediction', 'Medical AI', 'Clinical Systems'],
    url: 'https://www.wjgnet.com/2218-4333/full/v16/i10/104350.htm',
    relevance: 'Applied ML-driven risk stratification for clinical decision support systems.',
  },
];

/* ── Additional papers (shown on expand) ─────────── */
const ADDITIONAL_PAPERS = [
  {
    title: 'Software-Based Transformation of White Light Endoscopy Images to Hyperspectral Images for Improved GI Disease Detection',
    journal: 'Diagnostics',
    area: 'Medical Imaging',
    year: '2025',
    tags: ['Hyperspectral Imaging', 'GI Disease', 'Image Processing', 'Deep Learning'],
    url: 'https://www.mdpi.com/2075-4418/15/13/1664',
  },
  {
    title: 'Hydrogen Peroxide-Enhanced Magnetic Resonance Imaging: A Novel Approach for Diagnosing Anorectal Fistula',
    journal: 'World Journal of Radiology',
    area: 'Medical Imaging',
    year: '2025',
    tags: ['Medical Imaging', 'MRI', 'Diagnostic Radiology'],
    url: 'https://www.wjgnet.com/1949-8470/full/v17/i3/105777.htm',
  },
  {
    title: 'Endoscopic Resection: A Novel Approach for Treating Oesophageal Gastrointestinal Stromal Tumours',
    journal: 'World Journal of Gastrointestinal Endoscopy',
    area: 'Medical AI',
    year: '2025',
    tags: ['Medical AI', 'Endoscopy', 'GI Treatment'],
    url: 'https://www.wjgnet.com/1948-5190/full/v17/i6/107088.htm',
  },
  {
    title: 'Transforming Paediatric Imaging: The Role of 4D Flow MRI in Quantifying Mesenteric Blood Flow',
    journal: 'World Journal of Radiology',
    area: 'Medical Imaging',
    year: '2025',
    tags: ['Medical Imaging', '4D Flow MRI', 'Paediatric Imaging'],
    url: 'https://www.wjgnet.com/1949-8470/full/v17/i6/106582.htm',
  },
  {
    title: 'Assessment of Physicochemical Quality of Groundwater in Haryana, India',
    journal: 'Recent Developments in Science and Technology for Sustainable Future',
    area: 'Environmental Science',
    year: '2024',
    tags: ['Data Analysis', 'Environmental Science', 'Statistical Methods'],
    url: null,
  },
];

/* ── Patent ──────────────────────────────────────── */
const PATENT = {
  title: 'Real-Time Adaptive Trust Routing for Underwater Software-Defined Networks',
  status: 'Published · Indian Patent · 2025',
  summary: 'Engineered an SDN-based adaptive routing mechanism for secure, energy-efficient underwater acoustic sensor networks — using trust-aware routing logic to dynamically handle changing network topologies without manual reconfiguration.',
  tags: ['Software Defined Networking', 'Distributed Systems', 'Routing Algorithms', 'Network Security', 'Adaptive Systems'],
};

/* ── Credibility pills ───────────────────────────── */
const PILLS = ['10+ Publications', '1 Published Patent', 'AI & Computer Vision', 'Medical Imaging', 'Industrial AI'];

/* ── Publication card ────────────────────────────── */
function PaperCard({ paper, featured = false, index = 0 }) {
  const areaStyle = AREA_STYLE[paper.area] || AREA_STYLE['Medical Imaging'];

  return (
    <AnimatedSection delay={index * 0.06}>
      <div className="glass-card overflow-hidden h-full flex flex-col
                      hover:border-primary-400/30 dark:hover:border-primary-700/40
                      hover:shadow-md dark:hover:shadow-primary-900/15
                      transition-all duration-300">
        <div className="h-0.5 bg-gradient-to-r from-primary-500 to-cyan-400" />

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Area + year + published */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${areaStyle}`}>
              {paper.area}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 dark:text-slate-500 text-xs font-mono">{paper.year}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium
                               bg-emerald-50 dark:bg-emerald-900/20
                               text-emerald-700 dark:text-emerald-400
                               border border-emerald-200 dark:border-emerald-800/40">
                Published
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm leading-relaxed">
              {paper.title}
            </h4>
            <p className="text-primary-600 dark:text-primary-400 text-xs font-medium mt-1">
              {paper.journal}
            </p>
          </div>

          {/* Engineering relevance (featured only) */}
          {featured && paper.relevance && (
            <p className="text-slate-500 dark:text-slate-500 text-xs italic leading-relaxed
                           pl-3 border-l-2 border-primary-300 dark:border-primary-700/60">
              {paper.relevance}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {paper.tags.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>

          {/* CTA */}
          {paper.url && (
            <a href={paper.url} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 text-xs font-semibold
                          text-primary-600 dark:text-primary-400
                          hover:text-primary-700 dark:hover:text-primary-300
                          transition-colors self-start">
              View Paper
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── Patent card ─────────────────────────────────── */
function PatentCard() {
  return (
    <AnimatedSection>
      <div className="glass-card overflow-hidden
                      border-amber-200/50 dark:border-amber-800/25
                      hover:border-amber-400/60 dark:hover:border-amber-700/50
                      hover:shadow-lg dark:hover:shadow-amber-900/20
                      transition-all duration-300">
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

        <div className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                            bg-amber-50 dark:bg-amber-900/30
                            border border-amber-200 dark:border-amber-800/40">
              <Award size={18} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-mono text-amber-600 dark:text-amber-500 tracking-widest uppercase">
                India · 2025
              </span>
              <span className="ml-3 text-xs px-2.5 py-0.5 rounded-full font-semibold
                               bg-amber-50 dark:bg-amber-900/30
                               text-amber-700 dark:text-amber-400
                               border border-amber-200 dark:border-amber-800/40">
                Published Patent
              </span>
            </div>
          </div>

          <h4 className="text-slate-900 dark:text-white font-bold text-lg md:text-xl leading-snug mb-3">
            {PATENT.title}
          </h4>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            {PATENT.summary}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {PATENT.tags.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── Section heading helper ──────────────────────── */
function SubHeading({ icon: Icon, label, iconClass }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                        border ${iconClass}`}>
        <Icon size={14} />
      </span>
      <h3 className="text-slate-900 dark:text-white font-semibold">{label}</h3>
    </div>
  );
}

/* ── Main export ─────────────────────────────────── */
export default function Research() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="research" className="section-container">
      <SectionHeader
        label="05. Research"
        title="Applied Research & Technical Contributions"
        subtitle="Peer-reviewed research in AI, Computer Vision, Medical Imaging, and Intelligent Systems."
      />

      {/* Credibility strip */}
      <AnimatedSection>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PILLS.map(p => (
            <span key={p}
                  className="text-xs px-3 py-1.5 rounded-full font-medium
                             bg-slate-100 dark:bg-white/5
                             text-slate-600 dark:text-slate-400
                             border border-slate-200 dark:border-white/10">
              {p}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: '10+', label: 'Peer-Reviewed\nPublications' },
            { value: '2–4', label: 'Journal\nImpact Factor' },
            { value: '1',   label: 'Published\nPatent' },
          ].map(s => (
            <div key={s.value}
                 className="glass-card p-5 text-center
                            hover:shadow-lg hover:shadow-primary-500/10 dark:hover:shadow-primary-500/15
                            hover:border-primary-300/40 dark:hover:border-primary-700/40
                            transition-all duration-300">
              <p className="text-3xl font-extrabold gradient-text mb-1">{s.value}</p>
              <p className="text-slate-500 dark:text-slate-500 text-xs font-medium leading-snug whitespace-pre-line">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Engineering bridge note */}
      <AnimatedSection>
        <div className="mb-10 pl-4 py-3.5 border-l-4 border-primary-500">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            While my primary focus is software engineering and scalable systems, I actively contribute to applied research in{' '}
            <span className="text-slate-900 dark:text-white font-medium">AI, Computer Vision, and Medical Imaging</span>
            {' '}— translating research ideas into practical engineering systems and production-ready implementations.
          </p>
        </div>
      </AnimatedSection>

      {/* ── Selected Publications ──────────────────── */}
      <SubHeading
        icon={BookOpen}
        label="Selected Publications"
        iconClass="bg-primary-50 dark:bg-primary-900/30 border-primary-100 dark:border-primary-800/40 text-primary-600 dark:text-primary-400"
      />

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {FEATURED_PAPERS.map((paper, i) => (
          <PaperCard key={i} paper={paper} featured index={i} />
        ))}
      </div>

      {/* Expandable additional papers */}
      {showAll && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {ADDITIONAL_PAPERS.map((paper, i) => (
            <PaperCard key={i} paper={paper} index={i} />
          ))}
        </div>
      )}

      <button
        onClick={() => setShowAll(v => !v)}
        className="flex items-center gap-1.5 text-sm font-semibold mb-12
                   text-primary-600 dark:text-primary-400
                   hover:text-primary-700 dark:hover:text-primary-300
                   transition-colors group"
      >
        {showAll ? (
          <>Show Less <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" /></>
        ) : (
          <>View All {ADDITIONAL_PAPERS.length + FEATURED_PAPERS.length} Publications <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" /></>
        )}
      </button>

      {/* ── Patent ────────────────────────────────── */}
      <SubHeading
        icon={Award}
        label="Patent"
        iconClass="bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800/40 text-amber-600 dark:text-amber-400"
      />

      <PatentCard />
    </section>
  );
}
