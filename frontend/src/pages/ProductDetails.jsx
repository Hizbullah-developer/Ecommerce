import React, { useEffect, useState } from "react";
import Layouts from "../components/layouts/Layouts";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layouts>
      <div className="container mx-auto mt-4 bg-gray-100">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-white shadow-md rounded-lg">
          <div className="flex justify-center items-center">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="rounded-lg w-full max-w-md"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Product Details
            </h1>
            <p className="text-lg font-medium text-gray-700">
              Name: <span className="text-gray-600">{product.name}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Description:{" "}
              <span className="text-gray-600">{product.description}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Category:{" "}
              <span className="text-gray-600">{product.category?.name}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Price: <span className="text-gray-600">Rs {product.price}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Quantity:{" "}
              <span className="text-gray-600">{product.quantity}</span>
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
              ADD TO CART
            </button>
          </div>
        </div>

        <hr className="my-8" />

        {/* Similar Products Section */}
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Similar Products
          </h2>
          {relatedProducts.length < 1 ? (
            <p className="text-center text-gray-600">
              No Similar Product Found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts?.map((p) => (
                <div
                  className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-200"
                  key={p._id}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="text-gray-800 font-bold">Rs {p.price}</p>
                    <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layouts>
  );
};

export default ProductDetails;
