import fs from 'fs';
import path from 'path';

// Define static routes
const staticRoutes = [
  '/',
  '/about',
  '/projects',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer'
];

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'https://aniket-kumar.vercel.app';
const API_URL = process.env.VITE_URL || 'http://localhost:5000';

async function generateSitemap() {
  console.log(`Generating sitemap... Fetching data from ${API_URL}`);
  
  let dynamicRoutes = [];
  
  try {
    // Try to fetch dynamic blogs
    const blogsRes = await fetch(`${API_URL}/api/blogs`);
    if (blogsRes.ok) {
      const blogs = await blogsRes.json();
      const blogRoutes = blogs.map(blog => `/blog/${blog.slug}`);
      dynamicRoutes.push(...blogRoutes);
    }

    // Try to fetch dynamic projects
    const projectsRes = await fetch(`${API_URL}/api/projects`);
    if (projectsRes.ok) {
      const projects = await projectsRes.json();
      const projectRoutes = projects.map(project => `/projects/${project.slug}`);
      dynamicRoutes.push(...projectRoutes);
    }
  } catch (error) {
    console.error("Could not fetch dynamic routes for sitemap (API might be offline):", error.message);
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
  <url>
    <loc>${FRONTEND_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML.trim());
  console.log(`Sitemap successfully generated at public/sitemap.xml with ${allRoutes.length} URLs.`);
}

generateSitemap();
