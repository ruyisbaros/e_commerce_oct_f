import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../assets/logo-main.png";
import { BsImageFill } from "react-icons/bs";
import loadingGif from "../assets/loading.gif";
import defaultImage from "../assets/default-user.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  userLoggedFinish,
  userLoggedStart,
  userLoggedSucces,
} from "../redux/loggedUserSlicer";

import { AiOutlineGoogle } from "react-icons/ai";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpUser, setSignUpUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
    imageId: "pw4gq42vstslcyqzi81o",
    roles: ["User"],
  });
  const { firstName, lastName, imageId, email, confPassword, password, roles } =
    signUpUser;
  const [passType, setPassType] = useState(false);
  const [confPassType, setConfPassType] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleInput = (e) => {
    setSignUpUser({ ...signUpUser, [e.target.name]: e.target.value });
  };

  console.log(signUpUser);

  //Profile image settings start
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const [selectedImageId, setSelectedImageId] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setIsCreated(true);

    if (!file) return alert("Please select an image");
    if (file.size > 1024 * 1024 * 1) {
      alert("Your file is too large (max 1mb allowed)");
      setSelectedFile("");
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Only jpeg, jpg or PNG images are allowed");
      setSelectedFile("");
      return;
    }

    try {
      setSelectedFile(file);
      let formData = new FormData();
      formData.append("multipartFile", file);

      const { data } = await axios.post(
        "https://my-ecom-back.herokuapp.com/api/v1/images/upload",
        formData
      );
      setIsCreated(false);
      console.log(data);
      setSelectedImageId(data.imageId);
      setSignUpUser({ ...signUpUser, imageId: data.imageId });
    } catch (error) {
      setIsCreated(false);
      toast.error(error.response.data.message);
    }
  };

  const deleteImage = async () => {
    setSelectedFile("");
    const { data } = await axios.delete(
      `https://my-ecom-back.herokuapp.com/api/v1/images/delete/${selectedImageId}`
      /* { headers: { Authorization: `Bearer ${token}` } } */
    );
    setSignUpUser({ ...signUpUser, imageId: "pw4gq42vstslcyqzi81o" });
    //console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confPassword === password) {
      try {
        dispatch(userLoggedStart());
        const { data } = await axios.post(
          "https://my-ecom-back.herokuapp.com/api/v1/auth/register",
          {
            firstName,
            lastName,
            imageId,
            email,
            password,
            roles,
          }
        );
        console.log(data);
        dispatch(userLoggedFinish());
        dispatch(
          userLoggedSucces({
            email: data[0].email,
            firstName: data[0].firstName,
            profileImage: data[0].image.imageUrl,
            token: data[1],
          })
        );
        localStorage.setItem("token", data[1]);

        localStorage.setItem("currentUser", JSON.stringify(data[0]));
        /* toast.success("Welcome to e-commer page"); */
        navigate("/");
        window.location.reload();
      } catch (error) {
        dispatch(userLoggedFinish());
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

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
            name="firstName"
            type="text"
            placeholder="Your first name"
            value={firstName}
            onChange={handleInput}
          />
          <input
            required
            name="lastName"
            type="text"
            placeholder="Your last Name"
            value={lastName}
            onChange={handleInput}
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={handleInput}
          />
          <div className="pass_box">
            <input
              name="password"
              required
              type={passType ? "text" : "password"}
              placeholder="Your password"
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
          <div className="conf_pass_box">
            <input
              name="confPassword"
              required
              type={confPassType ? "text" : "password"}
              placeholder="Re Type your password"
              value={confPassword}
              onChange={handleInput}
            />
            <small
              style={{ color: confPassType ? "red" : "teal" }}
              onClick={() => setConfPassType(!confPassType)}
            >
              {confPassType ? "Hide" : "Show"}
            </small>
          </div>
          <div className="upload_image">
            <label htmlFor="imageUpload">
              <p>Profile image:</p>
              {isCreated ? (
                <img
                  className="loading_gif"
                  src={loadingGif}
                  alt="profile avatar"
                />
              ) : (
                <img
                  className="uploaded_image"
                  src={preview ? preview : defaultImage}
                  alt="profile avatar"
                />
              )}
            </label>
            {preview && (
              <span onClick={deleteImage} className="delete_image">
                X
              </span>
            )}
            <input
              id="imageUpload"
              type="file"
              maxLength={1024 * 1024}
              accept="image/png/* , image/jpeg/*"
              //value={newUser.photos}
              onChange={handleImageUpload}
            />
          </div>
          <div className="register_form_btns">
            <button type="submit" className="btn btn-primary">
              Sign Up
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
              <AiOutlineGoogle size={20} /> Register With Google
            </button>
            {/*  <button className="btn facebbok_btn">
              <FaFacebookF size={20} />
              Login With Facebook
            </button> */}
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
