import React from "react";
import moment from "moment";
import Rating from "./Rating";
import { BiEuro } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeItemFromBasket } from "../redux/cartBoxSlicer";

/* <span>{moment(post.createdDate).fromNow()}</span> */

const ShopCartItem = ({
  id,
  quantity,
  createdDate,
  appUser,
  product,
  token,
}) => {
  const dispatch = useDispatch();

  const removeItem = async () => {
    try {
      const { data } = await axios.delete(
        `https://my-ecom-back.herokuapp.com/api/v1/carts/user/delete_one/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      dispatch(removeItemFromBasket(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="shop_cart_items">
      <div className="shop_cart_items-left">
        <Link to={`/product/view/${product.id}`}>
          <img src={product.productImages[0].imageUrl} alt="" />
        </Link>
      </div>
      <div className="shop_cart_items-right">
        <span>
          <p>Added:</p>
          {moment(createdDate).fromNow()}
        </span>
        <div className="category">
          <p className="category_title">Category:</p>
          <span>{product.category.categoryName}</span>
        </div>
        <div className="description">
          <p className="description_title">{product.productName}</p>
          <span>{product.description}</span>
        </div>
        <div className="cart_item-rating">
          <Rating
            rating={product?.rate / product?.rate_times}
            numReviews={product?.rate_times}
          />
        </div>
        <div className="cart_item-price">
          <BiEuro size={15} />
          <span>{product.price}</span>
        </div>
      </div>
      <button onClick={removeItem} className="shop_cart_items-remove">
        Remove
      </button>
    </div>
  );
};

export default ShopCartItem;
