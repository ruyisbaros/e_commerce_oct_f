import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import image1 from "../assets/b1.jpg";
import image2 from "../assets/b2.jpg";
import image3 from "../assets/b3.jpg";
import image4 from "../assets/b4.jpg";
import image5 from "../assets/b5.jpg";
import HomeSingleProduct from "../components/HomeSingleProduct";
import { loadingFail, loadingFinish, loadingStart } from "../redux/loadSlicer";
import { GrClose } from "react-icons/gr";

const ClientHome = ({ token, currentUser }) => {
  const dispatch = useDispatch();
  const displayRef = useRef();
  const [addedBanner, setAddedBanner] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const banner_images = [image1, image2, image3, image4, image5];

  const fetchProducts = async () => {
    try {
      dispatch(loadingStart());
      const { data } = await axios.get(
        "https://my-ecom-back.herokuapp.com/api/v1/products/user/all"
      );
      console.log(data);
      setProducts(data);
      dispatch(loadingFinish());
    } catch (error) {
      dispatch(loadingFail());
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="client_home">
      <div className="client_home_banner">
        {banner_images.map((im, index) => (
          <div className={index === currentImg ? "slider active" : "slider"}>
            {index === currentImg && <img src={im} alt="" />}
          </div>
        ))}
        <ul>
          {Array.from({ length: 5 }).map((val, i) => (
            <li
              key={i}
              className={i === currentImg ? "active" : ""}
              onClick={() => setCurrentImg(i)}
            ></li>
          ))}
        </ul>
      </div>
      <div className="client_home_products" ref={displayRef}>
        {products?.map((p) => (
          <HomeSingleProduct
            key={p.id}
            token={token}
            currentUser={currentUser}
            {...p}
            setAddedBanner={setAddedBanner}
            displayRef={displayRef}
          />
        ))}
        {addedBanner && (
          <div className="item_added">
            <div className="item_added_sorround">
              <span onClick={() => setAddedBanner(false)}>
                <GrClose color="crimson" />
              </span>
              <p>Item Has been addded</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientHome;
