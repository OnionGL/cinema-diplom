
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAz8o3XJ4mDv-1Rja03iOZh7mQjVwa-zS8",
  authDomain: "cinema-app-18cbc.firebaseapp.com",
  projectId: "cinema-app-18cbc",
  storageBucket: "cinema-app-18cbc.appspot.com",
  messagingSenderId: "97970121085",
  appId: "1:97970121085:web:c426b00b92f7dc8c2e0414",
  measurementId: "G-1T7PT45RKJ"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)