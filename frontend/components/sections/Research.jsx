'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { BookOpen, ExternalLink, Award } from 'lucide-react';

const PAPERS = [
  {
    title: 'Deep Learning-Based Toolkit Inspection for Assembly Line Detection & Segmentation',
    journal: 'Computers, Materials & Continua',
    year: '2025',
    tags: ['Computer Vision', 'YOLOv11', 'Industry 4.0'],
    url: '#'
  },
  {
    title: 'Hyperspectral & Narrow-Band Imaging for Deep Learning-Based GI Disorder Detection',
    journal: 'Bioengineering',
    year: '2025',
    tags: ['Hyperspectral Imaging', 'GI Cancer', 'Deep Learning'],
    url: '#'
  },
  {
    title: 'ML-Based Risk Stratification for Colorectal Neoplasia Prediction',
    journal: 'World Journal of Clinical Oncology',
    year: '2025',
    tags: ['Machine Learning', 'Oncology', 'Risk Stratification'],
    url: '#'
  },
];

const PATENT = {
  title: 'Real-Time Adaptive Trust Routing for Underwater Software-Defined Networks',
  type: 'Indian Patent (Published, 2025)',
  desc: 'ML-based trust-aware routing mechanism for secure and energy-efficient underwater communication.'
};

export default function Research() {
  return (
    <section id="research" className="section-container">
      <SectionHeader
        label="05. Research"
        title="Publications & Patents"
        subtitle="10 peer-reviewed papers in ML, Computer Vision, and Medical Imaging (Impact Factor 2–4)."
      />

      {/* Stats bar */}
      <AnimatedSection>
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: '10', label: 'Publications' },
            { value: '2–4', label: 'Impact Factor' },
            { value: '1', label: 'Patent' }
          ].map(s => (
            <div key={s.label} className="glass-card p-5 text-center">
              <p className="text-3xl font-extrabold gradient-text mb-1">{s.value}</p>
              <p className="text-slate-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Selected papers */}
      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
        <BookOpen size={18} className="text-primary-400" /> Selected Publications
      </h3>
      <div className="space-y-4 mb-10">
        {PAPERS.map((paper, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="glass-card p-5 flex gap-4 hover:border-primary-700/40 transition-all duration-300">
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm leading-relaxed mb-2">"{paper.title}"</h4>
                <p className="text-primary-400 text-xs mb-3">{paper.journal} · {paper.year}</p>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </div>
              {paper.url && paper.url !== '#' && (
                <a href={paper.url} target="_blank" className="text-slate-500 hover:text-primary-400 shrink-0 mt-1 transition-colors">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Patent */}
      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
        <Award size={18} className="text-primary-400" /> Patent
      </h3>
      <AnimatedSection>
        <div className="glass-card p-5 border-l-4 border-primary-600">
          <p className="text-white font-medium mb-1">"{PATENT.title}"</p>
          <p className="text-primary-400 text-xs mb-2">{PATENT.type}</p>
          <p className="text-slate-400 text-sm">{PATENT.desc}</p>
        </div>
      </AnimatedSection>
    </section>
  );
}
