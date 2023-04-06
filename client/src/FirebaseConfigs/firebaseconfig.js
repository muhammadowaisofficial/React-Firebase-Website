import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBRkdDZtnKM4qBm3-UlOc-IclAa7CTdAE",
  authDomain: "ecommerce-36dcd.firebaseapp.com",
  projectId: "ecommerce-36dcd",
  storageBucket: "ecommerce-36dcd.appspot.com",
  messagingSenderId: "795968386806",
  appId: "1:795968386806:web:2b362fb32b6a2e448c1ed7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
