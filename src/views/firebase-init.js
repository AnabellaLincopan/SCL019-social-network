// eslint-disable-next-line import/no-unresolved
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendEmailVerification,
// eslint-disable-next-line import/no-unresolved
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// eslint-disable-next-line import/no-unresolved
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
// import { collection, addDoc } from "firebase/firestore";

export {
  initializeApp,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendEmailVerification,
  getFirestore,
  collection,
  getDocs,
  addDoc,
};
