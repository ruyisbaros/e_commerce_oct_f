import React, { useState } from "react";
import image1 from "../assets/b1.jpg";
import image2 from "../assets/b2.jpg";
import image3 from "../assets/b3.jpg";
import image4 from "../assets/b4.jpg";
import image5 from "../assets/b5.jpg";

const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const banner_images = [image1, image2, image3, image4, image5];
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
              className={i === currentImg ? "active" : ""}
              onClick={() => setCurrentImg(i)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
