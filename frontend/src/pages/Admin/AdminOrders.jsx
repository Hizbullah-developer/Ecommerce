import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layouts from "../../components/layouts/Layouts";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //handle status change
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth//order-status/${orderId}`,
        { status: value }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layouts title={"All Orders Data"}>
      <div className="bg-gray-50 py-8">
        <div className="row mt-2">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              All Orders
            </h1>
            {orders?.map((o, i) => {
              return (
                <div
                  className="border shadow-lg mb-6 rounded-lg p-4 bg-white"
                  key={i}
                >
                  <table className="table w-full text-gray-700">
                    <thead>
                      <tr className="border-b text-sm font-medium text-gray-700">
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Buyer</th>
                        <th className="py-2 px-4">Payment</th>
                        <th className="py-2 px-4">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b text-sm text-gray-600">
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4">
                          <Select
                            variant={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => {
                              return (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              );
                            })}
                          </Select>
                        </td>
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
                  <div className="container">
                    {o?.products?.map((p) => (
                      <div
                        className="row card mb-4 p-3 flex-row rounded-lg shadow-md bg-gray-50"
                        key={p._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top w-full h-32 object-cover rounded-lg"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-8 p-3">
                          <p className="font-semibold text-gray-800">
                            Name: {p.name}
                          </p>
                          <p className="text-gray-600">
                            Description: {p.description.substring(0, 15)}...
                          </p>
                          <p className="text-gray-800 font-semibold">
                            Price: Rs {p.price}
                          </p>
                        </div>
                      </div>
                    ))}
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

export default AdminOrders;
