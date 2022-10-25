import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadingFail, loadingFinish, loadingStart } from "../redux/loadSlicer";
import Product from "./Product";

const Products = ({ currentUser, token }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

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
  }, []);
  return (
    <div className="products_main">
      {token && currentUser?.roles.map((r) => r.roleName).includes("Admin") && (
        <div className="action_btns">
          <button style={{ background: "teal" }} className="btn btn-primary">
            <Link to="/admin/products/add" className="link_class">
              Create New Product
            </Link>
          </button>
        </div>
      )}
      <div className="product_main_sorround">
        {products?.map((p) => (
          <Product currentUser={currentUser} token={token} key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
};

export default Products;
