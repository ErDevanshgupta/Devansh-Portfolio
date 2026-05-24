import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import Research from '@/components/sections/Research';
import EngineeringPhilosophy from '@/components/sections/EngineeringPhilosophy';
import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Devansh Gupta — Software Engineer & Full Stack Developer',
  description: 'Engineering scalable software, intelligent systems, and real-world products — from architecture to deployment.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Research />
      <EngineeringPhilosophy />
      <Contact />
    </>
  );
}
