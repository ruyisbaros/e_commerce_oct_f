import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShopCartItem from "../components/ShopCartItem";
import { BiEuro } from "react-icons/bi";

const ShopCard = ({ token, currentUser }) => {
  const { cartBox } = useSelector((store) => store.cartBox);
  const [total, setTotal] = useState(0);

  console.log(cartBox, currentUser);

  useEffect(() => {
    setTotal(cartBox.reduce((a, b) => a + b.product.price * b.quantity, 0));
  }, [cartBox]);

  return (
    <div className="shop_cart_main">
      <h2 className="shop_cart_main-title">
        {currentUser.firstName}, Welcome to Your Shopping Cart
      </h2>
      <p className="item_count">{cartBox.length} Item(s) in Cart</p>
      <div className="shop_cart-sorround">
        <div className="shop_cart-left">
          {cartBox?.map((cart, index) => (
            <ShopCartItem token={token} key={cart.id} {...cart} />
          ))}
        </div>
        <div className="shop_cart-right">
          <div className="shop_cart-right-summary">
            <h2>Summary</h2>
            <div className="shop_cart-right-price">
              <div className="shop_cart-right-price1">
                <p>Original Price:</p>
                <p>
                  <BiEuro />
                  {total}
                </p>
              </div>
              <div className="shop_cart-right-price2">
                <p>Credits applied:</p>
                <p>
                  <BiEuro /> 0.0
                </p>
              </div>
            </div>
            <div className="shop_cart-right-payment">
              <div className="shop_cart-right-total">
                <p className="right-total-text">Total:</p>
                <p className="right-total-value">
                  {" "}
                  <BiEuro />
                  {total}
                </p>
              </div>
              <div className="shop_cart-right-credits">
                <p className="right-credits-text">Credits Left:</p>
                <p className="right-credits-value">
                  <BiEuro /> 0.0
                </p>
              </div>
              <button className="shop_cart-right-checkout">Checkout</button>
            </div>
            <div className="shop_cart-right-promotions">
              <p className="promotions">Promotions:</p>
              <div className="shop_cart-right-promotions-cupon">
                <input type="text" placeholder="Enter Cupon ID" />
                <button className="shop_cart-right-apply">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
