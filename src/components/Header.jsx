import React, { useEffect, useState } from "react";
import logoImg from "../assets/logo-main-cr.png";
import { AiOutlineSearch, AiOutlineCaretDown } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ token }) => {
  const { cartBox } = useSelector((store) => store.cartBox);
  console.log(cartBox);
  const navigate = useNavigate();
  const [isNavSeen, setIsNavSeen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [logoutShow, setLogoutShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setLoggedInUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
    window.location.reload();
    setLogoutShow(false);
  };

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
              <AiOutlineSearch size={20} />
            </div>
          </div>
        </div>

        <div className="shop-card">
          {token && (
            <>
              <Link to="/cart_box" className="link_class">
                <FiShoppingCart size={30} />
              </Link>
              <span>{cartBox.length}</span>
            </>
          )}
        </div>

        {token ? (
          <div className="logged_user_info">
            <img
              src={loggedInUser.image.imageUrl}
              alt=""
              className="logged_user_img"
            />
            <span>{loggedInUser.firstName}</span>
            <span
              onClick={() => setLogoutShow(!logoutShow)}
              className="down_icon"
            >
              <AiOutlineCaretDown />
            </span>
            {logoutShow && (
              <span onClick={handleLogout} className="logout_action">
                Logout
              </span>
            )}
          </div>
        ) : (
          <div className="auth-box">
            <Link to="/login" className="link_class">
              Sign In
            </Link>
            <Link to="/register" className="link_class">
              Sign Up
            </Link>
          </div>
        )}
        <div className="hamburger" onClick={() => setIsNavSeen(!isNavSeen)}>
          {isNavSeen ? (
            <FaTimes size={20} style={{ color: "white" }} />
          ) : (
            <FaBars size={20} style={{ color: "white" }} />
          )}
        </div>
      </div>
      <div className={isNavSeen ? "header_down active" : "header_down"}>
        <ul className="down_list">
          <li>
            <Link to="/developing" className="link_class">
              Best Sellers
            </Link>
          </li>
          <li>
            <Link to="/developing" className="link_class">
              Sale
            </Link>
          </li>
          <li>
            <Link to="/developing" className="link_class">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/developing" className="link_class">
              Careers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
