const fs = require('fs');
const path = require('path');

function getAllFiles(dir, all = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      getAllFiles(full, all);
    } else if (full.endsWith('.astro')) {
      all.push(full);
    }
  }
  return all;
}

const files = getAllFiles(path.join(__dirname, '..', 'src', 'pages'));
let totalMatches = 0;
let filesModified = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace "item": "https://siddhivinayakdesigners.in/..." without trailing slash and without # and without file extension
  content = content.replace(/("item":\s*"https:\/\/siddhivinayakdesigners\.in\/[^"\s#]+?)(?<!\/)(")/g, (m, p1, p2) => {
    if (p1.endsWith('.html') || p1.endsWith('.webp') || p1.endsWith('.jpg') || p1.endsWith('.png')) return m;
    totalMatches++;
    return p1 + '/' + p2;
  });

  // Replace "@id": "https://siddhivinayakdesigners.in/..." without trailing slash and without # and without file extension
  content = content.replace(/("@id":\s*"https:\/\/siddhivinayakdesigners\.in\/[^"\s#]+?)(?<!\/)(")/g, (m, p1, p2) => {
    if (p1.endsWith('.html') || p1.endsWith('.webp') || p1.endsWith('.jpg') || p1.endsWith('.png')) return m;
    totalMatches++;
    return p1 + '/' + p2;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
  }
}

console.log(`Modified files: ${filesModified}, Total schema URLs normalized: ${totalMatches}`);
