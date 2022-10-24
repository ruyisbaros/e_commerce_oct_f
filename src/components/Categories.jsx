import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Category from "./Category";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://my-ecom-back.herokuapp.com/api/v1/categories/user/all"
      );
      console.log(data);
      setCategories(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="admin_categories">
      <div className="action_btns">
        <button style={{ background: "teal" }} className="btn btn-primary">
          <Link to="/admin/categories/add" className="link_class">
            Create New Category
          </Link>
        </button>
      </div>
      <div className="category_sorround">
        {categories?.map((cat) => (
          <Category key={cat.id} {...cat} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
