
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfGa3cVo_y0bovpGGcKHYJ_HUFudrLSXY",
  authDomain: "virtual-art-gallery-2cea8.firebaseapp.com",
  projectId: "virtual-art-gallery-2cea8",
  storageBucket: "virtual-art-gallery-2cea8.appspot.com",
  messagingSenderId: "960008182844",
  appId: "1:960008182844:web:2814b06f7bf139316e3739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
