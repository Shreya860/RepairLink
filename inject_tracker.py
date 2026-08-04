import os
import glob

tracker_script = """<!-- PAGE TRACKER SCRIPT -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
  import { getFirestore, doc, setDoc, increment } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

  const firebaseConfig = {
    projectId: "repairlink-de1ta",
    appId: "1:4711329582:web:6e12287963fd4bd58254bf",
    storageBucket: "repairlink-de1ta.firebasestorage.app",
    apiKey: "AIzaSyAcLvXeMUA01CB1vha8I6_R0iFK5iN0RWU",
    authDomain: "repairlink-de1ta.firebaseapp.com",
    messagingSenderId: "4711329582",
    measurementId: "G-BQ7PBRSGH3"
  };

  const app = initializeApp(firebaseConfig, "TrackerApp-" + Math.random().toString(36).substring(7));
  const db = getFirestore(app);

  let pageName = window.location.pathname.split('/').pop();
  if (!pageName || pageName === '') pageName = 'index.html';
  const docRef = doc(db, 'stats', 'page_visits');
  setDoc(docRef, { [pageName]: increment(1) }, { merge: true }).catch(e => console.error("Error tracking visit:", e));
</script>
</body>"""

for file in glob.glob("*.html"):
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "PAGE TRACKER SCRIPT" not in content:
        if "</body>" in content:
            content = content.replace("</body>", tracker_script)
            with open(file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Injected into {file}")
        else:
            print(f"Warning: </body> not found in {file}")
    else:
        print(f"Already injected in {file}")
