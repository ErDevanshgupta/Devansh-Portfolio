'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/api';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (!pathname.startsWith('/admin')) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
