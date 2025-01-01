import React, { useState } from "react";
import Layouts from "../../components/layouts/Layouts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layouts title={"forgot-password - Ecommerce App"}>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-[calc(100vh-130px)] flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Forgot Password
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

            {/* Security Answer Input */}
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="What is your favorite color"
                required
              />
            </div>

            {/* New Password Input */}
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="New Password"
                required
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md text-lg hover:scale-105 transition-all"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layouts>
  );
};

export default ForgotPassword;
