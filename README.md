<div align="center">
  <img src="logo.png" alt="RepairLink Logo" width="120" />
  
  # 🛠️ RepairLink
  **Mapping North Delhi's kaarigars — repair first, recycle what's left.**

  [![Website Live](https://img.shields.io/badge/Live-repairlink--de1ta.web.app-success?style=for-the-badge&logo=firebase)](https://repairlink-de1ta.web.app)
  [![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
  [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
  [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
</div>

<br/>

RepairLink connects local *Kaarigars* (repair workers) with customers who need their services, empowering local tradesmen and making everyday repairs highly accessible. 

---

## ✨ Why RepairLink?

We believe in a circular economy. Instead of throwing away that broken mixer or torn shoe, RepairLink instantly connects you with verified local artisans capable of fixing it. 

### 🚀 Key Features

*   🗺️ **Interactive Artisan Map:** Browse an interactive Mapbox-powered map to find nearby Kaarigars (cobblers, watch repairers, mechanics, etc.).
*   🛡️ **Role-Based Dashboards:** 
    *   **Customers:** Book repairs, leave ratings, and track job status.
    *   **Kaarigars:** Manage public profiles, accept incoming jobs, and mark them as completed.
    *   **Admins:** Oversee the platform, verify Kaarigar profiles before they go live, and assign concierge jobs.
*   💳 **Concierge Booking & Payments:** Request a service directly from the map. A small ₹9 booking fee is collected via QR code, which admins manually verify before assigning the job.
*   ⭐ **Trust & Rating System:** Verified users can leave 1-5 star reviews. Kaarigar profiles automatically display dynamic, real-time gold star ratings.
*   🤖 **AI Support Chatbot:** A fully integrated, floating AI chatbot (powered by Streamlit & Groq) is available on the main page to assist users instantly.
*   💎 **Premium Glassmorphism UI:** Built with a stunning, high-end design system featuring mesh-gradient backgrounds, frosted-glass panels, custom scrollbars, and scale-up entrance animations.

### 📈 Marketing & Viral Growth
*   **Social Sharing:** Integrated "Share on WhatsApp" system to drive viral user acquisition.
*   **SEO & Open Graph:** Fully configured OG and Twitter Card tags. Sharing links on social media automatically generates beautiful branded preview cards.
*   **Analytics:** Native Firebase Analytics integration to track user behavior and conversions.
*   **PWA Ready:** Fully installable Progressive Web App with a custom `manifest.json`.

### 🎵 Immersive Vibe
*   **Custom Theme Song:** The platform features an exclusive, custom-produced theme song. Users can toggle the music via a floating, draggable glass button on the main map, or via the interactive equalizer on the *About Us* page.

---

## 🛠️ Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,firebase,python" />
</div>

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (No heavy frameworks!)
*   **Backend & DB:** Firebase (Cloud Firestore & Auth)
*   **Hosting:** Firebase Hosting
*   **Mapping:** Mapbox GL JS
*   **AI Chatbot:** Python, Streamlit, LangChain, Groq

---

## 🚀 Run it Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shreya860/RepairLink.git
   ```

2. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

3. **Serve the Frontend:**
   You can serve the HTML files using any local web server. For example:
   ```bash
   npx serve . -p 3000
   ```

4. **(Optional) Run the AI Chatbot:**
   Navigate to the chatbot folder (if applicable) and run:
   ```bash
   pip install -r requirements.txt
   streamlit run app.py
   ```
