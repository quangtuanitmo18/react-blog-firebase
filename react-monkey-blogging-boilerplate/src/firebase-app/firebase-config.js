import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN86KOH751pMcRW2Op2yO6gwuYdUkFnUM",
  authDomain: "monkey-blogging-6de2c.firebaseapp.com",
  projectId: "monkey-blogging-6de2c",
  storageBucket: "monkey-blogging-6de2c.appspot.com",
  messagingSenderId: "168611733253",
  appId: "1:168611733253:web:0668cb5f587baf9c11216c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
