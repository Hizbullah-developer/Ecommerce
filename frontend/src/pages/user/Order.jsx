import React, { useEffect, useState } from "react";
import Layouts from "../../components/layouts/Layouts";
import UserMenu from "../../components/layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layouts title={"Dashboard - Your Order"}>
      <div className="container mx-auto py-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User Menu */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <UserMenu />
          </div>

          {/* Orders Section */}
          <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              All Orders
            </h1>
            {orders?.map((o, i) => {
              return (
                <div
                  className="mb-6 border border-gray-300 rounded-lg shadow-lg p-4"
                  key={i}
                >
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Buyer</th>
                        <th className="py-2 px-4 border-b">Payment</th>
                        <th className="py-2 px-4 border-b">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4">{o?.status}</td>
                        <td className="py-2 px-4">
                          {moment(o?.createdAt).fromNow()}
                        </td>
                        <td className="py-2 px-4">{o?.buyer?.name}</td>
                        <td className="py-2 px-4">
                          {o?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td className="py-2 px-4">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Product Details Section */}
                  <div className="container mt-4">
                    <div>
                      {o?.products?.map((p) => (
                        <div
                          className="flex flex-row mb-4 p-3 border rounded-lg shadow-sm bg-gray-50"
                          key={p._id}
                        >
                          <div className="w-1/4">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="object-cover w-full h-32 rounded-md"
                              alt={p.name}
                            />
                          </div>
                          <div className="w-3/4 pl-4">
                            <p className="font-semibold text-lg">{p.name}</p>
                            <p className="text-sm text-gray-600">
                              {p.description.substring(0, 15)}...
                            </p>
                            <p className="font-medium text-blue-600 mt-2">
                              Price: ${p.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Order;
