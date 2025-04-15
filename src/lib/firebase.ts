
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration with a valid demo API key for development
// Note: This is a restricted demo key for development purposes
const firebaseConfig = {
  apiKey: "AIzaSyBcZE7DB-Isn-z0xK9ZmELZbGMEzucCX2g",
  authDomain: "demo-art-gallery-project.firebaseapp.com",
  projectId: "demo-art-gallery-project",
  storageBucket: "demo-art-gallery-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase - with error handling
let app;
let auth;
let db;
let storage;

try {
  // Initialize the Firebase app
  app = initializeApp(firebaseConfig);
  
  // Initialize services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  // We don't throw the error here to prevent app crashes
  // The app will still load but Firebase features won't work
}

export { auth, db, storage };
export default app;
