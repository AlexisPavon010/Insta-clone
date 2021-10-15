// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp2KctIC9B2FVRJq_BpSyu3DfXNX7uI_s",
  authDomain: "insta-clone-ed877.firebaseapp.com",
  projectId: "insta-clone-ed877",
  storageBucket: "insta-clone-ed877.appspot.com",
  messagingSenderId: "690080028258",
  appId: "1:690080028258:web:f230c8894e9dc5c8c8233b"
};

// Initialize Firebase
const app = !getApps().length
? initializeApp(firebaseConfig)
: getApp();

const db = getFirestore()
const storage = getStorage()


export {app, db, storage };