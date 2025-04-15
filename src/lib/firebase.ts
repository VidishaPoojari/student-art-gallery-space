
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration (using mock values for development)
const firebaseConfig = {
  apiKey: "AIzaSyDummyApiKeyForDevelopmentOnly",
  authDomain: "example.firebaseapp.com",
  projectId: "example-project-id",
  storageBucket: "example.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
