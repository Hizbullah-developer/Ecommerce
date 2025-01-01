import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h4 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Admin Panel
        </h4>
        <div className="list-group space-y-2">
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-colors"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-colors"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-colors"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-colors"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition-colors"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
