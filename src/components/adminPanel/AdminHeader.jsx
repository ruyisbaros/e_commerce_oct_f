import React, { useState } from "react";
import logoImg from "../../assets/logo-main-cr.png";
import { AiOutlineSearch, AiOutlineCaretDown } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = ({ token }) => {
  const navigate = useNavigate();
  const [logoutShow, setLogoutShow] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const { id, email, firstName, image } = loggedInUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.reload();
    setLogoutShow(false);
    navigate("/");
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
        <div className="admin_dash">
          <h3>Admin Control Panel</h3>
        </div>

        {token ? (
          <div className="logged_user_info">
            <img src={image.imageUrl} alt="" className="logged_user_img" />
            <span>{firstName}</span>
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
      </div>
      <div className="header_down">
        <ul className="down_list">
          <Link to="/admin/categories" className="link_class">
            <li>Categories</li>
          </Link>
          <Link to="/admin/products" className="link_class">
            <li>Products</li>
          </Link>
          {/*  <li>Discounts</li>
          <li>Categories</li>
          <li>Customer Service</li>
          <li>Careers</li> */}
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
