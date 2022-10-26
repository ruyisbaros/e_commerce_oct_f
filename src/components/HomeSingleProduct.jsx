import React from "react";
import { BiEuro } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomeSingleProduct = ({
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
  console.log(productImages);
  return (
    <div className="home_single_product">
      <div className="img_box">
        <Link to={`/product/view/${id}`}>
          <img src={productImages[0].imageUrl} alt="" />
        </Link>
      </div>
      <h4 className="product_title ">{productName}</h4>
      <p className="description">{description.slice(0, 100)}...</p>
      <p className="price">
        {price}{" "}
        <span>
          <BiEuro />
        </span>
      </p>
      <Link to={`/add_cart/${id}`}>
        <div className="go_basket">
          <span>
            <BsCart4 />
          </span>
          Add to Cart
        </div>
      </Link>
    </div>
  );
};

export default HomeSingleProduct;
