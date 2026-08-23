const fs = require('fs');
const path = require('path');

const galleryFilePath = 'c:/Users/Lenovo/Downloads/website/src/pages/gallery.astro';

// Define the 6 projects and their photos
const projects = [
  {
    name: 'Kharghar 3BHK Home',
    folder: 'kharghar-3bhk',
    photos: [
      { num: 1, class: 'kitchen', label: 'View Kitchen', alt: 'Kharghar 3BHK - L-shaped Modular Kitchen' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Kharghar 3BHK - Entrance Lobby' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Kharghar 3BHK - Wall Paneling' },
      { num: 4, class: 'bedroom', label: 'View Bedroom', alt: 'Kharghar 3BHK - Sliding Wardrobe' },
      { num: 5, class: 'bedroom', label: 'View Bedroom', alt: 'Kharghar 3BHK - Bedrooms Layout' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Kharghar 3BHK - White Wall Cabinet' }
    ]
  },
  {
    name: 'Seawoods 2BHK Home',
    folder: 'seawoods-2bhk',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Seawoods 2BHK - Entrance Foyer layout' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Seawoods 2BHK - Living Room Space Overview' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Seawoods 2BHK - Dining Space detailing' },
      { num: 4, class: 'living', label: 'View Living', alt: 'Seawoods 2BHK - Living Area Side profile console' },
      { num: 5, class: 'living', label: 'View Living', alt: 'Seawoods 2BHK - Dining Table view' },
      { num: 6, class: 'kitchen', label: 'View Kitchen', alt: 'Seawoods 2BHK - Modular Parallel Kitchen' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Seawoods 2BHK - Master Suite' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Seawoods 2BHK - Master suite sliding wardrobe' },
      { num: 9, class: 'bedroom', label: 'View Bedroom', alt: 'Seawoods 2BHK - Kid Room swing wardrobe' },
      { num: 10, class: 'bedroom', label: 'View Bedroom', alt: 'Seawoods 2BHK - Kids Bedroom layout' }
    ]
  },
  {
    name: 'Sanpada 4BHK Home',
    folder: 'sanpada-4bhk',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Sanpada 4BHK - Living Room Space Overview' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Sanpada 4BHK - Dining Area Detail View' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Sanpada 4BHK - Dining Room Table Layout' },
      { num: 4, class: 'kitchen', label: 'View Kitchen', alt: 'Sanpada 4BHK - Modular Kitchen Parallel Design' },
      { num: 5, class: 'bedroom', label: 'View Bedroom', alt: 'Sanpada 4BHK - Beige Sliding Wardrobe' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Sanpada 4BHK - Tranquil Master Suite' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Sanpada 4BHK - Master Bedroom Side profile' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Sanpada 4BHK - Master suite brown bed & wall detailing' },
      { num: 9, class: 'bedroom', label: 'View Bedroom', alt: 'Sanpada 4BHK - Study console & custom cabinetry' }
    ]
  },
  {
    name: 'Ghansoli 4BHK Home',
    folder: 'ghansoli-4bhk',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Ghansoli 4BHK - Foyer Space Overview' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Ghansoli 4BHK - Living Room Angle 1' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Ghansoli 4BHK - Dining Room space' },
      { num: 4, class: 'bedroom', label: 'View Bedroom', alt: 'Ghansoli 4BHK - Master Bedroom overview' },
      { num: 5, class: 'bedroom', label: 'View Bedroom', alt: 'Ghansoli 4BHK - Master suite study desk' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Ghansoli 4BHK - Kids Bedroom wardrobe unit' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Ghansoli 4BHK - Kids Bedroom play desk' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Ghansoli 4BHK - Guest Bedroom custom layout' },
      { num: 9, class: 'living', label: 'View Living', alt: 'Ghansoli 4BHK - Living Room detailed console' },
      { num: 10, class: 'living', label: 'View Living', alt: 'Ghansoli 4BHK - Foyer details close-up' }
    ]
  },
  {
    name: 'Belapur 2BHK Home',
    folder: 'belapur-2bhk-parallel',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Belapur 2BHK - Living Room Space Overview' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Belapur 2BHK - Living Room TV Unit Details' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Belapur 2BHK - Dining Space Layout' },
      { num: 4, class: 'kitchen', label: 'View Kitchen', alt: 'Belapur 2BHK - Modern Parallel Kitchen Setup' },
      { num: 5, class: 'kitchen', label: 'View Kitchen', alt: 'Belapur 2BHK - Kitchen Cabinet Overhead details' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Belapur 2BHK - Elegant Master Bedroom' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Belapur 2BHK - Master Bedroom Wardrobes' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Belapur 2BHK - Kid Room bed styling' },
      { num: 9, class: 'bedroom', label: 'View Bedroom', alt: 'Belapur 2BHK - Kid Room detailed study unit' },
      { num: 10, class: 'bedroom', label: 'View Bedroom', alt: 'Belapur 2BHK - Kids Bedroom storage cabinetry' }
    ]
  },
  {
    name: 'Nerul 3BHK Home',
    folder: 'nerul-3bhk-u-shaped',
    photos: [
      { num: 1, class: 'kitchen', label: 'View Kitchen', alt: 'Nerul 3BHK - Kitchen U-shaped layout' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Nerul 3BHK - Living Room wall paneling overview' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Nerul 3BHK - Living Room detailed view' },
      { num: 4, class: 'living', label: 'View Living', alt: 'Nerul 3BHK - Living Room side profile console' },
      { num: 5, class: 'living', label: 'View Living', alt: 'Nerul 3BHK - Living Room space layout' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Nerul 3BHK - Cozy Master Bedroom' }
    ]
  }
];

// Generate HTML
let html = '\n        <!-- ==================== DELIVERED DESIGN HOMES PHOTOS ==================== -->';
projects.forEach(project => {
  html += `\n        <!-- ${project.name} -->`;
  project.photos.forEach(photo => {
    const srcPath = `/assets/images/delivered-projects/${project.folder}/${photo.num}.webp`;
    html += `
        <div class="gallery-item ${photo.class}">
          <div class="premium-card">
            <div class="premium-card-img">
              <img alt="${photo.alt}" class="img-fluid w-100" loading="lazy" src="${srcPath}" />
              <div class="premium-card-overlay">
                <a class="btn btn-gold btn-sm lightbox-trigger"
                  data-caption="${photo.alt}"
                  data-src="${srcPath}" href="javascript:void(0)">
                  ${photo.label}
                </a>
              </div>
            </div>
          </div>
        </div>`;
  });
});
html += '\n';

// Read existing gallery file
let content = fs.readFileSync(galleryFilePath, 'utf8');

// Normalize newlines to LF for safe splitting
const normalizedContent = content.replace(/\r\n/g, '\n');

// Target placeholder using LF
const target = `        <div class="gallery-item living">
          <div class="premium-card">
            <div class="premium-card-img">
              <img alt="Siddhivinayak Designers Vashi Project"`;

if (!normalizedContent.includes(target)) {
  console.error("Target placeholder not found in gallery.astro!");
  process.exit(1);
}

const parts = normalizedContent.split(target);
const updatedContent = parts[0] + html + target + parts[1];

// Write back with local CRLF to maintain repository structure
const finalContent = updatedContent.replace(/\n/g, '\r\n');

fs.writeFileSync(galleryFilePath, finalContent, 'utf8');
console.log("Successfully injected all 51 delivered design home photos into gallery.astro!");
