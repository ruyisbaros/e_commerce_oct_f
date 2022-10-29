import axios from "axios";
import React, { useRef, useState } from "react";
import { BiEuro } from "react-icons/bi";
import { BsCart4, BsForwardFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemToBasket } from "../redux/cartBoxSlicer";
import { loadingFinish, loadingStart } from "../redux/loadSlicer";

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
  setAddedBanner,
  displayRef,
}) => {
  //console.log(productImages);
  const dispatch = useDispatch();

  const { cartBox } = useSelector((store) => store.cartBox);

  const [cartItem, setCartItem] = useState({
    quantity: 1,
    userId: currentUser.id,
    productId: id,
  });

  const { quantity, userId, productId } = cartItem;

  const addItemTocart = async () => {
    if (token) {
      try {
        dispatch(loadingStart());
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
        dispatch(addItemToBasket(data));
        dispatch(loadingFinish());
        setAddedBanner(true);
        displayRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } catch (error) {
        toast.error(error.response.data.message);
        dispatch(loadingFinish());
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
      {cartBox?.find((item) => item.product.id === id) ? (
        <Link to="/cart_box">
          <div className="go_basket">
            <span>
              <BsForwardFill />
            </span>
            Go to Cart
          </div>
        </Link>
      ) : (
        <div className="add_basket" onClick={addItemTocart}>
          <span>
            <BsCart4 />
          </span>
          Add to Cart
        </div>
      )}
    </div>
  );
};

export default HomeSingleProduct;
