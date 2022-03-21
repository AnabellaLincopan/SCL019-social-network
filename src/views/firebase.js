/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// import {
//   getAuth,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   sendEmailVerification,
// } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
// // import { collection, addDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  addDoc,
  getDocs,
  collection,
  createUserWithEmailAndPassword,
  getAuth,
  getFirestore,
  initializeApp,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "./firebase-init.js";

import { firebaseConfig } from "./config.js";
// import { validateEmailRequire } from "./register.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// registro con email y contraseña (Registro de usuarios nuevos)
export const registerUser = (userName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      user.displayName = userName;
      // console.log(user);
      // ...

      // eslint-disable-next-line no-use-before-define
      emailVerificationRegister();
      // eslint-disable-next-line no-alert
      alert("Email verification sent!");

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const validateEmailRequire = document.querySelector(".emailRequired");
      const validateEmailInUse = document.querySelector(".emailInUseInvalid");
      if (errorCode === "auth/invalid-email") {
        validateEmailRequire.style.display = "block";
      }
      if (errorCode === "auth/email-already-in-use") {
        validateEmailInUse.style.display = "block";
      } else {
        validateEmailInUse.style.display = "none";
      }
      // console.log(errorCode, errorMessage);

      // ..

      // console.log(errorCode, errorMessage);
      // ..
    });
  return createUserWithEmailAndPassword;
};

const emailVerificationRegister = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    // ...
  });
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
      window.location.hash = "#/wall";

      // ...
    })
    .catch((error) => {
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

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user.emailVerified === true) {
        window.location.hash = "#/wall";
        // console.log(user);
      // ...
      } else {
        alert("Debes verificar tu email para poder ingresar");
        // console.log(user);
      }
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const loginValidateEmail = document.querySelector(".emailLoginEnter");
      const loginUserNotFound = document.querySelector(".userNotFound");
      const loginWrongPassword = document.querySelector(".wrongPassword");
      if (errorCode === "auth/invalid-email") {
        loginValidateEmail.style.display = "block";
      }
      if (errorCode === "auth/user-not-found") {
        loginUserNotFound.style.display = "block";
      } else {
        loginUserNotFound.style.display = "none";
      }
      if (errorCode === "auth/wrong-password") {
        loginWrongPassword.style.display = "block";
      } else {
        loginWrongPassword.style.display = "none";
      }
    });
};

export const logOut = () => {
  signOut(auth).then(() => {
    window.location.hash = "#/";
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
};

// -------------------------FIRESTORE----------------------------

// Conectamos con nuestra Base de datos
export const db = getFirestore();

export const saveTask = (description) => addDoc(collection(db, "usuarios"), { description });

export const getTasks = getDocs(collection(db, "usuarios"));
