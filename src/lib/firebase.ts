import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Config is inlined so the site works on Vercel with no env setup. Vite env
// vars (VITE_FIREBASE_*) override it when present. A Firebase web config is
// public by design, data is protected by Firestore security rules.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDoz4ERv2uxQFF7d6NCWXaFOryinJHjP18",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "elevo-44e6c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "elevo-44e6c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "elevo-44e6c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "674701518736",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:674701518736:web:a1a10d49b482418f7e7515",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8LX36VWZ8D",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics only initialises in supported (https) browser environments.
isSupported().then((ok) => { if (ok) getAnalytics(app); }).catch(() => {});
