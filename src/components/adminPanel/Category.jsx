import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineMore } from "react-icons/ai";

const Category = ({ id, categoryName, description, image }) => {
  return (
    <div className="single_category">
      <h2 className="text-center">{categoryName}</h2>
      <img src={image.imageUrl} alt="" />
      <h4 className="text-center">{description}</h4>
      <Link to="/admin/sub_products" className="link_class">
        <button className="btn btn-primary sub_go">Sub Products</button>
      </Link>
    </div>
  );
};

export default Category;
