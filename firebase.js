// firebase.utils.js
import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBj4wYsuqNlrOIqg-_f6gPP8_FaK3r79zk",
  authDomain: "tokkuai.firebaseapp.com",
  projectId: "tokkuai",
  storageBucket: "tokkuai.appspot.com",
  messagingSenderId: "472655829189",
  appId: "1:472655829189:web:81f8aabf3a4769dd20f8ac",
  measurementId: "G-78P2ERF9M7",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
