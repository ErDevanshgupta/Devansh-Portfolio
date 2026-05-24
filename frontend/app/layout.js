import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/ui/Analytics';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://erdevanshgupta.com'),
  title: {
    default: 'Devansh Gupta — Software Engineer & Full-Stack Developer',
    template: '%s | Devansh Gupta',
  },
  description: 'Devansh Gupta is a Software Engineer specializing in scalable production systems, AI-assisted engineering, and full-stack development. Discover my portfolio, projects, and technical blogs.',
  keywords: ['Devansh Gupta', 'Software Engineer', 'Full Stack Developer', 'AI Engineer', 'Computer Vision', 'Next.js', 'AWS', 'MERN developer', 'Cloud Engineer India', 'software engineer portfolio'],
  authors: [{ name: 'Devansh Gupta', url: 'https://erdevanshgupta.com' }],
  creator: 'Devansh Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://erdevanshgupta.com',
    siteName: 'Devansh Gupta Portfolio',
    title: 'Devansh Gupta — Software Engineer & Full-Stack Developer',
    description: 'Devansh Gupta is a Software Engineer specializing in scalable production systems, AI-assisted engineering, and full-stack development.',
    images: [{ url: '/profile-pic.png', width: 1200, height: 630, alt: 'Devansh Gupta - Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devansh Gupta — Software Engineer',
    description: 'Building scalable production systems and intelligent AI applications.',
    images: ['/profile-pic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://erdevanshgupta.com',
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Devansh Gupta",
  "url": "https://erdevanshgupta.com",
  "jobTitle": "Software Engineer",
  "alumniOf": "Thapar Institute of Engineering and Technology",
  "knowsAbout": ["Software Engineering", "Full Stack Development", "Artificial Intelligence", "Computer Vision", "Next.js", "React", "AWS", "Cloud Infrastructure", "TypeScript", "Node.js"],
  "sameAs": [
    "https://github.com/ErDevanshgupta",
    "https://linkedin.com/in/ErDevanshgupta"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Language",
      "name": "JLPT N5 Japanese",
      "recognizedBy": { "@type": "Organization", "name": "Japan Foundation" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certificate",
      "name": "IBM Data Science & Machine Learning with AI",
      "recognizedBy": { "@type": "Organization", "name": "IBM" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certificate",
      "name": "Full Stack Development with AI (MERN)",
      "recognizedBy": { "@type": "Organization", "name": "IBM" }
    }
  ]
};

// Runs before React hydrates to avoid flash of wrong theme
const THEME_INIT = `try{var t=localStorage.getItem('theme')||'dark';var r=document.documentElement;r.classList.remove('dark','midnight');if(t==='dark'){r.classList.add('dark');}else if(t==='midnight'){r.classList.add('dark','midnight');}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth dark ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
      </head>
      <body>
        <ThemeProvider>
          <Analytics />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
