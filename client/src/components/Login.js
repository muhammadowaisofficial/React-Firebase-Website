import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../components/Login.css";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setSuccessMsg(
          "New user added successfully, You will be redirected to Home page."
        );
        setUserEmail("");
        setUserPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 4000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please fill all required fields");
        }
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setErrorMsg("Email not Found");
        }
        if (errorCode === "auth/wrong-password") {
          setErrorMsg("Wrong Password");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <p>Sign-in Account</p>

          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}

          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}

          <label>Your Email</label>
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email"
          />

          <label>Your Password</label>
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
            placeholder="Enter Your Password"
          />

          <button type="submit">Sign In</button>

          <div>
            <span>Don't have an account</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
