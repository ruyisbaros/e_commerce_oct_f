import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineMore } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Category = ({ id, categoryName, description, image }) => {
  const navigate = useNavigate();
  const [actionShow, setActionShow] = useState(false);

  const deleteHandle = async () => {
    try {
      await axios.delete(
        `https://my-ecom-back.herokuapp.com/api/v1/categories/admin/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="single_category">
      <span onClick={() => setActionShow(!actionShow)} className="more_action">
        {<AiOutlineMore size={20} />}
      </span>
      <h2 className="text-center">{categoryName}</h2>
      <img src={image.imageUrl} alt="" />
      <h4 className="text-center">{description}</h4>
      <Link to="/admin/sub_products" className="link_class">
        <button className="btn btn-primary sub_go">Sub Products</button>
      </Link>
      {actionShow && (
        <div className="action_box">
          <Link to={`/admin/categories/update/${id}`} className="link_class">
            <p className="edit text-center">Edit</p>
          </Link>
          <p onClick={deleteHandle} className="delete text-center">
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;
