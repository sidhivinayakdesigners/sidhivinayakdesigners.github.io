const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const workspaceRoot = 'c:/Users/Lenovo/Downloads/website';
const assetsDir = path.join(workspaceRoot, 'public');

// Recursive helper to list files
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  }
  return fileList;
}

// Compute file MD5 hash
function getFileHash(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buffer).digest('hex');
}

// Check if a path points to a JPG or JPEG
const isJpg = (file) => {
  const ext = path.extname(file).toLowerCase();
  return ext === '.jpg' || ext === '.jpeg';
};

async function main() {
  console.log('Scanning assets directory for JPG/JPEG files...');
  const allFiles = getFiles(assetsDir);
  const jpgFiles = allFiles.filter(isJpg);
  console.log(`Found ${jpgFiles.length} JPG/JPEG files.`);

  // Group by hash
  console.log('Calculating hashes to detect duplicates...');
  const hashGroups = {};
  for (const file of jpgFiles) {
    try {
      const hash = getFileHash(file);
      if (!hashGroups[hash]) {
        hashGroups[hash] = [];
      }
      hashGroups[hash].push(file);
    } catch (e) {
      console.error(`Error hashing file ${file}:`, e.message);
    }
  }

  const uniqueHashes = Object.keys(hashGroups);
  console.log(`Detected ${uniqueHashes.length} unique images. Duplicate images to be deleted: ${jpgFiles.length - uniqueHashes.length}`);

  const mappings = {}; // old URL path -> new URL path

  // Process unique images and their duplicates
  let convertedCount = 0;
  let duplicateDeletedCount = 0;
  const batchSize = 15;

  console.log('Processing images sequentially in batches...');
  for (let i = 0; i < uniqueHashes.length; i += batchSize) {
    const batch = uniqueHashes.slice(i, i + batchSize);
    await Promise.all(batch.map(async (hash) => {
      const files = hashGroups[hash];
      const originalFile = files[0];
      const duplicates = files.slice(1);

      // Convert original to webp
      const ext = path.extname(originalFile);
      const webpFile = originalFile.substring(0, originalFile.length - ext.length) + '.webp';

      try {
        // Perform conversion
        await sharp(originalFile)
          .webp({ quality: 80 })
          .toFile(webpFile);

        convertedCount++;

        // Delete original JPG file
        if (fs.existsSync(originalFile)) {
          fs.unlinkSync(originalFile);
        }

        // Map original URL
        const originalRel = path.relative(assetsDir, originalFile).replace(/\\/g, '/');
        const webpRel = path.relative(assetsDir, webpFile).replace(/\\/g, '/');
        mappings['/' + originalRel] = '/' + webpRel;
        mappings[originalRel] = webpRel;

        // Process duplicates
        for (const dupFile of duplicates) {
          if (fs.existsSync(dupFile)) {
            fs.unlinkSync(dupFile);
            duplicateDeletedCount++;
          }
          const dupRel = path.relative(assetsDir, dupFile).replace(/\\/g, '/');
          mappings['/' + dupRel] = '/' + webpRel;
          mappings[dupRel] = webpRel;
        }

      } catch (err) {
        console.error(`Failed to process image ${originalFile}:`, err.message);
      }
    }));
    console.log(`Processed batch ${Math.min(i + batchSize, uniqueHashes.length)} / ${uniqueHashes.length}`);
  }

  console.log(`Image conversion finished. Converted: ${convertedCount}, Duplicates Deleted: ${duplicateDeletedCount}.`);

  // Write mappings for logging/inspection
  const mappingsPath = path.join(workspaceRoot, 'scratch', 'image_mappings.json');
  fs.writeFileSync(mappingsPath, JSON.stringify(mappings, null, 2), 'utf8');
  console.log(`Wrote path mapping file to ${mappingsPath}`);

  // Perform search-and-replace in codebase
  console.log('Performing global search-and-replace in codebase...');
  const searchDirs = [
    path.join(workspaceRoot, 'src'),
    path.join(workspaceRoot, 'public')
  ];

  const codeExtensions = ['.astro', '.html', '.js', '.ts', '.css', '.json', '.md'];
  let replacementCount = 0;
  let filesModifiedCount = 0;

  // Build sorted list of keys descending by length to prevent partial replacements (e.g. matching shorter subpath before longer one)
  const mappingKeys = Object.keys(mappings).sort((a, b) => b.length - a.length);

  for (const dir of searchDirs) {
    const files = getFiles(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      // Skip the newly generated webp images, binary files, etc.
      if (!codeExtensions.includes(ext)) continue;

      let fileContent = fs.readFileSync(file, 'utf8');
      let modified = false;

      for (const key of mappingKeys) {
        if (fileContent.includes(key)) {
          // Replace all occurrences of key with mappings[key]
          const regex = new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
          fileContent = fileContent.replace(regex, mappings[key]);
          modified = true;
          replacementCount++;
        }
      }

      if (modified) {
        fs.writeFileSync(file, fileContent, 'utf8');
        filesModifiedCount++;
      }
    }
  }

  console.log(`Codebase search-and-replace finished. Modified ${filesModifiedCount} files, performed ${replacementCount} replacements.`);
}

main().catch(err => {
  console.error('Fatal error in batch optimizer:', err);
});
