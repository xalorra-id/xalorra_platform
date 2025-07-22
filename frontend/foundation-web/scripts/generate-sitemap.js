const fs = require('fs');
const path = require('path');

const baseUrl = 'https://xalorra.com';

const staticPages = [
  '/',
  '/about',
  '/contact',
  '/blog',
  // Tambah halaman lain kalau perlu
];

function generateSitemap(pages) {
  const urls = pages
    .map((page) => {
      return `
  <url>
    <loc>${baseUrl}${page}</loc>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemap;
}

function writeSitemap() {
  const sitemap = generateSitemap(staticPages);
  const filePath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  
  fs.writeFileSync(filePath, sitemap.trim());
  console.log('✅ Sitemap generated at public/sitemap.xml');
}

writeSitemap();
