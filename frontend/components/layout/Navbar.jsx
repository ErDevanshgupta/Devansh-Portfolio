'use client';
import { useState, useEffect } from 'react';
import { scrollTo } from '@/lib/utils';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ui/ThemeProvider';

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
  const { theme, toggle } = useTheme();

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
      ${scrolled
        ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/5 shadow-sm dark:shadow-xl'
        : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Code2 size={22} className="text-primary-600 dark:text-primary-400" />
          <span className="font-bold text-slate-900 dark:text-white text-lg">
            Devansh<span className="text-primary-600 dark:text-primary-400">.</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => handleNav(link)}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="ml-1 p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            {theme === 'dark'
              ? <Sun size={17} />
              : <Moon size={17} />}
          </button>

          <a
            href="/resume.pdf" download
            className="ml-3 px-4 py-2 text-sm font-semibold bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all"
          >
            Resume
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="p-2 text-slate-600 dark:text-slate-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-t border-slate-200 dark:border-white/5 px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(link => (
            <button key={link.label} onClick={() => handleNav(link)}
              className="text-left py-3 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-b border-slate-100 dark:border-white/5">
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
