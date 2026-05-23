export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
