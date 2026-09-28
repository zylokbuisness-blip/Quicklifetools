import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeConfig } from './src/routes';

// Determine directory context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base domain: can be injected via APP_URL environment variable or default to production domain
const BASE_URL = (process.env.APP_URL || 'https://quicklifetools.com').replace(/\/+$/, '');
const TODAY = new Date().toISOString().split('T')[0];

function generateSitemapXml(): string {
  const routes = Object.values(routeConfig);

  const xmlEntries = routes
    .map((route) => {
      const cleanPath = route.path === '/' ? '' : route.path;
      const url = `${BASE_URL}${cleanPath}`;
      const changefreq = route.changefreq || 'weekly';
      const priority = (route.priority ?? 0.8).toFixed(1);

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;
}

function run() {
  console.log(`[QuickLifeTools] Generating sitemap.xml for base URL: ${BASE_URL}...`);
  const sitemapContent = generateSitemapXml();

  // Target paths:
  // 1. /public/sitemap.xml (Served by Vite static assets)
  // 2. /sitemap.xml (Project root for root-level referencing)
  const publicDir = path.resolve(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicSitemapPath = path.resolve(publicDir, 'sitemap.xml');
  const rootSitemapPath = path.resolve(__dirname, 'sitemap.xml');

  fs.writeFileSync(publicSitemapPath, sitemapContent, 'utf-8');
  fs.writeFileSync(rootSitemapPath, sitemapContent, 'utf-8');

  console.log(`✓ Generated sitemap with ${Object.keys(routeConfig).length} routes:`);
  Object.values(routeConfig).forEach((r) => {
    console.log(`  - ${r.path} (${r.title.slice(0, 45)}...)`);
  });
  console.log(`✓ Saved to: ${publicSitemapPath}`);
  console.log(`✓ Saved to: ${rootSitemapPath}`);
}

run();
