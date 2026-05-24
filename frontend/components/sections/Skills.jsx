'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';

const SKILL_GROUPS = [
  { category: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { category: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5'] },
  { category: 'Backend', skills: ['Node.js', 'Express', 'REST API', 'Mongoose'] },
  { category: 'AI / ML / Computer Vision', skills: ['YOLOv11', 'OpenCV', 'Scikit-learn', 'NumPy', 'Pandas', 'Hyperspectral Imaging', 'Intel RealSense'] },
  { category: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'] },
  { category: 'Databases', skills: ['MongoDB', 'MySQL'] },
  { category: 'Tools & Workflow', skills: ['Git', 'Postman', 'Roboflow', 'AI-assisted Dev'] },
  { category: 'Spoken Languages', skills: ['English (Fluent)', 'Japanese (N5 → N4)', 'Hindi (Native)'] },
];

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <SectionHeader label="02. Skills" title="What I Work With" />

      <div className="grid md:grid-cols-2 gap-6">
        {SKILL_GROUPS.map(({ category, skills }, i) => (
          <AnimatedSection key={category} delay={i * 0.07}>
            <div className="glass-card p-6 hover:border-primary-400/30 dark:hover:border-primary-700/30 transition-all duration-300">
              <h3 className="text-xs font-mono text-primary-600 dark:text-primary-400 tracking-widest uppercase mb-4">
                {category}
              </h3>
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
