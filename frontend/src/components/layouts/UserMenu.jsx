import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        User Dashboard
      </h4>
      <div className="space-y-3">
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `block w-full px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/order"
          className={({ isActive }) =>
            `block w-full px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
