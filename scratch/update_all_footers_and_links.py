import os
import re

print("Updating footers and links across all HTML files...")
print("-" * 80)

# Traverse all files in website directory
root_dir = "c:\\Users\\Lenovo\\Downloads\\website"

for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if not filename.endswith(".html"):
            continue
            
        # Skip legacy directories if any
        if "legacy-website" in dirpath:
            continue
            
        filepath = os.path.join(dirpath, filename)
        
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        modified = False
        
        # 1. Update Kopar Khairane URLs (except in sitemap if not needed, but we already updated sitemap)
        # Replacing hrefs:
        new_content = content.replace('href="/interior-designer-koparkhairane"', 'href="/interior-designer-kopar-khairane"')
        new_content = new_content.replace('href="/interior-designer-koparkhairane.html"', 'href="/interior-designer-kopar-khairane.html"')
        
        if new_content != content:
            content = new_content
            modified = True
            
        # 2. Add Seawoods and update Kopar Khairane texts inside the service area paragraphs
        target_nerul = '<a href="/interior-designer-nerul" class="text-gold mx-2">Nerul</a> |'
        new_nerul_seawoods = '<a href="/interior-designer-nerul" class="text-gold mx-2">Nerul</a> |\n            <a href="/interior-designer-seawoods" class="text-gold mx-2">Seawoods</a> |'
        
        if target_nerul in content and 'href="/interior-designer-seawoods"' not in content:
            content = content.replace(target_nerul, new_nerul_seawoods)
            modified = True
            
        # Update Koparkhairane label inside the service areas paragraph
        target_label = '>Koparkhairane</a>'
        new_label = '>Kopar Khairane</a>'
        if target_label in content:
            content = content.replace(target_label, new_label)
            modified = True
            
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            # Print relative path
            rel_path = os.path.relpath(filepath, root_dir)
            print(f"Updated: {rel_path}")

print("-" * 80)
print("Batch footer and link updates completed successfully.")
