// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKaWgu3X1F4K5sXvVvdkqSc80HQZibIe0",
  authDomain: "cmanager-c6062.firebaseapp.com",
  projectId: "cmanager-c6062",
  storageBucket: "cmanager-c6062.appspot.com",
  messagingSenderId: "24331168586",
  appId: "1:24331168586:web:26795f1629229a173d2fb3",
  measurementId: "G-LMCKTQ0GPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)