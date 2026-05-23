'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { Briefcase } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Independent Researcher',
    company: 'National Chung Cheng University (Dr. Arvind Mukundan)',
    period: 'Aug 2025 – Present',
    type: 'Research',
    points: [
      'Designing ML/DL pipelines for spectral feature extraction and lesion differentiation for cancer detection.',
      'Improving model generalization across multiple GI cancer types through iterative experimentation.',
    ]
  },
  {
    role: 'Consulting Software Developer',
    company: 'REDAI Precision Tools, Chiayi, Taiwan',
    period: 'Jan 2025 – June 2025',
    type: 'Industry',
    points: [
      'Built a real-time vision inspector using Intel RealSense RGB-D & YOLOv11 achieving 96.9% segmentation and 93.2% detection accuracy.',
      'Improved production throughput by 10% by reducing manual inspection errors in Industry 4.0 assembly lines.',
    ]
  },
  {
    role: 'Research Intern',
    company: 'National Chung Cheng University, Taiwan',
    period: 'Dec 2024 – June 2025',
    type: 'Research',
    points: [
      'Developed SAVE (Spectrum-Aided Visual Enhancement) using hyperspectral imaging + ML for early GI cancer detection.',
      'Enhanced diagnostic precision through advanced image processing and feature extraction pipelines for non-invasive screening.',
    ]
  },
  {
    role: 'Consulting Research Intern',
    company: 'Chip Ready.org, Taiwan',
    period: 'Jan 2025 – June 2025',
    type: 'Research',
    points: [
      'Modelled the end-to-end semiconductor lifecycle (fab → test → packaging → logistics) to analyse supply-chain flows.',
      'Authored structured learning modules improving onboarding efficiency for semiconductor workflows.',
    ]
  },
  {
    role: 'Cloud and DevOps Intern',
    company: 'Wipro Full Stride Cloud, Gurugram, India',
    period: 'July 2024 – Sept 2024',
    type: 'Industry',
    points: [
      'Engineered a real-time chat application using AWS + Terraform enabling low-latency multi-user communication.',
      'Implemented Infrastructure as Code (IaC) and automated deployments for scalable, fault-tolerant systems.',
    ]
  },
  {
    role: 'Summer Trainee',
    company: 'Meritech Software Pvt. Ltd., Mohali',
    period: 'May 2023 – Aug 2023',
    type: 'Industry',
    points: [
      'Improved model robustness and accuracy by optimizing data preprocessing, training, and evaluation pipelines.',
    ]
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-container">
      <SectionHeader label="04. Experience" title="Where I've Worked" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-600/50 via-primary-800/30 to-transparent hidden md:block" />

        <div className="space-y-8">
          {EXPERIENCES.map((exp, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="md:pl-14 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-dark-900 border-2 border-primary-600
                                hidden md:flex items-center justify-center">
                  <Briefcase size={14} className="text-primary-400" />
                </div>

                <div className="glass-card p-6 hover:border-primary-700/40 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                      <p className="text-primary-400 text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-slate-500 text-xs font-mono">{exp.period}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${exp.type === 'Research'
                          ? 'bg-violet-900/40 text-violet-400 border border-violet-800/40'
                          : 'bg-primary-900/40 text-primary-400 border border-primary-800/40'}`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                        <span className="text-primary-500 mt-1 shrink-0">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
