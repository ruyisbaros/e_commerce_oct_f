import axios from "axios";
import React, { useState } from "react";
import { BiEuro } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  //console.log(productImages);
  const { cartBox } = useSelector((store) => store.cartBox);
  const [addedCart, setAddedCart] = useState(false);
  const [cartItem, setCartItem] = useState({
    quantity: 1,
    userId: currentUser.id,
    productId: id,
  });

  const { quantity, userId, productId } = cartItem;

  const addItemTocart = async () => {
    if (token) {
      try {
        const { data } = await axios.post(
          "https://my-ecom-back.herokuapp.com/api/v1/carts/user/create",
          { quantity, userId, productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("You should logged in");
    }
  };
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
        <div className="go_basket" onClick={addItemTocart}>
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
