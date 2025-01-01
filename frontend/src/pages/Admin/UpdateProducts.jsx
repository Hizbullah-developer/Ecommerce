import React, { useEffect, useState } from "react";
import Layouts from "../../components/layouts/Layouts";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      if (name) productData.append("name", name);
      if (description) productData.append("description", description);
      if (price) productData.append("price", price);
      if (quantity) productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      if (category) productData.append("category", category);
      if (shipping) productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setPhoto("");
        setCategory("");
        setShipping("");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you want to delete ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while delete a product");
    }
  };

  return (
    <Layouts title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3 bg-gray-100 rounded-lg shadow-md">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Update Product
            </h1>
            <div className="m-1 w-full sm:w-3/4 bg-white p-6 rounded-lg shadow-lg">
              <Select
                variant={false}
                size="large"
                showSearch
                placeholder="Select a category"
                className="form-select mb-4 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-4">
                <label className="btn btn-outline-secondary col-md-12 text-center w-full p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-4">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product photo"
                      height={"200px"}
                      className="img img-responsive rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="Product photo"
                      height={"200px"}
                      className="img img-responsive rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control p-3 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <textarea
                  name=""
                  id=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a description"
                  className="form-control p-3 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control p-3 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control p-3 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Select
                  variant={false}
                  size="large"
                  showSearch
                  placeholder="Select Shipping"
                  className="form-select mb-3 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={shipping ? "yes" : "No"}
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-6 flex justify-between">
                <button
                  className="btn btn-primary py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-danger py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default UpdateProducts;
