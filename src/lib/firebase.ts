
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Default config for development (these are mock values for fallback)
const defaultConfig = {
  apiKey: "AIzaSyDummyApiKeyForDevelopmentOnly",
  authDomain: "example.firebaseapp.com",
  projectId: "example-project-id",
  storageBucket: "example.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Firebase configuration using environment variables with fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || defaultConfig.apiKey,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || defaultConfig.authDomain,
  projectId: import.meta.env.VITE_PROJECT_ID || defaultConfig.projectId,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || defaultConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
  appId: import.meta.env.VITE_APP_ID || defaultConfig.appId,
};

// Add warning for development mode
if (!import.meta.env.VITE_API_KEY) {
  console.warn(
    "Firebase environment variables are not set. Using fallback configuration. " +
    "This is fine for development, but you should set up environment variables for production."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
