import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Category from "./Category";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/categories/all");
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
        <button className="btn btn-primary">
          <Link to="/admin/categories/add" className="link_class">
            Create Category
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
