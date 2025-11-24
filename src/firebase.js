import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- เอา Config จากโปรเจกต์ "Shorts-Script-PromptsFactory" มาใส่ตรงนี้ ---
const firebaseConfig = {
  apiKey: "AIzaSyA0IReHEyT8P00eorb4V5_rEGDhcm4_yG4",
  authDomain: "shorts-script-promptsfactory.firebaseapp.com", 
  projectId: "shorts-script-promptsfactory",
  storageBucket: "shorts-script-promptsfactory.firebasestorage.app",
  messagingSenderId: "ตัวเลข...",
  appId: "1:ตัวเลข..."
};

// เริ่มต้นระบบ
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);