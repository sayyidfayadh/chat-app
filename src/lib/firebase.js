// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-30cbc.firebaseapp.com",
  projectId: "chat-app-30cbc",
  storageBucket: "chat-app-30cbc.appspot.com",
  messagingSenderId: "15409306388",
  appId: "1:15409306388:web:e1c030ae30f55ae9d40001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()