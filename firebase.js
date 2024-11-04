import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "edwin-7f418.firebaseapp.com",
    projectId: "edwin-7f418",
    storageBucket: "edwin-7f418.firebasestorage.app",
    messagingSenderId: "988612538218",
    appId: "1:988612538218:web:df3746c50a328487707f13",
    measurementId: "G-LMSXY988LM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const storage = getStorage();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
