import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadingFail, loadingFinish, loadingStart } from "../redux/loadSlicer";
import Rating from "./Rating";
import { BiEuro } from "react-icons/bi";

const ProductView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const [singleProduct, setSingleProduct] = useState(null);
  const [bigImageIndex, setBigImageIndex] = useState(null);

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

  const [bigImage, setBigImage] = useState("");
  useEffect(() => {
    setBigImage(singleProduct?.productImages[bigImageIndex]?.imageUrl);
  }, [bigImageIndex, id, singleProduct?.productImages]);
  //console.log(bigImage);

  return (
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
        <Rating
          rating={singleProduct?.rate}
          numReviews={singleProduct?.rate_times}
        />
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
      <div className="product_review-right">right</div>
    </div>
  );
};

export default ProductView;
