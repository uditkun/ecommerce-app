// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGCnskUM00SWrwzNPJkvwDGZN7i0zAKHY",
  authDomain: "e-shop-247c6.firebaseapp.com",
  databaseURL: "https://e-shop-247c6-default-rtdb.firebaseio.com",
  projectId: "e-shop-247c6",
  storageBucket: "e-shop-247c6.appspot.com",
  messagingSenderId: "555224655252",
  appId: "1:555224655252:web:7461b0ce58b7dd633c1b81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
