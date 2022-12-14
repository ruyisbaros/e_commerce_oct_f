import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadingFail, loadingFinish, loadingStart } from "../redux/loadSlicer";
import Category from "./Category";

const Categories = ({ token }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      dispatch(loadingStart());
      const { data } = await axios.get(
        "https://my-ecom-back.herokuapp.com/api/v1/categories/user/all"
      );
      console.log(data);
      setCategories(data);
      dispatch(loadingFinish());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(loadingFail());
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
          <Category key={cat.id} {...cat} token={token} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
