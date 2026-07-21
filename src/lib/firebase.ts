import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  onSnapshot
} from "firebase/firestore";

const firebaseConfig = {
  projectId: "euphoric-dreamlet-mthgf",
  appId: "1:781134221527:web:36b3cc710b5c855eca2092",
  apiKey: "AIzaSyCRRJbuhYZcu9lQqorrymE3YV4nS3f1Vr4",
  authDomain: "euphoric-dreamlet-mthgf.firebaseapp.com",
  storageBucket: "euphoric-dreamlet-mthgf.firebasestorage.app",
  messagingSenderId: "781134221527",
};

const firestoreDatabaseId = "ai-studio-ankitasharmaport-cdc3bb40-7226-40b9-80fe-0b46ff11cf35";

// Initialize Firebase
let db: ReturnType<typeof getFirestore>;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app, firestoreDatabaseId);
} catch (err) {
  console.warn("Firebase initialization failed:", err);
  // @ts-ignore
  db = null;
}

export { db };

export {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  onSnapshot
};
