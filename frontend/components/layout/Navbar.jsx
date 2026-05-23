'use client';
import { useState, useEffect } from 'react';
import { scrollTo } from '@/lib/utils';
import { Menu, X, Code2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Research', id: 'research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (link) => {
    setMenuOpen(false);
    if (link.href) window.location.href = link.href;
    else scrollTo(link.id);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-dark-900/90 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Code2 size={22} className="text-primary-400" />
          <span className="font-bold text-white text-lg">Devansh<span className="text-primary-400">.</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => handleNav(link)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/resume.pdf" download
            className="ml-4 px-4 py-2 text-sm font-semibold bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(link => (
            <button key={link.label} onClick={() => handleNav(link)}
              className="text-left py-3 text-slate-300 hover:text-primary-400 transition-colors border-b border-white/5">
              {link.label}
            </button>
          ))}
          <a href="/resume.pdf" download
            className="mt-2 py-3 text-center bg-primary-600 text-white rounded-lg font-semibold">
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
