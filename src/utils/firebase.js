// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-tut-next13.firebaseapp.com",
  projectId: "blog-tut-next13",
  storageBucket: "blog-tut-next13.appspot.com",
  messagingSenderId: "415565667659",
  appId: "1:415565667659:web:bbe3e1e769b6aaf8d69cce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)