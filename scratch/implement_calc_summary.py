import os

def implement_summary():
    # 1. Update calculator.html to save summary selections in localStorage before redirection
    calc_path = "c:\\Users\\Lenovo\\Downloads\\website\\calculator.html"
    if os.path.exists(calc_path):
        with open(calc_path, "r", encoding="utf-8", errors="ignore") as f:
            calc_html = f.read()

        old_submit_block = """        if (name && email && phone && city) {
          const prices = calculateInstantEstimate();
          window.location.href = `/calculator-result.html?min=${prices.min}&max=${prices.max}`;
        } else {"""

        new_submit_block = """        if (name && email && phone && city) {
          const prices = calculateInstantEstimate();
          
          // Assemble selected rooms array
          let selectedRooms = [];
          if (counts.living > 0) selectedRooms.push("Living Room");
          if (counts.kitchen > 0) selectedRooms.push("Kitchen");
          if (counts.bedroom > 0) selectedRooms.push("Bedroom");
          if (counts.bathroom > 0) selectedRooms.push("Bathroom");
          if (counts.dining > 0) selectedRooms.push("Dining");

          const summaryData = {
            bhk: selectedBhkName,
            rooms: selectedRooms.join(", "),
            package: packageName
          };
          
          localStorage.setItem("calc_summary", JSON.stringify(summaryData));
          
          window.location.href = `/calculator-result.html?min=${prices.min}&max=${prices.max}`;
        } else {"""

        calc_html = calc_html.replace(old_submit_block, new_submit_block)

        with open(calc_path, "w", encoding="utf-8") as f:
            f.write(calc_html)
        print("calculator.html updated to save selections to localStorage.")

    # 2. Update calculator-result.html to display the interactive summary accordion/drawer
    result_path = "c:\\Users\\Lenovo\\Downloads\\website\\calculator-result.html"
    if os.path.exists(result_path):
        with open(result_path, "r", encoding="utf-8", errors="ignore") as f:
            res_html = f.read()

        # Add styles for the detailed summary block
        old_style_target = """    .summary-link {
      font-size: 0.88rem;
      font-weight: 700;
      color: #334155;
      text-decoration: underline;
      cursor: pointer;
    }"""

        new_style_target = """    .summary-link {
      font-size: 0.88rem;
      font-weight: 700;
      color: #ec5252;
      text-decoration: underline;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 0.5rem;
    }
    
    /* Detailed Summary Accordion Panel */
    .summary-panel-box {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: #fafbfc;
      border-radius: 12px;
      margin: 1.5rem auto 0;
      text-align: left;
      border: 1px solid transparent;
    }
    .summary-panel-box.expanded {
      max-height: 800px;
      padding: 1.5rem;
      border-color: #e2e8f0;
      margin-top: 1.5rem;
    }
    .summary-title-heading {
      font-size: 1.1rem;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    .summary-row {
      margin-bottom: 1.1rem;
    }
    .summary-row:last-child {
      margin-bottom: 0;
    }
    .summary-key {
      font-size: 0.78rem;
      font-weight: 800;
      color: #ec5252;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 0.25rem;
    }
    .summary-value {
      font-size: 0.92rem;
      font-weight: 600;
      color: #334155;
      line-height: 1.45;
    }"""

        res_html = res_html.replace(old_style_target, new_style_target)

        # Replace View detailed summary link to call toggleSummaryPanel() instead of print
        old_link_markup = '<div>\n        <span class="summary-link" onclick="window.print()">View detailed summary</span>\n      </div>'
        new_link_markup = """<div>
        <span class="summary-link" onclick="toggleSummaryPanel()">View detailed summary</span>
      </div>
      
      <!-- Collapsible Summary Panel -->
      <div class="summary-panel-box" id="summaryPanel">
        <h4 class="summary-title-heading">Estimate Summary Breakdown</h4>
        
        <div class="summary-row">
          <div class="summary-key">Type</div>
          <div class="summary-value" id="summaryBhk">2 BHK</div>
        </div>
        
        <div class="summary-row">
          <div class="summary-key">Rooms</div>
          <div class="summary-value" id="summaryRooms">Living Room, Kitchen, Bedroom, Bathroom, Dining</div>
        </div>
        
        <div class="summary-row">
          <div class="summary-key">Modular woodwork</div>
          <div class="summary-value" id="summaryModular">-</div>
        </div>
        
        <div class="summary-row">
          <div class="summary-key">Furniture</div>
          <div class="summary-value" id="summaryFurniture">-</div>
        </div>
        
        <div class="summary-row">
          <div class="summary-key">Services</div>
          <div class="summary-value" id="summaryServices">-</div>
        </div>
      </div>"""

        res_html = res_html.replace(old_link_markup, new_link_markup)

        # Add Script details to load summary content from localStorage
        old_script_target = """    // Read calculated price parameters from URL
    window.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const min = params.get('min');
      const max = params.get('max');
      if (min && max) {
        document.getElementById('resultPrice').textContent = `₹${min}L - ₹${max}L*`;
      } else {
        // Fallback default
        document.getElementById('resultPrice').textContent = '₹9L - ₹12L*';
      }
    });"""

        new_script_target = """    // Read calculated price parameters and localStorage summary details
    window.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const min = params.get('min');
      const max = params.get('max');
      if (min && max) {
        document.getElementById('resultPrice').textContent = `₹${min}L - ₹${max}L*`;
      } else {
        document.getElementById('resultPrice').textContent = '₹9L - ₹12L*';
      }

      // Load stored configurations
      const savedSummary = localStorage.getItem("calc_summary");
      if (savedSummary) {
        try {
          const data = JSON.parse(savedSummary);
          document.getElementById('summaryBhk').textContent = data.bhk || "-";
          document.getElementById('summaryRooms').textContent = data.rooms || "-";
          
          const pkg = data.package || "Essentials";
          
          if (pkg === "Essentials") {
            document.getElementById('summaryModular').textContent = "Modular Kitchen (MDF material, Matt Finish, Basic Accessories), Modular Wardrobe (2-Door Swing, MDF Material, Laminate finish, Basic Accessories), Basic Vanity Unit";
            document.getElementById('summaryFurniture').textContent = "Basic Crockery Unit";
            document.getElementById('summaryServices').textContent = "Basic Painting (Only Living Room)";
          } else if (pkg === "Premium") {
            document.getElementById('summaryModular').textContent = "Modular Kitchen (HDF material, High Gloss Finish, Premium Accessories), Modular Wardrobe (3-Door Sliding, HDF Material, Acrylic finish, Premium Accessories), Premium Vanity Unit";
            document.getElementById('summaryFurniture').textContent = "Premium Crockery Unit, Basic TV Unit";
            document.getElementById('summaryServices').textContent = "Premium Painting (All Rooms), Basic False Ceiling (Living Room)";
          } else {
            // Luxe
            document.getElementById('summaryModular').textContent = "Modular Kitchen (Boiling Water Resistant Plywood, Glass/Acrylic Finish, Soft-close Blum Accessories), Modular Wardrobe (Walk-in Sliding, High-End Veneer/Mirror Finish, Luxury Accessories), Luxury Vanity Unit";
            document.getElementById('summaryFurniture').textContent = "Premium Crockery Unit, Luxury TV Unit, Accent Bar Cabinet";
            document.getElementById('summaryServices').textContent = "Premium Painting (All Rooms), Royal Wallpaper Accent, Custom False Ceiling (Living Room & Bed Rooms)";
          }
        } catch (e) {
          console.error("Error parsing summary details:", e);
        }
      }
    });

    function toggleSummaryPanel() {
      const panel = document.getElementById("summaryPanel");
      panel.classList.toggle("expanded");
    }"""

        res_html = res_html.replace(old_script_target, new_script_target)

        with open(result_path, "w", encoding="utf-8") as f:
            f.write(res_html)
        print("calculator-result.html updated with interactive estimate details summary.")

if __name__ == '__main__':
    implement_summary()
