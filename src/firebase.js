// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// 파이어스토어에 접근할수 있게해주는 ID 등등 - 로그인해야지 준다
const firebaseConfig = {
  apiKey: "AIzaSyAivwwB2h9AkHTlwDo24kMbmVfooHEPtN8",
  authDomain: "malllogin-3905e.firebaseapp.com",
  projectId: "malllogin-3905e",
  storageBucket: "malllogin-3905e.appspot.com",
  messagingSenderId: "842399528895",
  appId: "1:842399528895:web:76f85a47ac478f5b9c530a",
  measurementId: "G-VE2LG990XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { app, db }