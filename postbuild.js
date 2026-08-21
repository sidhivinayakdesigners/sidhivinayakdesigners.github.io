import fs from 'fs';
import path from 'path';

const src = path.join('dist', 'sitemap-index.xml');
const dest = path.join('dist', 'sitemap.xml');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied sitemap-index.xml to sitemap.xml');
} else {
  console.log('sitemap-index.xml not found');
}
