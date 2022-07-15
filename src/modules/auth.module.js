import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Modal } from "./modal.module";

const firebaseConfig = {
  apiKey: "AIzaSyDGbR7vzUuZ7gIGr0pRVRjM5x-E8nqsWkQ",
  authDomain: "giz-trainings.firebaseapp.com",
  databaseURL:
    "https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "giz-trainings",
  storageBucket: "giz-trainings.appspot.com",
  messagingSenderId: "884621856070",
  appId: "1:884621856070:web:79ea366573e50834222947",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export class Auth {
  static signin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Modal.service(true, "You logged in succesfully");
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Modal.service(false, errorMessage);
      });
  }

  static checkStatus() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in: ", user.displayName);
      } else {
        window.location.href = "/signin.html";
      }
    });
  }

  static getUser() {
    return auth.currentUser;
  }

  static updateUser() {
    updateProfile(auth.currentUser, {
      displayName: "Teacher",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        Modal.service(true, "Profile successfully updated");
      })
      .catch((error) => {
        Modal.service(false, "Something went wrong");
      });
  }

  static signout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.href = "/signin.html";
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
