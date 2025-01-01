import React, { useState } from "react";
import Layouts from "../../components/layouts/Layouts";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layouts title={"login - Ecommerce App"}>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-[calc(100vh-130px)] flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Login Form
            </h1>

            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Enter your Email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md text-lg hover:scale-105 transition-all"
            >
              Log in
            </button>

            {/* Forgot Password Button */}
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 rounded-md text-lg hover:scale-105 transition-all"
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>
    </Layouts>
  );
};

export default Login;
