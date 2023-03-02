// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkMvrz2DNiMTbbtPG4e7VnlUBm2tVy7co",
  authDomain: "fir-e-shop-e8cdd.firebaseapp.com",
  projectId: "fir-e-shop-e8cdd",
  storageBucket: "fir-e-shop-e8cdd.appspot.com",
  messagingSenderId: "993784839410",
  appId: "1:993784839410:web:ca8f05821a610b958ea46b",
  measurementId: "G-57XTJ5WSFC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
auth.setPersistence(browserLocalPersistence);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
if (typeof window !== "undefined") {
  if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    // connectFunctionsEmulator(functions,'localhost',5001);
  }
}
