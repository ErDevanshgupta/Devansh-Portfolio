'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { BookOpen, Globe, Cpu, FlaskConical } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Cpu, label: 'Computer Vision', desc: 'YOLOv11, OpenCV, Intel RealSense. 96.9% accuracy in production.' },
  { icon: FlaskConical, label: 'ML Research', desc: '10 peer-reviewed papers in GI cancer detection & imaging.' },
  { icon: Globe, label: 'Full-Stack & Cloud', desc: 'Next.js, Node.js, AWS, Terraform. Real-time systems at scale.' },
  { icon: BookOpen, label: 'Japanese N5', desc: 'Conversational interest in Japanese culture and language.' },
];

export default function About() {
  return (
    <section id="about" className="section-container">
      <SectionHeader label="01. About" title="Who I Am" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Text */}
        <AnimatedSection>
          <div className="space-y-5 text-slate-400 text-base leading-relaxed">
            <p>
              I'm a Computer Engineering graduate from Thapar Institute of Engineering and Technology,
              currently working at the intersection of{' '}
              <span className="text-primary-400 font-medium">machine learning, computer vision, and full-stack engineering</span>.
            </p>
            <p>
              My work spans production ML systems (built a real-time inspector achieving{' '}
              <span className="text-white font-semibold">96.9% segmentation accuracy</span> for an Industry 4.0 assembly line),
              academic research (10 peer-reviewed papers on GI cancer detection with hyperspectral imaging),
              and cloud infrastructure (real-time AWS chat systems with Terraform IaC at Wipro).
            </p>
            <p>
              I'm currently deepening my full-stack skills while continuing cancer detection research guided by
              Dr. Arvind Mukundan at National Chung Cheng University. I'm open to roles where I can build
              systems that matter — at the intersection of AI and real-world engineering.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-sm font-mono text-primary-400 border border-primary-800/50 bg-primary-900/20 px-3 py-1.5 rounded-full">
                📍 Kurukshetra, India · Open to Remote
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
            <AnimatedSection key={label} delay={i * 0.1}>
              <div className="glass-card p-5 hover:border-primary-700/40 transition-all hover:-translate-y-1 duration-300">
                <Icon size={22} className="text-primary-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
