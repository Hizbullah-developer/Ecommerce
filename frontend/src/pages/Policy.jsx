import React from "react";
import Layouts from "../components/layouts/Layouts";

const Policy = () => {
  return (
    <Layouts title={"Privacy Policy - Ecommerce App"}>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-[calc(100vh-130px)] flex flex-col items-center justify-center px-6 py-12">
        {/* Privacy Policy Section */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          {/* Policy Image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/contactus.jpeg"
              alt="Privacy Policy"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
            />
          </div>

          {/* Policy Information */}
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">Add Privacy Policy 1</p>
            <p className="text-gray-600 text-lg">Add Privacy Policy 2</p>
            <p className="text-gray-600 text-lg">Add Privacy Policy 3</p>
            <p className="text-gray-600 text-lg">Add Privacy Policy 4</p>
            <p className="text-gray-600 text-lg">Add Privacy Policy 5</p>
            <p className="text-gray-600 text-lg">Add Privacy Policy 6</p>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Policy;
