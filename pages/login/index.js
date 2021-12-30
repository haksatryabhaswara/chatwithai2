import React, { useEffect, useState } from "react";
// import {
//   auth,
//   signInWithEmailAndPassword,
//   signInWithGoogle,
// } from "../../firebase/index";
import Link from "next/link";

import dynamic from "next/dynamic";
const auth = dynamic(() => import("../../firebase/index"));
const signInWithEmailAndPassword = dynamic(() =>
  import("../../firebase/index")
);
const signInWithGoogle = dynamic(() => import("../../firebase/index"));

import { useAuthState } from "react-firebase-hooks/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      alert("GET USER");
      console.log(user);
    }
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link href="/chat">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
