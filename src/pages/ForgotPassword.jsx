import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo-main.png";

const ForgotPassword = () => {
  return (
    <div className="forgot_pwd">
      <div className="forgot_pwd-sorround">
        <div className="forgot_pwd-left">
          <img src={logoImg} alt="" className="left_img" />
        </div>
        <div className="forgot_pwd-right">
          <h3>Forgot Your Password?</h3>
          <p>
            We get it, stuff happens, just enter your email address below and
            we'll send you a link to reset your password!
          </p>
          <form>
            <input type="email" placeholder="Enter your email address" />
            <button>Reset Password</button>
          </form>
          <div className="forgot_pwd-right-etc">
            <Link to="/register" className="link_class already">
              <p>Create an Account</p>
            </Link>
            <Link to="/login" className="link_class already">
              <p>Already have an account? Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
