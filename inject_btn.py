import os

snippet = """
<!-- Return to Home Draggable Button -->
<a href="index.html" class="return-home-btn" id="returnHomeBtn" style="position:fixed; bottom:30px; left:30px; z-index:9999; display:flex; align-items:center; gap:8px; background:var(--ink, #1F1B13); color:#fff; padding:12px 20px; border-radius:99px; text-decoration:none; font-weight:700; font-family:'Manrope', sans-serif; font-size:14px; box-shadow:0 10px 30px rgba(0,0,0,0.15); cursor:grab; user-select:none; transition: transform 0.3s, box-shadow 0.3s;">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  <span>Return to Home</span>
</a>
<script>
  (function(){
    const btn = document.getElementById('returnHomeBtn');
    if(!btn) return;
    let isDragging = false, hasDragged = false, offsetX, offsetY;

    const dragStart = (e) => {
      isDragging = true;
      hasDragged = false;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      offsetX = clientX - btn.getBoundingClientRect().left;
      offsetY = clientY - btn.getBoundingClientRect().top;
      btn.style.cursor = 'grabbing';
      btn.style.transition = 'none';
    };

    const drag = (e) => {
      if (!isDragging) return;
      hasDragged = true;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      btn.style.left = (clientX - offsetX) + 'px';
      btn.style.top = (clientY - offsetY) + 'px';
      btn.style.bottom = 'auto';
      btn.style.right = 'auto';
    };

    const dragEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      btn.style.cursor = 'grab';
      btn.style.transition = 'transform 0.3s, box-shadow 0.3s';
    };

    btn.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    btn.addEventListener('click', (e) => { if(hasDragged) e.preventDefault(); });
    btn.addEventListener('touchstart', dragStart, {passive: true});
    document.addEventListener('touchmove', drag, {passive: false});
    document.addEventListener('touchend', dragEnd);
  })();
</script>
</body>
"""

for file in os.listdir('.'):
    if file.endswith('.html') and file != 'index.html':
        with open(file, 'r') as f:
            content = f.read()
        if '<!-- Return to Home Draggable Button -->' not in content:
            content = content.replace('</body>', snippet)
            with open(file, 'w') as f:
                f.write(content)
            print(f"Updated {file}")
