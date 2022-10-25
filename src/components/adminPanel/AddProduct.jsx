import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loadingImg from "../../assets/loading.gif";

const AddProduct = ({ token }) => {
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    rate: "",
    categoryName: "",
    productImages: [],
  });
  const {
    productName,
    description,
    price,
    quantity,
    rate,
    categoryName,
    productImages,
  } = newProduct;
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeImg, setActiveImg] = useState(images[index]);

  //console.log('target', targetOfUpdatePost);
  //console.log(images);
  useEffect(() => {
    setActiveImg(images[index]);
  }, [index, images]);
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

  const handleInput = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  //Profile image settings start
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const [selectedImageId, setSelectedImageId] = useState("");

  let newImages = [];
  const imageUpload = async (dt) => {
    const { data } = await axios.post(
      "https://my-ecom-back.herokuapp.com/api/v1/images/upload",
      dt /* {
          headers: { "content-type": "multipart/form-data", authorization: token }
      } */
    );
    //console.log(data);
    newImages.push(data);
    setImages([...images, ...newImages]);
  };
  useEffect(() => {
    setNewProduct({
      ...newProduct,
      productImages: images.map((i) => i.imageId),
    });
  }, [images]);
  console.log(newProduct);
  //console.log(images);
  //console.log(images);

  const handleImages = async (e) => {
    const files = [...e.target.files];

    //console.log(files);

    await files.forEach((file) => {
      if (!file) return alert("Please select an image");
      if (file.size > 1024 * 1024 * 5)
        return alert("Your file is too large (max 1mb allowed)");
      if (
        file.type !== "image/jpeg" &&
        file.type !== "video/mp4" &&
        file.type !== "image/png"
      )
        return alert("Only jpeg, jpg or PNG images are allowed");
      let formData = new FormData();
      formData.append("multipartFile", file);
      imageUpload(formData);
    });
  };

  const deleteImage = async () => {
    setSelectedFile("");
    const { data } = await axios.delete(
      `https://my-ecom-back.herokuapp.com/api/v1/images/delete/${selectedImageId}`
      /* { headers: { Authorization: `Bearer ${token}` } } */
    );
    setNewProduct({ ...newProduct, imageId: "frnuturkacwbwlwh00bs" });
    //console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://my-ecom-back.herokuapp.com/api/v1/products/admin/create",
        {
          ...newProduct,
        }
        /* { headers: { Authorization: `Bearer ${token}` } } */
      );
      console.log(data);
      navigate("/products");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="add_product">
      <div className="add_product_sorround">
        <h2 className="text-center my-3">Create a New Product</h2>
        <form onSubmit={handleSubmit} className="add_product_form">
          <input
            type="text"
            placeholder="Product Name"
            required
            name="productName"
            value={productName}
            onChange={handleInput}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            required
            cols="51"
            rows="5"
            value={description}
            onChange={handleInput}
          ></textarea>
          <input
            type="text"
            placeholder="Product Price"
            required
            name="price"
            value={price}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Product Quantity"
            required
            name="quantity"
            value={quantity}
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Product Rate"
            required
            name="rate"
            value={rate}
            onChange={handleInput}
          />
          <div className="cats_contents">
            {categories?.map((cat) => (
              <div key={cat.id} className="cats">
                <label htmlFor="categoryName">{cat.categoryName}</label>
                <input
                  value={cat.categoryName}
                  type="radio"
                  name="categoryName"
                  onChange={handleInput}
                />
              </div>
            ))}
          </div>
          <div className="show_images">
            <div className="input_images">
              <div className="file_upload">
                <i className="fas fa-image"></i>
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleImages}
                />
              </div>
            </div>
            <div className="show_images_box">
              {isCreated && (
                <img
                  src={loadingImg}
                  alt="loading"
                  className="d-block mx-auto"
                />
              )}
              <div className="sml_img_box">
                {images.map((img, i) => (
                  <div
                    key={i}
                    id="file_img"
                    className={index === i ? "file_img active_img" : "file_img"}
                  >
                    <img
                      src={img?.imageUrl}
                      alt="images"
                      onClick={() =>
                        setIndex(i)
                      } /* className={i = index && "active_img"} */
                    />
                    <span onClick={() => deleteImage(i)} className="times">
                      &times;
                    </span>
                  </div>
                ))}
                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi est quos recusandae dolorum facere enim eaque, quasi modi voluptatibus possimus. */}
              </div>
              {images.length > 0 && (
                <div className="img_big_box">
                  <img src={activeImg?.imageUrl} alt="" />
                </div>
              )}
            </div>
          </div>
          <div className="product_submit">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
