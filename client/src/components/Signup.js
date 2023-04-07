import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfigs/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import "../components/Signup.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;
        console.log(user);

        addDoc(collection(db, "users"), {
          name: userName,
          email: userEmail,
          phonenumber: userPhone,
          password: userPassword,
          cart: initialcartvalue,
          address: userAddress,
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(
              "Logged in successfully, You will be redirected to login page."
            );
            setUserName("");
            setUserPhone("");
            setUserEmail("");
            setUserPassword("");
            setUserAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please fill all required fields");
        }
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("Email already in use");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p>Create Account</p>

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

          <label>Your Name</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="First Name and Last Name"
          />

          <label>Your Phone Number</label>
          <input
            onChange={(e) => setUserPhone(e.target.value)}
            type="text"
            placeholder="Enter Your Phone Number"
          />

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

          <label>Your Address</label>
          <textarea
            onChange={(e) => setUserAddress(e.target.value)}
            type="text"
            placeholder="Enter Your Address"
          />

          <button type="submit">Sign Up</button>

          <div>
            <span>Already have an account</span>
            <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
