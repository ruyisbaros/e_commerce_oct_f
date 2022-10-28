import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadingFail, loadingFinish, loadingStart } from "../redux/loadSlicer";
import Rating from "../components/Rating";
import Rate from "../components/Rate";
import { BiEuro } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import image2 from "../assets/b2.jpg";

const ProductView = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [singleProduct, setSingleProduct] = useState(null);
  const [bigImageIndex, setBigImageIndex] = useState(null);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [ratingBoxSeen, setRatingBoxSeen] = useState(false);

  useEffect(() => {
    setBigImageIndex(0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(loadingStart());
        const { data } = await axios.get(
          `https://my-ecom-back.herokuapp.com/api/v1/products/user/one/${id}`
        );
        setSingleProduct(data);
        dispatch(loadingFinish());
      } catch (error) {
        toast.error(error.response.data.message);
        dispatch(loadingFail());
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  console.log(singleProduct);
  //console.log(ratingValue);

  const [bigImage, setBigImage] = useState("");
  useEffect(() => {
    setBigImage(singleProduct?.productImages[bigImageIndex]?.imageUrl);
  }, [bigImageIndex, id, singleProduct?.productImages]);
  //console.log(bigImage);

  //console.log(ratingValue);
  //let rate;
  const handleRating = async (i) => {
    try {
      dispatch(loadingStart());
      const { data } = await axios.put(
        `https://my-ecom-back.herokuapp.com/api/v1/products/user/update/rate/${id}?rate=${
          i + 1
        }`,
        null /* ,
        { headers: { Authorization: `Bearer ${token}` } } */
      );
      console.log(data);
      dispatch(loadingFinish());
      setRatingBoxSeen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(loadingFinish());
    }
  };

  return (
    <div className="product_review_container">
      <div className="product_review_container-banner">
        <img src={image2} alt="" />
      </div>
      <div className="product_review">
        <div className="product_review-left">
          <div className="product_review-left-1">
            {singleProduct?.productImages?.map((img, i) => (
              <div
                key={img.id}
                className={
                  bigImageIndex === i ? "images-box active" : "images-box"
                }
              >
                <img
                  onClick={() => setBigImageIndex(i)}
                  src={img.imageUrl}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="product_review-left-2">
            <img src={bigImage} alt="" />
          </div>
        </div>
        <div className="product_review-center">
          <p className="product_review-center-cat">
            Category: {singleProduct?.category.categoryName}
          </p>

          <h3>{singleProduct?.productName}</h3>
          <h4 className="product-description">{singleProduct?.description}</h4>
          <div className="rating_actions">
            <Rating
              rating={singleProduct?.rate / singleProduct?.rate_times}
              numReviews={singleProduct?.rate_times}
            />
            <div className="rating_box_review">
              <h5 className="rate_product_title">
                Rate Product{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setRatingBoxSeen(!ratingBoxSeen)}
                >
                  <AiOutlineDown size={15} />
                </span>
              </h5>
              {ratingBoxSeen && (
                <div className="rate_the_product">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map(
                    (val, index) => (
                      <div
                        key={index}
                        onClick={() => handleRating(index)}
                        className="rate_value"
                      >
                        <span>{index + 1} stars</span>
                        <Rate rating={index + 1} />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="deal">
            <p className="perc">%10 off</p>
            <p className="deal_text">Deal</p>
          </div>
          <h3 className="price_info">
            <span className="euro">
              <BiEuro />
            </span>
            {singleProduct?.price}
            <span className="zero">00</span>
          </h3>
        </div>
        <div className="product_review-right">
          <h3 className="price_info">
            <span className="euro">
              <BiEuro />
            </span>
            {singleProduct?.price}
            <span className="zero">00</span>
          </h3>
          <p className="free">Free Returns</p>
          <p className="free down">
            Free Delivery{" "}
            <span>
              {new Date().getDate() + 3}/{new Date().getMonth()}/
              {new Date().getFullYear()}
            </span>
          </p>
          <p className="card-text">
            Or fastest delivery: {new Date().getDate() + 1}/
            {new Date().getMonth()}/{new Date().getFullYear()}
          </p>
          {singleProduct?.quantity > 0 ? (
            <p className="avaliable">In Stock</p>
          ) : (
            <p className="avaliable-not">Not Avaliable</p>
          )}
          <div className="quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={basketQuantity}
              onChange={(e) => setBasketQuantity(e.target.value)}
            />
            <div className="action_buttons">
              {token ? (
                <Link to="/developing" className="link_class">
                  <button className="add_basket">Add to Basket</button>
                </Link>
              ) : (
                navigate("/login")
              )}
              {token ? (
                <Link to="/developing" className="link_class">
                  <button className="buy_now">Buy Now</button>
                </Link>
              ) : (
                navigate("/login")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
