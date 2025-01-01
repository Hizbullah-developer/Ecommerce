import React, { useEffect, useState } from "react";
import Layouts from "../components/layouts/Layouts";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

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
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [!checked.length, !radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      console.log(data);

      setProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts title={"All products - Best offer"}>
      <img
        src="/images/bannerimg.jpg"
        alt="WebSite Image"
        className="w-full h-56 object-cover my-3"
      />

      <div className="bg-gray-50 py-8">
        <div className="flex flex-col lg:flex-row mt-6">
          {/* Filters Section */}
          <div className="lg:w-1/4 px-4 bg-gray-100 rounded-lg shadow-md py-6">
            <div className="mb-8">
              <h5 className="text-lg font-semibold mb-4 text-gray-700">
                Filter By Category
              </h5>
              <div className="flex flex-col space-y-3">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <hr className="border-gray-300" />
            {/* Price Filter */}
            <div className="mt-8">
              <h5 className="text-lg font-semibold mb-4 text-gray-700">
                Filter By Prices
              </h5>
              <div className="flex flex-col space-y-3">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio
                        className="text-gray-600 hover:text-gray-800"
                        value={p.array}
                      >
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 w-full shadow-lg"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4 px-4 mt-6 lg:mt-0">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((p) => (
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
                  key={p._id}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-48 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-700">
                      {p.name}
                    </h5>
                    <p className="text-gray-600 text-sm mt-2">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="text-gray-800 font-bold mt-2">
                      Rs {p.price} PKR
                    </p>
                    <div className="flex items-center space-x-4 mt-4">
                      <button
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md hover:from-blue-400 hover:to-blue-600 shadow-lg"
                        onClick={() => navigate(`/product-details/${p.slug}`)}
                      >
                        DETAILS
                      </button>
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-4 rounded-md hover:from-green-400 hover:to-green-600 shadow-lg"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to Cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              {products && products.length < total && (
                <button
                  className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-400 shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Home;
