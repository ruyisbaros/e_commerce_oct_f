import React from "react";

const Category = ({ id, categoryName, description, image }) => {
  return (
    <div className="single_category">
      <h2>{categoryName}</h2>
      <img src={image.imageUrl} alt="" />
      <h4>{description}</h4>
    </div>
  );
};

export default Category;
