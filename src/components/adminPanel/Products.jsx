import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/all");
      console.log(data);
      setProducts(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="products_main">
      <div className="action_btns">
        <button style={{ background: "teal" }} className="btn btn-primary">
          <Link to="/admin/products/add" className="link_class">
            Create New Product
          </Link>
        </button>
      </div>
      <div className="product_sorround">
        {products?.map((p) => (
          <Product key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
};

export default Products;
