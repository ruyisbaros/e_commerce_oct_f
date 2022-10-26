import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import image1 from "../assets/b1.jpg";
import image2 from "../assets/b2.jpg";
import image3 from "../assets/b3.jpg";
import image4 from "../assets/b4.jpg";
import image5 from "../assets/b5.jpg";
import HomeSingleProduct from "../components/HomeSingleProduct";
import { loadingFail, loadingFinish, loadingStart } from "../redux/loadSlicer";

const ClientHome = ({ token }) => {
  const dispatch = useDispatch();
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
      <div className="client_home_products">
        {products?.map((p) => (
          <HomeSingleProduct key={p.id} token={token} {...p} />
        ))}
      </div>
    </div>
  );
};

export default ClientHome;
