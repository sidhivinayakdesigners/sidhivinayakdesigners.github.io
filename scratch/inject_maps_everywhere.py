import os

files_to_inject = [
    "vashi/index.html",
    "interior-designer-belapur.html",
    "interior-designer-kharghar.html",
    "interior-designer-koparkhairane.html",
    "interior-designer-nerul.html",
    "interior-designer-panvel.html",
    "interior-designer-airoli.html",
    "interior-designer-ghansoli.html",
    "interior-designer-rabale.html",
    "interior-designer-sanpada.html"
]

map_section = """
  <!-- Embedded Google Map Section -->
  <section class="py-5 bg-dark-card border-top border-bottom border-secondary" data-aos="fade-up">
    <div class="container text-center">
      <span class="section-subtitle">Locate Our Office</span>
      <h3 class="font-luxury text-white h2 mb-4">Our Navi Mumbai Location Map</h3>
      <div class="mx-auto" style="max-width: 800px; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0811560731135!2d73.0031!3d19.1039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x600b3e68a80e4bc3!2sSiddhivinayak%20Designers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>
"""

target = "  <!-- Nearby Areas We Serve Section -->"

for filename in files_to_inject:
    filepath = os.path.join("c:\\Users\\Lenovo\\Downloads\\website", filename)
    if not os.path.exists(filepath):
        print(f"File '{filename}': DOES NOT EXIST - Skipping")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Prevent duplicate injection
    if "Our Navi Mumbai Location Map" in content:
        print(f"File '{filename}': Already contains map - Skipping")
        continue
        
    if target in content:
        content = content.replace(target, map_section + "\n\n" + target)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"File '{filename}': Map successfully injected!")
    else:
        print(f"File '{filename}': Target separator not found - Skipping")
