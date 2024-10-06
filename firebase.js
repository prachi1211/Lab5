// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7wwzrDnnTApTHbs9FWKZmfzJUSq2AViE",
  authDomain: "second-project-1c3de.firebaseapp.com",
  projectId: "second-project-1c3de",
  storageBucket: "second-project-1c3de.appspot.com",
  messagingSenderId: "711651525026",
  appId: "1:711651525026:web:c6646206299f0ec2cdb2fb",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Export the auth object and any functions you need
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
};
