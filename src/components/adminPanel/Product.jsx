import React from "react";

import Rating from "../Rating";
import { BiEuro } from "react-icons/bi";

const Product = ({
  id,
  category,
  description,
  price,
  rate,
  rate_times,
  productName,
  productImages,
}) => {
  return (
    <div className="single_product">
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
    </div>
  );
};

export default Product;
