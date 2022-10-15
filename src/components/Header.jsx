import React from "react";
import logoImg from "../assets/logo-main-cr.png";
import { AiOutlineSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header_up">
        <div className="logo">
          <Link to="/" className="link_class">
            <img className="logo_img" src={logoImg} alt="logo" />
          </Link>
        </div>
        <div className="adress">
          <GrLocation className="gr_icon" />
          <div className="adress_text">
            <p className="hello1">Hello</p>
            <p className="hello2">Select your address</p>
          </div>
        </div>
        <div className="search-box">
          <div className="search-contents">
            <input type="text" />
            <div className="search-contents-icon">
              <AiOutlineSearch />
            </div>
          </div>
        </div>
        <div className="shop-card">
          <FiShoppingCart />
          <span>2</span>
        </div>
        <div className="auth-box">
          <Link to="/login" className="link_class">
            Sign In
          </Link>
        </div>
      </div>
      <div className="header_down"></div>
    </div>
  );
};

export default Header;
