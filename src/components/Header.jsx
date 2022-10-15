import React from "react";
import logoImg from "../assets/logo-commerce.png";
import { AiOutlineSearch } from "react-icons/ai";
const Header = () => {
  return (
    <div className="header">
      <div className="header_up">
        <div className="logo">
          <img className="logo_img" src={logoImg} alt="logo" />
        </div>
        <div className="adress">
          <AiOutlineSearch />
          <div className="adress_text">
            <p>Hello</p>
            <p>Select your address</p>
          </div>
        </div>
        <div className="adress"></div>
        <div className="adress"></div>
        <div className="adress"></div>
      </div>
      <div className="header_down"></div>
    </div>
  );
};

export default Header;
