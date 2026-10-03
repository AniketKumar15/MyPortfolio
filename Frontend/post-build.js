import fs from 'fs';
import path from 'path';

function runPostBuild() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexFile = path.join(distDir, 'index.html');
  const routesDataFile = path.resolve(process.cwd(), 'routes-data.json');

  if (!fs.existsSync(indexFile)) {
    console.error('index.html not found in dist. Make sure to run this after vite build.');
    return;
  }

  if (!fs.existsSync(routesDataFile)) {
    console.warn('routes-data.json not found, skipping post-build injection.');
    return;
  }

  const baseHtml = fs.readFileSync(indexFile, 'utf-8');
  const routesData = JSON.parse(fs.readFileSync(routesDataFile, 'utf-8'));

  routesData.forEach(routeObj => {
    const { route, title, description, image, type } = routeObj;
    
    // Create specific OG tags for this route
    const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="https://aniket-kumar.vercel.app${route}" />
    <meta property="og:type" content="${type}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    `;

    // Replace the default <title> tag with the new meta tags
    let modifiedHtml = baseHtml.replace(/<title>.*?<\/title>/s, metaTags);

    // Write to a flat .html file (e.g., dist/blog/my-post.html)
    const outPath = path.join(distDir, route.substring(1) + '.html');
    const routeDir = path.dirname(outPath);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(outPath, modifiedHtml);
    
    console.log(`Generated static HTML for: ${route}`);
  });

  console.log('Post-build OG tag injection completed successfully!');
}

runPostBuild();
