'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';

import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/api';

export default function Skills() {
  const [skillGroups, setSkillGroups] = useState([]);

  useEffect(() => {
    getSkills().then(setSkillGroups).catch(console.error);
  }, []);

  return (
    <section id="skills" className="section-container">
      <SectionHeader label="02. Skills" title="What I Work With" />

      <div className="grid md:grid-cols-2 gap-6">
        {skillGroups.map(({ category, skills }, i) => (
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
