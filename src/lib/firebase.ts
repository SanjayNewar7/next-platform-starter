// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD3T1R4464yDJaX4gSldr9A-BOX9dLUdJY",
  authDomain: "merosathi-7213c.firebaseapp.com",
  projectId: "merosathi-7213c",
  storageBucket: "merosathi-7213c.appspot.com",
  messagingSenderId: "267389955706",
  appId: "1:267389955706:web:33c078afb16a80680015c3",
  measurementId: "G-ZHYFCFQLXG"
};

// IMPORTANT: The configuration above is hardcoded for now to get you unblocked.
// For security, you should move these keys to a `.env.local` file and use `process.env.NEXT_PUBLIC_...` to read them.
// Do not commit this file with keys to a public repository.

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
