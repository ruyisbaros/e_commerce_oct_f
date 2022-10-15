import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../assets/logo-main.png";

const Register = () => {
  const [signUpUser, setSignUpUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    imageId: "pw4gq42vstslcyqzi81o",
    roles: ["User"],
  });
  const { firstName, lastName, imageId, email, password } = signUpUser;
  const [passType, setPassType] = useState(false);

  const handleInput = (e) => {
    setSignUpUser({ ...signUpUser, [e.target.name]: e.target.value });
  };

  console.log(signUpUser);

  const handleSubmit = async (e) => {};

  const handleCancel = () => {
    setSignUpUser({ ...signUpUser, email: "", password: "" });
  };

  return (
    <div className="register">
      <div className="register_sorround">
        <img src={logoImg} alt="" className="register_img" />
        <form onSubmit={handleSubmit} className="register_form">
          <h2>Sign up</h2>
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
          <div className="register_form_btns">
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
        </form>
        <div className="forward_register">
          <div className="forward_register_line">
            <div className="forward_line"></div>
            <div className="forward_text">Already have e-Commerce account</div>
            <div className="forward_line"></div>
          </div>
          <Link to="/login" className="link_class">
            <button className="btn btn-primary btn-create">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
