import { getProjects, getBlogPosts } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = 'https://yourdomain.com';

  let projectUrls = [], blogUrls = [];
  try {
    const projects = await getProjects();
    projectUrls = projects.map(p => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch {}

  try {
    const posts = await getBlogPosts();
    blogUrls = posts.map(p => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {}

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...projectUrls,
    ...blogUrls,
  ];
}
