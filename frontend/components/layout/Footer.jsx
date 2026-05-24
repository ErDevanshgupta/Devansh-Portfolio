'use client';
import Link from 'next/link';
import { Mail, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NAV_LINKS = [
  { label: 'About',          href: '/#about'          },
  { label: 'Skills',         href: '/#skills'         },
  { label: 'Projects',       href: '/#projects'       },
  { label: 'Experience',     href: '/#experience'     },
  { label: 'Certifications', href: '/#certifications' },
  { label: 'Research',       href: '/#research'       },
  { label: 'Blog',           href: '/blog'            },
  { label: 'Contact',        href: '/#contact'        },
];

const SOCIALS = [
  { href: 'https://github.com/ErDevanshgupta',             icon: GithubIcon,  label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/er-devansh-gupta/', icon: LinkedinIcon,label: 'LinkedIn' },
  { href: 'mailto:erdevanshgupta@gmail.com',               icon: Mail,        label: 'Email'    },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06]">

      {/* Gradient separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ── Three-column grid ───────────────── */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Col 1: Identity */}
          <div>
            <span className="text-xl font-bold gradient-text">Devansh Gupta</span>
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mt-2 mb-3">
              Software Engineer · Full-Stack · AI
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">
              Building scalable systems, intelligent applications, and production-ready software across full-stack, cloud, and AI.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-slate-500 dark:text-slate-500
                               hover:text-primary-600 dark:hover:text-primary-400
                               transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4">
              Connect
            </p>

            {/* Resume CTA */}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-sm font-semibold
                          px-4 py-2.5 rounded-xl mb-5
                          border border-primary-200 dark:border-primary-800/40
                          bg-primary-50/80 dark:bg-primary-900/20
                          text-primary-700 dark:text-primary-400
                          hover:bg-primary-100 dark:hover:bg-primary-900/40
                          hover:border-primary-400 dark:hover:border-primary-700/60
                          transition-all duration-200">
              <FileText size={13} />
              Download Resume
            </a>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href}
                   target={label !== 'Email' ? '_blank' : undefined}
                   rel="noopener noreferrer"
                   title={label}
                   className="w-9 h-9 rounded-xl flex items-center justify-center
                              bg-slate-100 dark:bg-white/5
                              border border-slate-200 dark:border-white/[0.08]
                              text-slate-500 dark:text-slate-500
                              hover:text-primary-600 dark:hover:text-primary-400
                              hover:border-primary-300 dark:hover:border-primary-700/50
                              hover:bg-primary-50 dark:hover:bg-primary-900/20
                              transition-all duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────── */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/[0.06]
                        flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 dark:text-slate-600 text-xs">
            © {new Date().getFullYear()} Devansh Gupta. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-xs">
            Designed &amp; Engineered by{' '}
            <span className="text-slate-500 dark:text-slate-500 font-medium">Devansh Gupta</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
