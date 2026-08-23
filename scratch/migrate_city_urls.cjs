const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');
const TARGET_DIR = path.join(PAGES_DIR, 'cities', 'interior-designers-navi-mumbai');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Map of old paths to new paths
const mappings = [
  {
    name: 'navi-mumbai',
    oldFile: path.join(PAGES_DIR, 'interior-designer-navi-mumbai.astro'),
    newFile: path.join(TARGET_DIR, 'index.astro'),
    oldUrl: '/interior-designer-navi-mumbai',
    newUrl: '/cities/interior-designers-navi-mumbai/',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-navi-mumbai',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/'
  },
  {
    name: 'airoli',
    oldFile: path.join(PAGES_DIR, 'interior-designer-airoli.astro'),
    newFile: path.join(TARGET_DIR, 'airoli.astro'),
    oldUrl: '/interior-designer-airoli',
    newUrl: '/cities/interior-designers-navi-mumbai/airoli',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-airoli',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/airoli'
  },
  {
    name: 'belapur',
    oldFile: path.join(PAGES_DIR, 'interior-designer-belapur.astro'),
    newFile: path.join(TARGET_DIR, 'belapur.astro'),
    oldUrl: '/interior-designer-belapur',
    newUrl: '/cities/interior-designers-navi-mumbai/belapur',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-belapur',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/belapur'
  },
  {
    name: 'ghansoli',
    oldFile: path.join(PAGES_DIR, 'interior-designer-ghansoli.astro'),
    newFile: path.join(TARGET_DIR, 'ghansoli.astro'),
    oldUrl: '/interior-designer-ghansoli',
    newUrl: '/cities/interior-designers-navi-mumbai/ghansoli',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-ghansoli',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/ghansoli'
  },
  {
    name: 'kharghar',
    oldFile: path.join(PAGES_DIR, 'interior-designer-kharghar.astro'),
    newFile: path.join(TARGET_DIR, 'kharghar.astro'),
    oldUrl: '/interior-designer-kharghar',
    newUrl: '/cities/interior-designers-navi-mumbai/kharghar',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-kharghar',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/kharghar'
  },
  {
    name: 'kopar-khairane',
    oldFile: path.join(PAGES_DIR, 'interior-designer-kopar-khairane.astro'),
    newFile: path.join(TARGET_DIR, 'kopar-khairane', 'index.astro'),
    oldUrl: '/interior-designer-kopar-khairane',
    newUrl: '/cities/interior-designers-navi-mumbai/kopar-khairane/',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-kopar-khairane',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/kopar-khairane/'
  },
  {
    name: 'koparkhairane',
    oldFile: path.join(PAGES_DIR, 'interior-designer-koparkhairane.astro'),
    newFile: path.join(TARGET_DIR, 'koparkhairane.astro'),
    oldUrl: '/interior-designer-koparkhairane',
    newUrl: '/cities/interior-designers-navi-mumbai/koparkhairane',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-koparkhairane',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/koparkhairane'
  },
  {
    name: 'koparkhairne',
    oldFile: path.join(PAGES_DIR, 'interior-designer-koparkhairne.astro'),
    newFile: path.join(TARGET_DIR, 'koparkhairne.astro'),
    oldUrl: '/interior-designer-koparkhairne',
    newUrl: '/cities/interior-designers-navi-mumbai/koparkhairne',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-koparkhairne',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/koparkhairne'
  },
  {
    name: 'nerul',
    oldFile: path.join(PAGES_DIR, 'interior-designer-nerul.astro'),
    newFile: path.join(TARGET_DIR, 'nerul.astro'),
    oldUrl: '/interior-designer-nerul',
    newUrl: '/cities/interior-designers-navi-mumbai/nerul',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-nerul',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/nerul'
  },
  {
    name: 'panvel',
    oldFile: path.join(PAGES_DIR, 'interior-designer-panvel.astro'),
    newFile: path.join(TARGET_DIR, 'panvel.astro'),
    oldUrl: '/interior-designer-panvel',
    newUrl: '/cities/interior-designers-navi-mumbai/panvel',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-panvel',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/panvel'
  },
  {
    name: 'rabale',
    oldFile: path.join(PAGES_DIR, 'interior-designer-rabale.astro'),
    newFile: path.join(TARGET_DIR, 'rabale.astro'),
    oldUrl: '/interior-designer-rabale',
    newUrl: '/cities/interior-designers-navi-mumbai/rabale',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-rabale',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/rabale'
  },
  {
    name: 'sanpada',
    oldFile: path.join(PAGES_DIR, 'interior-designer-sanpada.astro'),
    newFile: path.join(TARGET_DIR, 'sanpada.astro'),
    oldUrl: '/interior-designer-sanpada',
    newUrl: '/cities/interior-designers-navi-mumbai/sanpada',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-sanpada',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/sanpada'
  },
  {
    name: 'seawoods',
    oldFile: path.join(PAGES_DIR, 'interior-designer-seawoods.astro'),
    newFile: path.join(TARGET_DIR, 'seawoods.astro'),
    oldUrl: '/interior-designer-seawoods',
    newUrl: '/cities/interior-designers-navi-mumbai/seawoods',
    canonicalOld: 'https://siddhivinayakdesigners.in/interior-designer-seawoods',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/seawoods'
  },
  {
    name: 'vashi',
    oldFile: path.join(PAGES_DIR, 'vashi', 'index.astro'),
    newFile: path.join(TARGET_DIR, 'vashi.astro'),
    oldUrl: '/vashi/',
    newUrl: '/cities/interior-designers-navi-mumbai/vashi',
    canonicalOld: 'https://siddhivinayakdesigners.in/vashi/',
    canonicalNew: 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/vashi'
  }
];

// Helper to generate redirect content
function getRedirectContent(newUrl, canonicalUrl) {
  return `---
// Redirect page
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Redirecting...</title>
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta http-equiv="refresh" content="0;url=${newUrl}" />
  <script>
    window.location.href = "${newUrl}";
  </script>
</head>
<body>
  <p>Redirecting to <a href="${newUrl}">${newUrl}</a>...</p>
</body>
</html>
`;
}

console.log('--- Moving files and replacing paths ---');

mappings.forEach(m => {
  if (m.name === 'kopar-khairane') {
    console.log(`[INFO] Skipping file relocation for kopar-khairane as it is manually managed.`);
    return;
  }

  if (!fs.existsSync(m.oldFile)) {
    console.warn(`[WARN] Old file not found: ${m.oldFile}`);
    return;
  }

  let content = fs.readFileSync(m.oldFile, 'utf8');
  if (content.includes('// Redirect page')) {
    console.warn(`[WARN] Skipping ${m.oldFile} because it is already a redirect page.`);
    return;
  }

  // Replace old canonical and url strings with the new ones inside the file content
  // First do exact canonical domain strings
  content = content.replaceAll(m.canonicalOld, m.canonicalNew);
  if (m.name === 'vashi') {
    // Vashi has some specific links to `/interior-designer-vashi` that redirect to `/vashi/`
    content = content.replaceAll('https://siddhivinayakdesigners.in/interior-designer-vashi', 'https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/vashi');
  }

  // Then do local path strings
  content = content.replaceAll(m.oldUrl, m.newUrl);

  // Replace layout imports to adjust to 3-level-deep directory structure
  content = content.replaceAll("import Layout from '../layouts/Layout.astro';", "import Layout from '../../../layouts/Layout.astro';");
  content = content.replaceAll("import Layout from '../../layouts/Layout.astro';", "import Layout from '../../../layouts/Layout.astro';");
  content = content.replaceAll('import Layout from "../layouts/Layout.astro";', 'import Layout from "../../../layouts/Layout.astro";');
  content = content.replaceAll('import Layout from "../../layouts/Layout.astro";', 'import Layout from "../../../layouts/Layout.astro";');

  // Write new relocated file
  fs.writeFileSync(m.newFile, content, 'utf8');
  console.log(`[INFO] Relocated and updated: ${m.oldFile} -> ${m.newFile}`);
});

// Second pass: Update cross-links within the relocated files
// We need to replace all other city old URLs with their new URLs inside all files in the target directory
console.log('--- Updating cross-links in the relocated files ---');
const relocatedFiles = fs.readdirSync(TARGET_DIR);

relocatedFiles.forEach(fileName => {
  const filePath = path.join(TARGET_DIR, fileName);
  if (fs.statSync(filePath).isDirectory()) {
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  mappings.forEach(m => {
    // Replace old paths with new paths
    // e.g. "/interior-designer-nerul" -> "/cities/interior-designers-navi-mumbai/nerul"
    content = content.replaceAll(m.oldUrl, m.newUrl);
    content = content.replaceAll(m.canonicalOld, m.canonicalNew);
    
    // Some pages also have links to "/vashi" without trailing slash or "/vashi/"
    if (m.name === 'vashi') {
      content = content.replaceAll('/vashi/', '/cities/interior-designers-navi-mumbai/vashi');
      content = content.replaceAll('"/vashi"', '"/cities/interior-designers-navi-mumbai/vashi"');
    }
  });

  // Also replace old parent navi-mumbai breadcrumb level references
  // Breadcrumb item 2 should point to `/cities/interior-designers-navi-mumbai/`
  content = content.replaceAll('"item": "https://siddhivinayakdesigners.in/interior-designer-navi-mumbai"', '"item": "https://siddhivinayakdesigners.in/cities/interior-designers-navi-mumbai/"');
  content = content.replaceAll('href="/interior-designer-navi-mumbai"', 'href="/cities/interior-designers-navi-mumbai/"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[INFO] Updated cross-links inside: ${filePath}`);
});

// Third pass: Create redirects at the old locations
console.log('--- Creating backward-compatible redirect pages ---');
mappings.forEach(m => {
  if (m.name === 'kopar-khairane') {
    console.log(`[INFO] Skipping redirect creation for kopar-khairane as it is manually managed.`);
    return;
  }

  let redirectDest = m.oldFile;
  
  // Special case: for Vashi, the old file was at `src/pages/vashi/index.astro`.
  // We want to delete `src/pages/vashi/index.astro` and place the redirect at `src/pages/vashi.astro`
  // so `/vashi` redirects cleanly.
  if (m.name === 'vashi') {
    // Write index.astro redirect inside vashi/ folder
    fs.writeFileSync(m.oldFile, getRedirectContent(m.newUrl, m.canonicalNew), 'utf8');
    console.log(`[INFO] Created Vashi index redirect at: ${m.oldFile}`);

    // Also redirect interior-designer-vashi.astro
    const vashiDesignerAstro = path.join(PAGES_DIR, 'interior-designer-vashi.astro');
    fs.writeFileSync(vashiDesignerAstro, getRedirectContent(m.newUrl, m.canonicalNew), 'utf8');
    console.log(`[INFO] Updated interior-designer-vashi.astro redirect at: ${vashiDesignerAstro}`);
    return;
  }

  // Create redirect at the old file path
  fs.writeFileSync(redirectDest, getRedirectContent(m.newUrl, m.canonicalNew), 'utf8');
  console.log(`[INFO] Created redirect at: ${redirectDest}`);
});

// Fourth pass: Update references in src/layouts/Layout.astro and other files
console.log('--- Updating references in src/layouts/Layout.astro and calculator pages ---');
const FILES_TO_SCAN = [
  path.join(__dirname, '..', 'src', 'layouts', 'Layout.astro'),
  path.join(PAGES_DIR, 'index.astro'),
  path.join(PAGES_DIR, 'wardrobe-calculator.astro'),
  path.join(PAGES_DIR, 'kitchen-calculator.astro'),
  path.join(PAGES_DIR, 'calculator.astro'),
  path.join(PAGES_DIR, 'space-saving.astro'),
  path.join(PAGES_DIR, 'modular-kitchens.astro'),
  path.join(PAGES_DIR, 'living-room.astro'),
  path.join(PAGES_DIR, 'bedroom-wardrobes.astro'),
  path.join(PAGES_DIR, 'kids-bedroom.astro'),
  path.join(PAGES_DIR, 'gallery.astro')
];

FILES_TO_SCAN.forEach(file => {
  if (!fs.existsSync(file)) {
    console.warn(`[WARN] Scan file not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  mappings.forEach(m => {
    if (content.includes(m.canonicalOld) || content.includes(m.oldUrl) || (m.name === 'vashi' && (content.includes('/vashi/') || content.includes('"/vashi"')))) {
      content = content.replaceAll(m.canonicalOld, m.canonicalNew);
      content = content.replaceAll(m.oldUrl, m.newUrl);
      if (m.name === 'vashi') {
        content = content.replaceAll('/vashi/', '/cities/interior-designers-navi-mumbai/vashi');
        content = content.replaceAll('"/vashi"', '"/cities/interior-designers-navi-mumbai/vashi"');
      }
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`[INFO] Updated layout references in: ${file}`);
  }
});

console.log('--- Migration Complete! ---');
