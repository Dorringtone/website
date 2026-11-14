import { initializeApp } from
  "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// Firebase connection settings for Mama Mboga Fresh.
const firebaseConfig = {
  apiKey: "AIzaSyDV1UbFthV5-l6zpEawMDzGnNp4Z9JrFFw",
  authDomain: "mama-mboga-fresh.firebaseapp.com",
  projectId: "mama-mboga-fresh",
  storageBucket: "mama-mboga-fresh.firebasestorage.app",
  messagingSenderId: "809464495135",
  appId: "1:809464495135:web:8a2640baee60b16487292a"
};

// Connect to Firebase and make Authentication available to other files.
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
