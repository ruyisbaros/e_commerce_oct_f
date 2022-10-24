import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../assets/logo-main.png";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLoggedFinish, userLoggedStart } from "../redux/loggedUserSlicer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState({ email: "", password: "" });
  const { email, password } = loggedUser;
  const [passType, setPassType] = useState(false);

  const handleInput = (e) => {
    setLoggedUser({ ...loggedUser, [e.target.name]: e.target.value });
  };

  //console.log(loggedUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userLoggedStart());
      const { data } = await axios.post(
        "https://my-ecom-back.herokuapp.com/api/v1/auth/login",
        {
          ...loggedUser,
        }
      );
      //console.log(data);
      localStorage.setItem("token", data[0]);
      localStorage.setItem("currentUser", JSON.stringify(data[1]));
      /* toast.success("You are in"); */
      dispatch(userLoggedFinish());
      navigate("/");
      window.location.reload();
    } catch (error) {
      dispatch(userLoggedFinish());
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setLoggedUser({ ...loggedUser, email: "", password: "" });
  };

  return (
    <div className="login">
      <div className="login_sorround">
        <img src={logoImg} alt="" className="login_img" />
        <form onSubmit={handleSubmit} className="login_form">
          <h2>Sign in</h2>
          <input
            required
            name="email"
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={handleInput}
          />
          <div className="pass_box">
            <input
              name="password"
              required
              type={passType ? "text" : "password"}
              placeholder="Type your password"
              value={password}
              onChange={handleInput}
            />
            <small
              style={{ color: passType ? "red" : "teal" }}
              onClick={() => setPassType(!passType)}
            >
              {passType ? "Hide" : "Show"}
            </small>
          </div>
          <div className="login_form_btns">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
          <div className="oauth_login_btns">
            <button className="btn google_btn">
              <AiOutlineGoogle size={20} /> Login With Google
            </button>
            {/*  <button className="btn facebbok_btn">
              <FaFacebookF size={20} />
              Login With Facebook
            </button> */}
          </div>
          <div className="forgot_password">
            <Link to="/forgot_password" className="link_class">
              <p className="forgot">Forgot Password?</p>
            </Link>
          </div>
        </form>
        <div className="forward_register">
          <div className="forward_register_line">
            <div className="forward_line"></div>
            <div className="forward_text">New to e-Commerce</div>
            <div className="forward_line"></div>
          </div>
          <Link to="/register" className="link_class">
            <button className="btn btn-secondary btn-create">
              Create an Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
