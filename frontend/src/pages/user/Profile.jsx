import React, { useEffect, useState } from "react";
import Layouts from "../../components/layouts/Layouts";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, setAddress] = useState("");

  // form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //get user data
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    SetPhone(phone);
    setAddress(address);
  }, []);

  return (
    <Layouts title={"Dashboard - Your Profile"}>
      <div className="container mx-auto py-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User Menu */}
          <div className="md:w-1/4">
            <UserMenu />
          </div>

          {/* Update Profile Form */}
          <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">
              Update Profile
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
                  placeholder="Enter your Email"
                  disabled
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => SetPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Address"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Profile;
