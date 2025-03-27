// src/firebase.js or src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvveYko3j3iQWx-okRJ_eiShKuwkwBw5U",
  authDomain: "bookndrive-c2184.firebaseapp.com",
  projectId: "bookndrive-c2184",
  storageBucket: "bookndrive-c2184.firebasestorage.app",
  messagingSenderId: "278520086216",
  appId: "1:278520086216:web:43443ce1fc425560eb6ffd",
  measurementId: "G-4MYK0N9W9K"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

export { app, auth };