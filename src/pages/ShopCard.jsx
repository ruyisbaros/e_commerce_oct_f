import React from "react";
import { useSelector } from "react-redux";

const ShopCard = ({ token, currentUser }) => {
  const { cartBox } = useSelector((store) => store.cartBox);

  console.log(cartBox, currentUser);

  return (
    <div className="shop_cart_main">
      <div className="shop_cart-sorround">
        <div className="shop_cart-left">
          <h2>{currentUser.firstName}, Welcome to your Cart page</h2>
        </div>
        <div className="shop_cart-right">Right</div>
      </div>
    </div>
  );
};

export default ShopCard;
