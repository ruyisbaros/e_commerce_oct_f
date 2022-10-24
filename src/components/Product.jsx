import React, { useState } from "react";

import Rating from "./Rating";
import { BiEuro } from "react-icons/bi";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Product = ({
  id,
  category,
  description,
  price,
  rate,
  rate_times,
  productName,
  productImages,
  currentUser,
  token,
}) => {
  const [actionShow, setActionShow] = useState(false);

  const deleteHandle = async () => {
    try {
      await axios.delete(
        `https://my-ecom-back.herokuapp.com/api/v1/products/admin/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="single_product">
      {token && currentUser?.roles.map((r) => r.roleName).includes("Admin") && (
        <span
          onClick={() => setActionShow(!actionShow)}
          className="more_action"
        >
          {<AiOutlineMore size={20} />}
        </span>
      )}
      <div className="product_img">
        <img src={productImages[0].imageUrl} alt="" />
      </div>
      <div className="product_info">
        <p className="product_name">{productName}</p>
        <p className="product_desc">{description}</p>
        <Rating rating={rate} numReviews={rate_times} />
        <div className="deal">
          <p className="perc">%10 off</p>
          <p className="deal_text">Deal</p>
        </div>
        <h3 className="price_info">
          <span className="euro">
            <BiEuro />
          </span>
          {price}
          <span className="zero">00</span>
        </h3>
        <p className="delivery">Delivery Info</p>
      </div>
      {actionShow && (
        <div className="action_box">
          <Link to={`/admin/products/update/${id}`} className="link_class">
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

export default Product;
