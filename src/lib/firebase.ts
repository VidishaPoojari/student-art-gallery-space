
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - using a valid API key for development
// Note: In production, you should use environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCuMvh-xRPmEbI1iA8UjdT-jK03t6CKHBM",
  authDomain: "student-art-gallery-dev.firebaseapp.com",
  projectId: "student-art-gallery-dev",
  storageBucket: "student-art-gallery-dev.appspot.com",
  messagingSenderId: "295487302790",
  appId: "1:295487302790:web:a1b9c2d3e4f5g6h7i8j9k0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
