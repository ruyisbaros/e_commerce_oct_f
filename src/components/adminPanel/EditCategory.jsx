import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import catDefault from "../../assets/cat-default.png";
import loadingGif from "../../assets/loading.gif";

const EditCategory = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);
  const [updatedCategory, setupdatedCategory] = useState({
    categoryName: "",
    description: "",
    imageId: "frnuturkacwbwlwh00bs",
  });
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/categories/get_by_id/${id}`);
      console.log(data);
      setupdatedCategory({
        ...updatedCategory,
        categoryName: data.categoryName,
        description: data.description,
        imageId: data.image.imageId,
      });
      setPreview(data.image.imageUrl);
      setSelectedImageId(data.image.imageId);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const { categoryName, description, imageId } = updatedCategory;
  const handleInput = (e) => {
    setupdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value });
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

      const { data } = await axios.post("/api/v1/images/upload", formData);
      setIsCreated(false);
      console.log(data);
      setSelectedImageId(data.imageId);
      setupdatedCategory({ ...updatedCategory, imageId: data.imageId });
    } catch (error) {
      setIsCreated(false);
      toast.error(error.response.data.message);
    }
  };

  const deleteImage = async () => {
    setSelectedFile("");
    const { data } = await axios.delete(
      `/api/v1/images/delete/${selectedImageId}`
      /* { headers: { Authorization: `Bearer ${token}` } } */
    );
    setupdatedCategory({
      ...setupdatedCategory,
      imageId: "frnuturkacwbwlwh00bs",
    });
    //console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/categories/admin/update/${id}`,
        {
          categoryName,
          description,
          imageId,
        }
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
        <h2 className="text-center">You can edit selected category</h2>
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
            {preview && selectedFile && (
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
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
