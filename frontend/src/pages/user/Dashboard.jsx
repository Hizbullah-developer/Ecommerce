import React from "react";
import Layouts from "../../components/layouts/Layouts";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layouts>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* User Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                User Information
              </h1>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-600">
                    User Name:
                  </span>
                  <span className="text-lg text-gray-800">
                    {auth?.user?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-600">
                    User Email:
                  </span>
                  <span className="text-lg text-gray-800">
                    {auth?.user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-600">
                    User Contact:
                  </span>
                  <span className="text-lg text-gray-800">
                    {auth?.user?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Dashboard;
