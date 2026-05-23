'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';

const SKILL_GROUPS = [
  { category: 'Languages', skills: ['Java', 'Python', 'SQL', 'JavaScript'] },
  { category: 'Frontend', skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Backend', skills: ['Node.js', 'Express', 'REST API'] },
  { category: 'ML / AI / CV', skills: ['YOLOv11', 'OpenCV', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Hyperspectral Imaging'] },
  { category: 'Cloud & DevOps', skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'] },
  { category: 'Databases', skills: ['MongoDB', 'MySQL'] },
  { category: 'Tools', skills: ['Git', 'Postman', 'Roboflow', 'Intel RealSense'] },
  { category: 'Spoken Languages', skills: ['English (Fluent)', 'Japanese (N5)'] },
];

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <SectionHeader label="02. Skills" title="What I Work With" />

      <div className="grid md:grid-cols-2 gap-6">
        {SKILL_GROUPS.map(({ category, skills }, i) => (
          <AnimatedSection key={category} delay={i * 0.07}>
            <div className="glass-card p-6 hover:border-primary-700/30 transition-all duration-300">
              <h3 className="text-xs font-mono text-primary-400 tracking-widest uppercase mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="tech-badge">{skill}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
