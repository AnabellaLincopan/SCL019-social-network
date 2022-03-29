/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
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
  Timestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "./firebase-init.js";

import { firebaseConfig } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// registro con email y contraseña (Registro de usuarios nuevos)
export const registerUser = (userName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      user.displayName = userName;
      emailVerificationRegister();
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
    });
  return createUserWithEmailAndPassword;
};

const emailVerificationRegister = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
  });
};

// login con google
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      userFromGoogle();
      window.location.hash = "#/wall";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// se guarda el perfil de usuario de google
export const userFromGoogle = async () => {
  const user = auth.currentUser;
  const userName = user.displayName;
  if (user !== null) {
    const docRefGoogle = await addDoc(collection(db, "userFromGoogle"), {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
    });
  }
};

// para conocer el estado de autenticación del usuario
export const activeUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

// login
export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      if (user.emailVerified === true) {
        window.location.hash = "#/wall";
      } else {
        alert("Please verify your email for login");
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

// log out
export const logOut = () => {
  signOut(auth)
    .then(() => {
      window.location.hash = "#/";
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

// -------------------------FIRESTORE----------------------------

// Conectamos con nuestra Base de datos
export const db = getFirestore();

// Guardamos los datos en Firestore
export const saveTask = async (description) => {
  const date = Timestamp.fromDate(new Date());
  let userName;
  if (auth.currentUser.displayName === null) {
    const newName = auth.currentUser.email.split("@");
    userName = newName[0];
  } else {
    userName = auth.currentUser.displayName;
  }

  const profile = await addDoc(collection(db, "usuarios"), {
    description,
    date,
    userId: auth.currentUser.uid,
    name: userName,
    likes: [],
    likesCounter: 0,
  });
  return profile;
};

// Mostrar los datos guardados
export const getTasks = getDocs(collection(db, "usuarios"));

export const onGetTasks = query(
  collection(db, "usuarios"),
  orderBy("date", "desc"),
);

export const deleteTask = (id) => deleteDoc(doc(db, "usuarios", id));

export const getTaskEdit = (id) => getDoc(doc(db, "usuarios", id));

export const likePost = async (id, userId) => {
  const postRef = doc(db, "usuarios", id);
  const docLike = await getDoc(postRef);
  const dataLike = docLike.data();
  // console.log(dataLike);
  const likesCount = dataLike.likesCounter;

  if ((dataLike.likes).includes(userId)) {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
      likesCounter: likesCount - 1,
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
      likesCounter: likesCount + 1,
    });
  }
};
export const updateTask = (id, newDescription) => updateDoc(doc(db, "usuarios", id), {
  description: newDescription,
});
