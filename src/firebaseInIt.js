// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQyBWCZlFmXpqQH9UFN7tc78Jgm-3eRDM",
  authDomain: "photofolioapplication.firebaseapp.com",
  projectId: "photofolioapplication",
  storageBucket: "photofolioapplication.appspot.com",
  messagingSenderId: "580829680276",
  appId: "1:580829680276:web:918e80785f02b45f685a81",
  measurementId: "G-43MSZ03YVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};