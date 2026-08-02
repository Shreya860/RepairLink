<div align="center">
  <img src="logo.png" alt="RepairLink Logo" width="120" />
  
  # 🛠️ RepairLink
  **Mat Feko, Fix Karo. Mapping North Delhi's kaarigars — repair first, recycle what's left.**

  [![Website Live](https://img.shields.io/badge/Live-repairlink--de1ta.web.app-success?style=for-the-badge&logo=firebase)](https://repairlink-de1ta.web.app)
  [![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
  [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
  [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
</div>

<br/>

RepairLink is a community-driven platform built for a circular economy. Instead of throwing away a broken mixer or a torn shoe, RepairLink instantly connects you with verified local artisans (*kaarigars*) capable of fixing it. 

---

## ✨ Core Features & Innovations

### 🗺️ Geo-Fenced Discovery (CARTO Maps)
We utilize **CARTO Voyager** tiles paired with a custom **Inverted Polygon Mask** to visually isolate and highlight our active service area (North Delhi), dimming out regions where services are currently unavailable. Users can filter kaarigars by category (Cobbler, Tailor, Electrician, etc.) instantly on the map.

### 🔒 Privacy-First Architecture
Kaarigar phone numbers and direct contact details are protected by strict **Role-Based Access Control (RBAC)**. When users click on a map marker, they see the kaarigar's story and skills, but sensitive details are masked and strictly restricted to Admin users only, preventing unauthorized data scraping.

### 🌐 Bilingual Accessibility (English & Hindi)
To ensure maximum accessibility across diverse demographics, the platform features a seamless **Hindi/English localization toggle**, powered by dynamic CSS text rotators that prevent layout shifting during translation.

### 📊 Real-Time Native Analytics
Instead of relying on heavy third-party trackers, RepairLink features a custom, lightweight real-time analytics engine. Page visits and interactions are tracked natively and pushed directly to **Cloud Firestore (`/stats/page_visits`)**, which Admins can monitor in real-time.

### 👥 Dedicated Role Portals
The ecosystem is divided into specific portals tailored for different users:
- **`UserDashboard.html`**: For customers to track their repair requests.
- **`KaarigarDashboard.html`**: For artisans to manage their profile and workload.
- **`Admin.html`**: A powerful control center for verifying kaarigars, monitoring site analytics, and managing user feedback.
- **`Addkaarigar.html`**: A streamlined onboarding flow with an interactive map picker for pinning the exact geolocation of a new artisan's shop.

### 💬 Integrated AI Support
A floating, draggable AI Chatbot (powered by Streamlit & Groq) is embedded directly into the platform, providing instant contextual help to users without them having to leave the page.

---

## 🏗️ Project Architecture

| Page | Description |
| :--- | :--- |
| **`index.html`** | The landing page featuring a repair vs. replace calculator, dynamic testimonials, an interactive accordion FAQ, and a premium glassmorphism aesthetic. |
| **`RepairLink.html`** | The core map interface where users locate and discover kaarigars. |
| **`Pricing.html`** | Transparent breakdown of our minimal ₹9 connection fee model (no commissions on repairs). |
| **`Auth.html`** | Secure authentication handling via Firebase Auth. |
| **`AboutUs.html`** | The mission statement page, featuring an interactive audio equalizer for the platform's custom theme song. |
| **`script.js`** | The brain of the frontend—handling Mapbox initialization, Firestore listeners, auth state, and UI logic. |

---

## 🛠️ Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,firebase,python" />
</div>

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Zero heavy frameworks for maximum performance)
*   **Backend & Database:** Firebase (Cloud Firestore, Authentication)
*   **Hosting:** Firebase Hosting
*   **Mapping:** Mapbox GL JS with CARTO basemaps
*   **AI Chatbot (External):** Python, Streamlit, LangChain, Groq

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
   Or simply use the VS Code Live Server extension.

4. **Deploying Updates:**
   ```bash
   npx firebase-tools deploy --only hosting
   ```
