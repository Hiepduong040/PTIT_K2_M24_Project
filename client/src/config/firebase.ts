// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "ptit-f50c2.firebaseapp.com",
  projectId: "ptit-f50c2",
  storageBucket: "ptit-f50c2.appspot.com",
  messagingSenderId: "28735495802",
  appId: "1:28735495802:web:f3b192214526babfe065c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)