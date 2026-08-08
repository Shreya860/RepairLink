import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

import { firebaseConfig } from './env.js?v=6';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

const googleSignInBtn = document.getElementById('googleSignInBtn');
const errorMessage = document.getElementById('errorMessage');
const authStep1 = document.getElementById('authStep1');
const authStep2 = document.getElementById('authStep2');
const completeSignupBtn = document.getElementById('completeSignupBtn');

// Automatically route users who are already logged in
onAuthStateChanged(auth, async (user) => {
  const authLoading = document.getElementById('authLoading');
  if (user) {
    if (!currentUser) {
      currentUser = user;
      await checkUserRole(currentUser);
    }
  } else {
    // Not logged in
    if (authLoading) authLoading.style.display = 'none';
    if (authStep1) authStep1.style.display = 'block';
  }
});

// Sign In
if(googleSignInBtn) {
  googleSignInBtn.addEventListener('click', async () => {
    if(googleSignInBtn.querySelector('span')) {
       googleSignInBtn.querySelector('span').innerText = "Opening Secure Login...";
    }
    try {
      const result = await signInWithPopup(auth, provider);
      currentUser = result.user;
      await checkUserRole(currentUser);
    } catch (error) {
      console.error(error);
      if(googleSignInBtn.querySelector('span')) {
         googleSignInBtn.querySelector('span').innerText = "Continue with Google";
      }
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
    }
  });
}

async function checkUserRole(user) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // User exists, route them
    const data = userSnap.data();
    routeUser(data.role);
  } else {
    // New user, ask for role
    authStep1.style.display = 'none';
    authStep2.style.display = 'block';
  }
}

if(completeSignupBtn) {
  completeSignupBtn.addEventListener('click', async () => {
    const selectedRole = document.querySelector('input[name="role"]:checked').value;
    
    if(!currentUser) return;
    
    try {
      // Save user to db
      await setDoc(doc(db, 'users', currentUser.uid), {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        role: selectedRole,
        createdAt: new Date()
      });
      
      routeUser(selectedRole);
    } catch(err) {
      console.error(err);
      alert("Error saving profile.");
    }
  });
}

function routeUser(role) {
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  if (redirect) {
    window.location.href = decodeURIComponent(redirect);
    return;
  }

  if(role === 'admin') {
    window.location.href = 'Admin.html';
  } else if (role === 'kaarigar') {
    window.location.href = 'KaarigarDashboard.html';
  } else {
    // Default user
    window.location.href = 'RepairLink.html';
  }
}
