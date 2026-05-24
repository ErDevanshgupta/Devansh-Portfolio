export default async function sitemap() {
  const baseUrl = 'https://erdevanshgupta.com';

  // Fetch dynamic routes (Projects, Blog Posts)
  // In a real production build, you would fetch these from your database/API
  // For now, we fetch from our local API or use fallback hardcoded slugs if API isn't available during build
  let blogSlugs = [];
  let projectSlugs = [];

  try {
    const [blogsRes, projectsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`).then(r => r.json())
    ]);
    
    if (blogsRes?.data) blogSlugs = blogsRes.data.map(p => p.slug);
    if (projectsRes?.data) projectSlugs = projectsRes.data.map(p => p.slug);
  } catch (err) {
    console.warn('Could not fetch dynamic routes for sitemap generation. Falling back to empty array.');
  }

  const blogs = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projects = projectSlugs.map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const routes = ['', '/#about', '/#skills', '/#projects', '/#experience', '/#certifications', '/#research', '/#contact', '/blog'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...projects, ...blogs];
}
