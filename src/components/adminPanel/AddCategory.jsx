import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import catDefault from "../../assets/cat-default.png";
import loadingGif from "../../assets/loading.gif";

const AddCategory = ({ token }) => {
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "",
    imageId: "frnuturkacwbwlwh00bs",
  });
  const { categoryName, description, imageId } = newCategory;
  const handleInput = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setIsCreated(true);

    if (!file) return alert("Please select an image");
    if (file.size > 1024 * 1024 * 1) {
      alert("Your file is too large (max 1mb allowed)");
      setSelectedFile("");
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Only jpeg, jpg or PNG images are allowed");
      setSelectedFile("");
      return;
    }

    try {
      setSelectedFile(file);
      let formData = new FormData();
      formData.append("multipartFile", file);

      const { data } = await axios.post(
        "https://my-ecom-back.herokuapp.com/api/v1/images/upload",
        formData
      );
      setIsCreated(false);
      console.log(data);
      setSelectedImageId(data.imageId);
      setNewCategory({ ...newCategory, imageId: data.imageId });
    } catch (error) {
      setIsCreated(false);
      toast.error(error.response.data.message);
    }
  };

  const deleteImage = async () => {
    setSelectedFile("");
    const { data } = await axios.delete(
      `https://my-ecom-back.herokuapp.com/api/v1/images/delete/${selectedImageId}`
      /* { headers: { Authorization: `Bearer ${token}` } } */
    );
    setNewCategory({ ...setNewCategory, imageId: "frnuturkacwbwlwh00bs" });
    //console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://my-ecom-back.herokuapp.com/api/v1/categories/admin/create",
        {
          categoryName,
          description,
          imageId,
        }
        /*  { headers: { Authorization: `Bearer ${token}` } } */
      );
      console.log(data);
      navigate("/admin/categories");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="add_category">
      <div className="add_category_sorround">
        <h2 className="text-center">You can create new Categories here</h2>
        <form onSubmit={handleSubmit} className="create_cat_form">
          <input
            type="text"
            placeholder="Category Name"
            name="categoryName"
            required
            value={categoryName}
            onChange={handleInput}
          />
          <input
            type="text"
            name="description"
            placeholder="Category description"
            required
            value={description}
            onChange={handleInput}
          />
          <div className="upload_image">
            <label htmlFor="cat_image">
              <BsCardImage size={30} />
            </label>
            {preview && (
              <span onClick={deleteImage} className="delete_image">
                X
              </span>
            )}
            <input
              type="file"
              id="cat_image"
              maxLength={1024 * 1024}
              accept="image/png/* , image/jpeg/*"
              //value={newUser.photos}
              onChange={handleImageUpload}
            />
            <div className="cat_image">
              {isCreated ? (
                <img
                  className="loading_gif"
                  src={loadingGif}
                  alt="profile avatar"
                />
              ) : (
                <img src={preview ? preview : catDefault} alt="" />
              )}
            </div>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
