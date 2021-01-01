import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJHUXHm2q7jMOk-ecp9itzQS_wrtKKuac",
  authDomain: "dott-285e2.firebaseapp.com",
  projectId: "dott-285e2",
  storageBucket: "dott-285e2.appspot.com",
  messagingSenderId: "893562735175",
  appId: "1:893562735175:web:c8edd381ae9464f2d27f62",
  measurementId: "G-2LRBY7MGPZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

<<<<<<< HEAD
export default firebaseApp;
=======
export default firebaseApp
>>>>>>> 93d2c113cdef991c8b59810f5a959a76d9daf269
