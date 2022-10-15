import React from "react";
import logoImg from "../assets/logo-main.png";
const Login = () => {
  return (
    <div className="login">
      <div className="login_sorround">
        <img src={logoImg} alt="" className="login_img" />
        <form className="login_form">
          <input type="email" placeholder="Type your email" />
          <input type="password" placeholder="Type your password" />
          <button className="btn btn-primary">Sign In</button>
          <button className="btn btn-danger">Cancel</button>
        </form>
        <div className="forward_register">
          <div className="forward_register_line">
            <div className="forward_left"></div>
            <div className="forward_text">New to e-Commerce</div>
            <div className="forward_right"></div>
          </div>
          <button className="btn">Create an Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
