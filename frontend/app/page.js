import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Research from '@/components/sections/Research';
import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Devansh Gupta — Full-Stack & ML Engineer',
  description: 'Building intelligent systems for real-world problems. Computer Vision · AI · Full-Stack · Cloud.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Research />
      <Contact />
    </>
  );
}
