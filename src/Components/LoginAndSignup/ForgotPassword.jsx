import React from "react";
import "./LoginAndSignup.css";
import { auth } from "../../firebase-config";

const ForgotPassword = () => {
  const handleResetPassword = (email) => {
    return auth.sendResetPasswordEmail(email);
  };

  return (
    <div id="welcomePageBody">
      <div className="forgotPasswordForm">
        <h1 id="welcomeH1">Password reset</h1>
        <input type="email" placeholder="Email" className="welcomeInput" />{" "}
        <button className="welcomeButton">Reset password</button>
        <a href="./login-signup" id="welcomeA">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
