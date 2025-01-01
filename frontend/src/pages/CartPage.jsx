import React, { useEffect, useState } from "react";
import Layouts from "../components/layouts/Layouts";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("PKR", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          cart,
          nonce,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment Complete Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layouts>
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          {/* Greeting Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-lg text-gray-600">
              {cart?.length
                ? `You have ${cart.length} item(s) in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>

          {/* Cart Items and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart?.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center bg-white shadow-md rounded-lg p-4"
                >
                  <div className="w-1/3">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="rounded-lg w-full"
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    <h5 className="text-lg font-bold text-gray-800">
                      {p.name}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {p.description.substring(0, 15)}...
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Price: Rs {p.price}
                    </p>
                    <button
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Cart Summary
              </h2>
              <p className="text-gray-600 mb-2">Total | Checkout | Payment</p>
              <hr className="mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Total: Rs {totalPrice()}
              </h4>

              {auth?.user?.address ? (
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Current Address
                  </h4>
                  <p className="text-gray-600">{auth?.user?.address}</p>
                  <button
                    className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-4">
                  {auth?.token ? (
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              )}

              <div className="mt-4">
                {!clientToken || !cart?.length ? null : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                      onClick={handlePayment}
                      disabled={!loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CartPage;
