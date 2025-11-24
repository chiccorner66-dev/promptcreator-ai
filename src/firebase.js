// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- เพิ่ม Firestore

const firebaseConfig = {
  // ⚠️ ต้องเป็นค่าจริงจาก Firebase Console ⚠️
  apiKey: "AIzaSyA0IReHEyT8P00eorb4V5_rEGDhcm4_yG4", 
  authDomain: "shorts-script-promptsfactory.firebaseapp.com", 
  projectId: "shorts-script-promptsfactory",
  // ... (ส่วนอื่นๆ)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Export Firestore Database