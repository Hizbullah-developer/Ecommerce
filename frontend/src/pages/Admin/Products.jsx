import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layouts from "../../components/layouts/Layouts";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //   lifecycle Methods
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layouts title={"update-product"}>
      <div className="bg-gray-50 py-8">
        <div className="row m-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              All Products List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/update-product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 m-3">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top w-full h-40 object-cover"
                      alt={p.name}
                    />
                    <div className="card-body p-4">
                      <h5 className="card-title text-lg font-semibold text-gray-700">
                        {p.name}
                      </h5>
                      <p className="card-text text-gray-600 text-sm mt-2">
                        {p.description.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Products;
