import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDR8oPidJfmuqkkqDD20PBlz2UgPJSJg2A",
  authDomain: "ecotatva-efa31.firebaseapp.com",
  projectId: "ecotatva-efa31",
  storageBucket: "ecotatva-efa31.firebasestorage.app",
  messagingSenderId: "946743225357",
  appId: "1:946743225357:web:f1d5026533686d1bf97944",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();