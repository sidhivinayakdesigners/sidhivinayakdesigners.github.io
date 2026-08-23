const fs = require('fs');
const path = require('path');

const galleryFilePath = 'c:/Users/Lenovo/Downloads/website/src/pages/gallery.astro';

// Define the 6 projects and their photos
const projects = [
  {
    name: 'Kharghar 4BHK Penthouse',
    folder: 'modern-4bhk-penthouse',
    total: 14,
    prefix: '',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - Living Room Entryway' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - Premium Living Area Lounge' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - High-End Accent TV Unit Wall' },
      { num: 4, class: 'bedroom', label: 'View Bedroom', alt: 'Modern 4 BHK Penthouse Kharghar - Master Bedroom Suite Setup' },
      { num: 5, class: 'ceiling', label: 'View Ceiling', alt: 'Modern 4 BHK Penthouse Kharghar - False Ceiling & Profile Lighting Detail' },
      { num: 6, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - Luxury Dining Area Set with Wooden Details' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Modern 4 BHK Penthouse Kharghar - Custom Walk-in Wardrobe Space' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Modern 4 BHK Penthouse Kharghar - Secondary Guest Bedroom Layout' },
      { num: 9, class: 'kitchen', label: 'View Kitchen', alt: 'Modern 4 BHK Penthouse Kharghar - Modular Kitchen L-Shape Cabinetry' },
      { num: 10, class: 'kitchen', label: 'View Kitchen', alt: 'Modern 4 BHK Penthouse Kharghar - Modular Kitchen Storage Drawers Detail' },
      { num: 11, class: 'bedroom', label: 'View Bedroom', alt: 'Modern 4 BHK Penthouse Kharghar - Kids Bedroom Colorful Setup' },
      { num: 12, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - Premium Pooja Room Wood Finish Jaali' },
      { num: 13, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - Balcony Cane Lamps Lighting Detail' },
      { num: 14, class: 'living', label: 'View Living', alt: 'Modern 4 BHK Penthouse Kharghar - Bathroom Hanging Lights Vanity' }
    ]
  },
  {
    name: 'Seawoods 4BHK Penthouse',
    folder: 'contemporary-4bhk-penthouse-seawoods',
    total: 14,
    prefix: 'img',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Elegant Living Room Entrance' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Cozy Living Lounge Seating' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Custom TV Console Wall Design' },
      { num: 4, class: 'ceiling', label: 'View Ceiling', alt: 'Contemporary 4 BHK Penthouse Seawoods - False Ceiling Profile Lights' },
      { num: 5, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Contemporary Dining Layout' },
      { num: 6, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Dining Area Cabinetry Setup' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 4 BHK Penthouse Seawoods - Master Bedroom Bed Backrest Wall' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 4 BHK Penthouse Seawoods - Master Bedroom Wardrobe Setup' },
      { num: 9, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 4 BHK Penthouse Seawoods - Kids Bedroom Vibrant Play Zone' },
      { num: 10, class: 'kitchen', label: 'View Kitchen', alt: 'Contemporary 4 BHK Penthouse Seawoods - Modern Kitchen Modular Cabinetry' },
      { num: 11, class: 'kitchen', label: 'View Kitchen', alt: 'Contemporary 4 BHK Penthouse Seawoods - Kitchen Chimney Hub Layout' },
      { num: 12, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Traditional Pooja Room Wood Mandir' },
      { num: 13, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Balcony Outdoor Sitout Deck' },
      { num: 14, class: 'living', label: 'View Living', alt: 'Contemporary 4 BHK Penthouse Seawoods - Bathroom Glass Partition Vanity' }
    ]
  },
  {
    name: 'Vashi 2BHK Flat',
    folder: 'elegant-2bhk-flat-vashi',
    total: 12,
    prefix: 'img',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Elegant 2 BHK Flat Vashi - Living Room Entrance' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Elegant 2 BHK Flat Vashi - Living Room Sofa Seating' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Elegant 2 BHK Flat Vashi - TV Unit Wall Panel' },
      { num: 4, class: 'ceiling', label: 'View Ceiling', alt: 'Elegant 2 BHK Flat Vashi - False Ceiling & Chandelier' },
      { num: 5, class: 'living', label: 'View Living', alt: 'Elegant 2 BHK Flat Vashi - Compact Dining Area' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Elegant 2 BHK Flat Vashi - Master Bedroom Setup' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Elegant 2 BHK Flat Vashi - Master Bedroom Sliding Wardrobe' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Elegant 2 BHK Flat Vashi - Kids Bedroom Study Unit' },
      { num: 9, class: 'kitchen', label: 'View Kitchen', alt: 'Elegant 2 BHK Flat Vashi - Modular Kitchen Layout' },
      { num: 10, class: 'kitchen', label: 'View Kitchen', alt: 'Elegant 2 BHK Flat Vashi - Kitchen Cabinet Storage' },
      { num: 11, class: 'living', label: 'View Living', alt: 'Elegant 2 BHK Flat Vashi - Compact Pooja Mandir' },
      { num: 12, class: 'living', label: 'View Living', alt: 'Elegant 2 BHK Flat Vashi - Modern Bathroom Vanity' }
    ]
  },
  {
    name: 'Belapur 3BHK House',
    folder: 'contemporary-3bhk-house-belapur',
    total: 6,
    prefix: 'img',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK House Belapur - Living Lounge Entrance' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK House Belapur - Living Room Seating Accent' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK House Belapur - Premium Wooden Panel Wall' },
      { num: 4, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 3 BHK House Belapur - Bedroom Study Desk' },
      { num: 5, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 3 BHK House Belapur - Master Bed Area Setup' },
      { num: 6, class: 'ceiling', label: 'View Ceiling', alt: 'Contemporary 3 BHK House Belapur - False Ceiling Profile Lights' }
    ]
  },
  {
    name: 'Kopar Khairane 3BHK Flat',
    folder: 'contemporary-3bhk-flat-kopar-khairane',
    total: 9,
    prefix: 'img',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Living Room Seating Area' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Living Room TV Console Wall' },
      { num: 3, class: 'ceiling', label: 'View Ceiling', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Elegant False Ceiling & Lighting' },
      { num: 4, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Modern Dining Table Setup' },
      { num: 5, class: 'living', label: 'View Living', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Dining Corner Showcase Cabinetry' },
      { num: 6, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Master Bed Accent Wall Design' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Master Bedroom Customized Wardrobes' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Contemporary 3 BHK Flat Kopar Khairane - Kids Room Study & Play Station' },
      { num: 9, class: 'kitchen', label: 'View Kitchen', alt: 'Contemporary 3 BHK Flat Kopar Khairane - High-End Modular Kitchen Layout' }
    ]
  },
  {
    name: 'Nerul 3BHK Home',
    folder: 'rustic-3bhk-home-nerul',
    total: 14,
    prefix: 'img',
    photos: [
      { num: 1, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Warm Living Room Entrance' },
      { num: 2, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Cozy Wooden Panel Sofa Seating' },
      { num: 3, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Classic TV Cabinet Design' },
      { num: 4, class: 'ceiling', label: 'View Ceiling', alt: 'Rustic 3 BHK Home Nerul - Wooden Accent Ceiling Detail' },
      { num: 5, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Traditional Dining Table Layout' },
      { num: 6, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Dining Room Storage & Crockery Unit' },
      { num: 7, class: 'bedroom', label: 'View Bedroom', alt: 'Rustic 3 BHK Home Nerul - Master Bedroom Wooden Headboard' },
      { num: 8, class: 'bedroom', label: 'View Bedroom', alt: 'Rustic 3 BHK Home Nerul - Master Bedroom Wardrobes Setup' },
      { num: 9, class: 'bedroom', label: 'View Bedroom', alt: 'Rustic 3 BHK Home Nerul - Children Bedroom Study Desk' },
      { num: 10, class: 'kitchen', label: 'View Kitchen', alt: 'Rustic 3 BHK Home Nerul - Country Style Modular Kitchen' },
      { num: 11, class: 'kitchen', label: 'View Kitchen', alt: 'Rustic 3 BHK Home Nerul - Kitchen Storage Cabinet Overhead' },
      { num: 12, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Intricate Wooden Pooja Room Mandir' },
      { num: 13, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Balcony Seating Area Lounge' },
      { num: 14, class: 'living', label: 'View Living', alt: 'Rustic 3 BHK Home Nerul - Elegant Bathroom Vanity & Vanity Mirror' }
    ]
  }
];

// Generate HTML
let html = '\n        <!-- ==================== DELIVERED PROJECTS CAROUSELS PHOTOS ==================== -->';
projects.forEach(project => {
  html += `\n        <!-- ${project.name} -->`;
  project.photos.forEach(photo => {
    const filename = `${project.prefix}${photo.num}.webp`;
    const srcPath = `/assets/images/${project.folder}/${filename}`;
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
console.log("Successfully injected all 69 delivered project photos into gallery.astro!");
