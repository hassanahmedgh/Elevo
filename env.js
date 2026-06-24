/* ─────────────────────────────────────────────────────────────
   ENVIRONMENT CONFIG (browser-readable)

   This static site has no build step (it's served straight from
   GitHub Pages), so the browser cannot read a .env file at runtime.
   Instead, runtime config lives here as window.__ENV and is loaded
   before firebase.js.

   NOTE: A Firebase *web* config is meant to be public — the apiKey
   is an identifier, not a secret. Real protection comes from your
   Firestore security rules. The committed .env / .env.example files
   exist for tooling and documentation only.
───────────────────────────────────────────────────────────── */
window.__ENV = {
  FIREBASE_API_KEY: "AIzaSyDoz4ERv2uxQFF7d6NCWXaFOryinJHjP18",
  FIREBASE_AUTH_DOMAIN: "elevo-44e6c.firebaseapp.com",
  FIREBASE_PROJECT_ID: "elevo-44e6c",
  FIREBASE_STORAGE_BUCKET: "elevo-44e6c.firebasestorage.app",
  FIREBASE_MESSAGING_SENDER_ID: "674701518736",
  FIREBASE_APP_ID: "1:674701518736:web:a1a10d49b482418f7e7515",
  FIREBASE_MEASUREMENT_ID: "G-8LX36VWZ8D"
};
