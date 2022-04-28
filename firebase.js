// firebase.utils.js
import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.APIFirebase,
  authDomain: "tokkuai.firebaseapp.com",
  projectId: "tokkuai",
  storageBucket: "tokkuai.appspot.com",
  messagingSenderId: "472655829189",
  appId: process.env.AppIDFirebase,
  measurementId: "G-78P2ERF9M7",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
