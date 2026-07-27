# RepairLink

RepairLink connects local Kaarigars (repair workers) with customers who need their services, empowering local tradesmen and making everyday repairs highly accessible. 

🌍 **Live Website:** [https://repairlink-de1ta.web.app](https://repairlink-de1ta.web.app)

---

## 🚀 Features

### 🔹 1. Role-Based Access Control
The platform supports three distinct roles, each with custom dashboards and unique capabilities:
- **Customers (Users):** Can browse an interactive map to find nearby Kaarigars, view their profiles, and (coming soon) book repair jobs.
- **Kaarigars (Tradesmen):** Get a dedicated dashboard to build their public profile (Name, Trade, Area, Experience, Intro). They can preview how they look to customers and submit their profile for approval.
- **Admin:** A secure command center to oversee the entire platform. Admins can view all registered users and Kaarigars, edit Kaarigar details to fix typos, and approve or reject profiles before they go live on the map.

### 🔹 2. Interactive Discovery Map
Powered by Mapbox GL JS, the homepage features a dynamic, location-based map that instantly plots verified Kaarigars in the user's vicinity, complete with custom map markers.

### 🔹 3. Secure Authentication & Database
Seamless and secure login through **Firebase Google Authentication**. All user profiles, roles, and Kaarigar listings are stored securely in **Cloud Firestore**, with real-time updates across the platform.

---

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend/Database:** Firebase (Cloud Firestore)
- **Authentication:** Firebase Auth (Google Provider)
- **Hosting:** Firebase Hosting
- **Mapping:** Mapbox GL JS

---

## 🤝 How to use (For Admins)
1. **Admin Access:** To become an admin, a user's Firestore document in the `users` collection must have their `role` field manually set to `"admin"`.
2. **Reviewing Kaarigars:** Navigate to the Admin Dashboard to see all pending applications. Click on a Kaarigar's name to view their full details, edit them if necessary, and click **Approve** to push their profile live to the map.
