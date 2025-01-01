import React from "react";
import Layouts from "./../../components/layouts/Layouts";
import AdminMenu from "../../components/layouts/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layouts>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Admin Dashboard
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-700">
                    Admin Name
                  </h3>
                  <p className="text-lg text-gray-500">{auth?.user?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-700">
                    Admin Email
                  </h3>
                  <p className="text-lg text-gray-500">{auth?.user?.email}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-700">
                    Admin Contact
                  </h3>
                  <p className="text-lg text-gray-500">{auth?.user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default AdminDashboard;
