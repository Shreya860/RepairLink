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

**RepairLink** is a community-driven platform built for a circular economy. Instead of throwing away a broken mixer or a torn shoe, RepairLink instantly connects you with verified local artisans (*kaarigars*) capable of fixing it. 

---

## 🌟 Comprehensive Feature Set

### ✨ **New Additions & Gamification**
- 🏆 **Eco-Gamification System:** Users earn "Waste Points" for every completed repair, unlocking progressive levels (Eco-Beginner, Eco-Warrior, Eco-Champion, Eco-Master).
- 🏅 **Unlockable Badges:** Interactive UI badges unlock based on achievements (*Early Adopter*, *First Repair* 🛠️, *Eco-Saver* 🏆).
- 💰 **Dynamic Service Pricing:** Tiered up-front connection fees (e.g., Cobbler ₹9, Locksmith ₹19, Appliance ₹39) ensuring fair and transparent platform costs.
- 📱 **Kaarigar Engagement Suite:** Dedicated tabs for Kaarigars to track **Earnings**, read **Reviews**, and access **Help & Support** directly from their dashboard.
- 📍 **Interactive Kaarigar Profile Mapping:** Kaarigars can drop pins on an embedded **Leaflet Map** or use 1-click **Auto-Detect GPS** to update their storefront locations securely.
- 📈 **Advanced Admin Analytics:** Comprehensive admin panel with real-time charts displaying revenue streams, page visit metrics, active orders, and service distributions.

### 🛠️ **Core Platform Features**
- 🗺️ **Geo-Fenced Discovery:** Utilizes Leaflet JS & CARTO Voyager tiles with an **Inverted Polygon Mask** to highlight the active service area (North Delhi), dimming out unserviceable regions.
- 👥 **Dedicated Role Portals:** 
  - **User Dashboard (`UserDashboard.html`)**: Track active repairs, eco-impact metrics, and manage premium memberships.
  - **Kaarigar Dashboard (`KaarigarDashboard.html`)**: Profile management, service request handling, and business insights.
  - **Admin Control Center (`Admin.html`)**: Kaarigar verification pipelines, site analytics, and support ticket management.
- 🔒 **Privacy-First Architecture:** Strict Role-Based Access Control (RBAC). Contact numbers and sensitive data are strictly masked from public view and accessible only through authorized requests to prevent data scraping.
- 🌐 **Bilingual Accessibility:** Instant English ↔ Hindi localization toggle, keeping the UI inclusive for diverse demographics without layout shifts.
- 💬 **Integrated AI Support:** Floating, draggable AI Chatbot embedded directly into the platform providing instant, contextual assistance.
- 💳 **Premium Membership Tiers:** Users can subscribe for free priority services and waived upfront connection fees.

---

## 🏗️ Project Architecture

| Page | Description |
| :--- | :--- |
| **`index.html`** | Landing page featuring a repair vs. replace calculator, dynamic testimonials, an accordion FAQ, and a premium aesthetic. |
| **`RepairLink.html`** | The core map interface where users locate and request services from local kaarigars. |
| **`Pricing.html`** | Transparent breakdown of our dynamic connection fee models and premium plans. |
| **`UserDashboard.html`** | Complete user tracking hub with gamification progress and active repair monitoring. |
| **`KaarigarDashboard.html`**| Business hub for artisans featuring map integration, earnings previews, and request management. |
| **`Admin.html`** | Analytics dashboard with dynamic charts and Kaarigar approval workflows. |
| **`Auth.html`** | Secure authentication handling via Firebase Auth. |
| **`AboutUs.html`** | Mission statement page, featuring an interactive audio equalizer for the custom theme song. |
| **`script.js`** | The frontend brain handling Leaflet maps, Firestore listeners, auth state, and complex UI routing logic. |

---

## 🛠️ Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,firebase,python" />
</div>

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Zero heavy frameworks for maximum performance)
*   **Backend & Database:** Firebase (Cloud Firestore, Authentication)
*   **Hosting:** Firebase Hosting
*   **Mapping:** Leaflet JS with CARTO basemaps
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
