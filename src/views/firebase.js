/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  // signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import { firebaseConfig } from "./config.js";
import {validateEmailRequire, validateEmailInUse} from "./register.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// registro con email y constraseña
export const registerUser = (userName, email, password) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      user.displayName = userName;
      // console.log(user);
      // ...
     return (user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

     if (errorCode === "auth/invalid-email"){
      validateEmailRequire.style.display = "block";
     };

     if (errorCode === "auth/email-already-in-use"){
      validateEmailInUse.classList.remove(".emailInUse");
      validateEmailInUse.createElement("div");
      validateEmailInUse.className = "showEmailInUse";
     
     }
      //console.log(errorCode, errorMessage);
      // ..

      // console.log(errorCode, errorMessage);
      // ..

    });
    return createUserWithEmailAndPassword
};

// login con google
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // ...
    }).catch((error) => {
      // Handle Errors here.

      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      // ...
    });
};

// para conocer el estado de autenticación del usuario
export const activeUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

