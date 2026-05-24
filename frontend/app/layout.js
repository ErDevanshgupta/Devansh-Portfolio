import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/ui/Analytics';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Devansh Gupta — Software Engineer & Full-Stack Developer',
    template: '%s — Devansh Gupta',
  },
  description: 'Software engineer specializing in scalable systems, computer vision, and full-stack development. TIET graduate with research experience in Taiwan.',
  keywords: ['Devansh Gupta', 'Software Engineer', 'Full-Stack Developer', 'Computer Vision', 'Machine Learning', 'Next.js', 'AWS', 'TypeScript'],
  authors: [{ name: 'Devansh Gupta', url: 'https://yourdomain.com' }],
  creator: 'Devansh Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Devansh Gupta',
    title: 'Devansh Gupta — Software Engineer & Full-Stack Developer',
    description: 'Building scalable systems and intelligent applications. Full-Stack · Computer Vision · AI · Cloud.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Devansh Gupta Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devansh Gupta — Software Engineer',
    description: 'Building scalable systems and intelligent applications.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

// Runs before React hydrates to avoid flash of wrong theme
const THEME_INIT = `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth dark ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
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
