import os

search_str = 'style="position:fixed; bottom:30px; left:30px; z-index:9999;'
replace_str = 'style="position:fixed; bottom:100px; left:30px; z-index:9999;'

for file in os.listdir('.'):
    if file.endswith('.html') and file != 'index.html':
        with open(file, 'r') as f:
            content = f.read()
        
        if search_str in content:
            content = content.replace(search_str, replace_str)
            with open(file, 'w') as f:
                f.write(content)
            print(f"Updated {file}")
