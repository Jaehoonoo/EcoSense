// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWG--ZC7gnpcUUkZBTDAMjF-PoD_A4JiA",
  authDomain: "ecosense-812aa.firebaseapp.com",
  projectId: "ecosense-812aa",
  storageBucket: "ecosense-812aa.appspot.com",
  messagingSenderId: "604449824730",
  appId: "1:604449824730:web:4df705a64af4c1a2f8aae3",
  measurementId: "G-V9K5QKHSJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);