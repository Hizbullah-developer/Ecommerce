import React from "react";
import Layouts from "../components/layouts/Layouts";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Layouts title={"Go Back - Page Not Found"}>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-[calc(100vh-130px)] flex items-center justify-center px-6">
        <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-lg">
          <h1 className="text-7xl font-extrabold text-red-500">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Page Not Found!
          </h2>
          <p className="text-gray-600 mt-2">
            Sorry, the page you are looking for does not exist.
            <br />
            Please click on the Home Page to continue.
          </p>
          <button
            type="button"
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={goHome}
          >
            Home Page
          </button>
        </div>
      </div>
    </Layouts>
  );
};

export default PageNotFound;
