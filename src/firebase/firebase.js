// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfSrdahLzg_yJfUCb8VNbgnFJxTU5cRcM",
  authDomain: "micro2-f3a07.firebaseapp.com",
  projectId: "micro2-f3a07",
  storageBucket: "micro2-f3a07.appspot.com",
  messagingSenderId: "294476377212",
  appId: "1:294476377212:web:a9a6c224b1d43c6ac92df9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);

