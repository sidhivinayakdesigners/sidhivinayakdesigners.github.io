import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const publicDir = 'public';

const sitemap0 = path.join(distDir, 'sitemap-0.xml');
const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const distSitemap = path.join(distDir, 'sitemap.xml');
const publicSitemap = path.join(publicDir, 'sitemap.xml');
const publicSitemap0 = path.join(publicDir, 'sitemap-0.xml');
const publicSitemapIndex = path.join(publicDir, 'sitemap-index.xml');

// If sitemap-0.xml exists, copy it to dist/sitemap.xml so GSC directly gets the full URL list without extra index hops
if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, distSitemap);
  fs.copyFileSync(sitemap0, publicSitemap);
  fs.copyFileSync(sitemap0, publicSitemap0);
  console.log('Successfully generated direct sitemap.xml with all URLs in dist and public.');
} else if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, distSitemap);
  fs.copyFileSync(sitemapIndex, publicSitemap);
  console.log('Copied sitemap-index.xml to sitemap.xml.');
}

if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, publicSitemapIndex);
  console.log('Synced sitemap-index.xml to public directory.');
}
