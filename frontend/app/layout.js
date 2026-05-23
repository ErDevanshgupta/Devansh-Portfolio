import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/ui/Analytics';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Devansh Gupta — Full-Stack & ML Engineer',
    template: '%s — Devansh Gupta',
  },
  description: 'Software engineer specializing in Computer Vision, ML research, and full-stack systems. 10 peer-reviewed publications. Based in India.',
  keywords: ['Devansh Gupta', 'Machine Learning', 'Computer Vision', 'Full Stack Developer', 'YOLOv11', 'Next.js', 'GI Cancer Detection'],
  authors: [{ name: 'Devansh Gupta', url: 'https://yourdomain.com' }],
  creator: 'Devansh Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Devansh Gupta',
    title: 'Devansh Gupta — Full-Stack & ML Engineer',
    description: 'Building intelligent systems for real-world problems. Computer Vision · AI · Cloud.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Devansh Gupta Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devansh Gupta — Full-Stack & ML Engineer',
    description: 'Building intelligent systems for real-world problems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
