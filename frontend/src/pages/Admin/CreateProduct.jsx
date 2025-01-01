import React, { useEffect, useState } from "react";
import Layouts from "../../components/layouts/Layouts";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setPhoto("");
        setCategory("");
        setShipping("");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wents wrong");
    }
  };
  return (
    <Layouts title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Create Product
              </h2>

              <div className="w-75 mx-auto">
                {/* Category Select */}
                <Select
                  variant={false}
                  size="large"
                  showSearch
                  placeholder="Select a category"
                  className="form-select mb-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(value) => setCategory(value)}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                {/* Photo Upload */}
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12 w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700">
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

                {/* Display Photo */}
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product photo"
                        height={"200px"}
                        className="img img-responsive rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Product name"
                    className="form-control p-3 border rounded-md w-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Product Description */}
                <div className="mb-3">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product description"
                    className="form-control p-3 border rounded-md w-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Price"
                    className="form-control p-3 border rounded-md w-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* Quantity */}
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Quantity"
                    className="form-control p-3 border rounded-md w-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Shipping */}
                <div className="mb-3">
                  <Select
                    variant={false}
                    size="large"
                    showSearch
                    placeholder="Select Shipping"
                    className="form-select mb-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                {/* Create Product Button */}
                <div className="mb-3 text-center">
                  <button
                    className="btn btn-primary px-5 py-2 rounded-lg shadow-md hover:bg-blue-600"
                    onClick={handleCreate}
                  >
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateProduct;
