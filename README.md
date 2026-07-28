# RepairLink

RepairLink connects local Kaarigars (repair workers) with customers who need their services, empowering local tradesmen and making everyday repairs highly accessible. 

🌍 **Live Website:** [https://repairlink-de1ta.web.app](https://repairlink-de1ta.web.app)

---

## 🚀 Key Features

### 🔹 1. Role-Based Access Control & Dashboards
The platform supports three distinct roles with secure Google Authentication:
- **Customers (Users):** Can browse an interactive map to find nearby Kaarigars, view their profiles, book repair jobs, and leave ratings.
- **Kaarigars (Tradesmen):** Get a dedicated dashboard to build their public profile (Name, Trade, Area, Experience, Intro). They can submit their profile for approval, view active repair jobs, and mark jobs as completed.
- **Admin:** A secure command center to oversee the entire platform. Admins can view all registered users and Kaarigars, approve/reject profiles before they go live on the map, and monitor customer support messages.

### 🔹 2. Concierge Booking Flow & Payments
- Users can click on a Kaarigar's map marker to request a service.
- The platform features a concierge-style flow where a ₹9 booking fee is collected via a QR code (PhonePe) before the job is officially assigned.
- Admins verify the payment and manually assign the job to the Kaarigar in the backend, completing the trust loop.

### 🔹 3. Trust & Rating System
- Once a job is marked as "Completed" by the Kaarigar, it moves to the user's dashboard for review.
- Users can leave a 1 to 5-star rating and a written review.
- The platform automatically calculates the Kaarigar's average rating in real-time, displaying a beautiful gold star UI on their public profile map marker.

### 🔹 4. AI Support Chatbot Integration
- The main map page features a floating "AI Support" button.
- Clicking it opens a sleek, glassmorphic modal containing a fully integrated Streamlit AI Chatbot to assist users with finding exactly what they need.

### 🔹 5. Premium UI & Glassmorphism
- The entire application uses a modern, high-end design system.
- It features subtle mesh-gradient backgrounds, frosted-glass (`backdrop-filter`) panels, scale-up entrance animations, custom webkit scrollbars, and toast notifications.

### 🔹 6. Marketing & Viral Growth Ready
- **Social Sharing:** Includes an integrated "Share on WhatsApp" referral system for quick user acquisition.
- **SEO & Social Previews:** Fully configured with Open Graph (OG) and Twitter Card meta tags so sharing links generates beautiful, branded preview cards on all major social networks.
- **Marketing Analytics:** Firebase Analytics is built directly into the client to track user acquisition, button clicks, and conversions natively from the Firebase Console.

### 🔹 7. Progressive Web App (PWA)
- Features a `manifest.json` ensuring the website acts as a fully installable app. Mobile users tapping on social media ads are prompted to "Add to Home Screen," improving long-term retention.

### 🔹 8. Custom Theme Song (Immersive Vibe)
- The main map interface features an interactive, glassmorphic "Play Theme" button.
- Users can toggle a custom-produced looping theme song (`theme-song.mp3`) while exploring the local kaarigar network, creating a uniquely immersive startup experience.

---

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend/Database:** Firebase (Cloud Firestore)
- **Authentication:** Firebase Auth (Google Provider)
- **Hosting:** Firebase Hosting
- **Mapping:** Mapbox GL JS
- **AI Chatbot:** Python, Streamlit, Langchain, Groq

---

## 🤝 How to setup locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shreya860/RepairLink.git
   ```
2. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```
3. **Run the local frontend server:**
   You can serve the HTML files using any local web server. For example:
   ```bash
   npx serve . -p 3000
   ```
4. **Run the AI Chatbot (Optional):**
   Navigate to the chatbot folder (if applicable) and run:
   ```bash
   pip install -r requirements.txt
   streamlit run app.py
   ```
   *(Note: The `RepairLink.html` file expects the chatbot to be hosted at the configured iframe URL).*
