import React, { useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import "./LoginAndSignup.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { URLUsersRequests } from "../../config";

const Welcome = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    arrayOfFilters,
    setArrayOfFilters,
    handleFiltersGET,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [isContainerActive, setIsContainerActive] = useState(false);

  const handleSignUpButton = () => {
    setIsContainerActive(true);
  };
  const handleSignInButton = () => {
    setIsContainerActive(false);
  };

  const [userName, setUserName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     console.log(currentUser)
  //     setLoggedInUser(currentUser);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;
      const userObj = {
        user_uid: user.uid,
        email: user.email,
      };
      await addNewUser(userObj);
      // await handleUsersDbPOST(auth.currentUser);
      
      // setLoggedInUser(auth.currentUser);
      updateProfile(auth.currentUser, {
        displayName: userName,
      });
      toast.success(`Registered successfully! Please sign in.`);
      setTimeout(() => {
        setIsContainerActive(false);
      }, 2000);
    } catch (error) {
      console.log(error.message);
      toast.error("Can't register. Check your email or password.");
    }
  };

  // should be put in the api/service file
  async function addNewUser(userObj) {
    try {
      const res = await axios.post(`${URLUsersRequests}/users`, userObj);

    } catch (error) {
      console.log(error);
    }
  }
  // should be put in the api/service file
  async function getUser(user_uid) {
    try {
      const res = await axios.get(`${URLUsersRequests}/users/${user_uid}`);

      return res.data[0].is_verified;
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      const isVerified = await getUser(user.uid);
      if (isVerified) {
        setLoggedInUser(user);
        navigate("../", { replace: true });
      } else { 
        setLoggedInUser(null);
        toast.error("Can't login. Ask for the permission first!");
      }
    } catch (error) {
      toast.error("Wrong email or password.");
    }
  };

  const handleUsersDbPOST = async (user) => {
    console.log("ARRIVED YAAS");
    let axiosDataBody = {
      uid: user.uid,
      email: user.email,
      filters_saves: "",
    };
    // axiosDataBody = JSON.parse(axiosDataBody);
    console.log(axiosDataBody);
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:8000/users",
        axiosDataBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
    } catch (error) {
      console.error("Oh no!", error);
    }
  };

  return (
    <>
      <div id="welcomePageBody">
        <div id="goBackHome">
          <a href="/">&#8592; Home</a>
        </div>
        <ToastContainer autoClose={2000} position="top-center" />
        <div
          className={`welcomeContainer${
            isContainerActive ? " right-panel-active" : ""
          }`}
        >
          <div className="form-container sign-up-container">
            <div className="welcomeForm">
              <h1 id="welcomeH1">Create new Account</h1>
              {/* <div className="social-container">
              <a href="#" className="social">
                <i className="bi bi-google"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span id="welcomeSpan">or use your email for registration</span> */}
              <input
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                className="welcomeInput"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                className="welcomeInput"
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
                className="welcomeInput"
                required
              />
              <button
                onClick={(e) => handleRegister(e)}
                className="welcomeButton"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <div className="welcomeForm">
              <h1 id="welcomeH1">Sign in</h1>
              {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span id="welcomeSpan">or use your account</span> */}
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
                className="welcomeInput"
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
                className="welcomeInput"
                required
              />
              <a href="./forgot-password" id="welcomeA">
                Forgot your password?
              </a>
              <button
                type="submit"
                onClick={handleLogin}
                className="welcomeButton"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 id="welcomeH1">Welcome Back!</h1>
                <p id="welcomeP">Pick up where you left off</p>
                <button id="signInGhost" onClick={handleSignInButton}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 id="welcomeH1">Nice to meet you!</h1>
                <p id="welcomeP">
                  Sign up to find out what guides your AI’s predictions and make
                  smarter decisions
                </p>
                <button id="signUpGhost" onClick={handleSignUpButton}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
