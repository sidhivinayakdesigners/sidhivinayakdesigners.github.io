filepath = "c:\\Users\\Lenovo\\Downloads\\website\\interior-designer-kopar-khairane.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace url and ID references
content = content.replace("interior-designer-koparkhairane", "interior-designer-kopar-khairane")

# Replace text references
content = content.replace("Koparkhairane", "Kopar Khairane")
content = content.replace("koparkhairane", "kopar-khairane")

# Define Map Section
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

# Insert right before Nearby Areas section
target = "  <!-- Nearby Areas We Serve Section -->"
content = content.replace(target, map_section + "\n\n" + target)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Kopar Khairane page updated successfully with hyphenated links and embedded map.")
