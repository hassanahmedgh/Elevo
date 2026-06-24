/* ─────────────────────────────────────────────────────────────
   FIREBASE BOOTSTRAP

   Initialises Firebase App, Firestore and Analytics, then exposes a
   small helper API on window.FB so the (non-module) app.js can use it.
   Config comes from window.__ENV (see env.js, loaded before this file).

   Fires a `firebase-ready` event once window.FB is available.
───────────────────────────────────────────────────────────── */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
import {
  getFirestore, collection, getDocs,
  doc, setDoc, updateDoc, deleteDoc, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const env = window.__ENV || {};

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Analytics only works on a real (https) host — guard so file:// doesn't throw.
try { getAnalytics(app); } catch (e) { /* no-op on unsupported hosts */ }

/* Helper API consumed by app.js's DataService */
window.FB = {
  db,

  // Read every document in a collection as an array of plain objects.
  async getAll(col) {
    const snap = await getDocs(collection(db, col));
    return snap.docs.map(d => d.data());
  },

  // Create or overwrite a document with an explicit id.
  async set(col, id, data) {
    await setDoc(doc(db, col, String(id)), data);
  },

  // Patch fields on an existing document.
  async update(col, id, data) {
    await updateDoc(doc(db, col, String(id)), data);
  },

  // Delete a document by id.
  async remove(col, id) {
    await deleteDoc(doc(db, col, String(id)));
  },

  // Append a document with an auto-generated id (+ server timestamp).
  async add(col, data) {
    const ref = await addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
    return ref.id;
  },

  // Bulk-write seed data, using item[idField] as each document id.
  async seed(col, arr, idField) {
    await Promise.all(arr.map(item => setDoc(doc(db, col, String(item[idField])), item)));
  }
};

console.log('[Elevo] Firebase initialised → project:', firebaseConfig.projectId);
window.dispatchEvent(new Event('firebase-ready'));
