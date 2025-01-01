import React from "react";
import Layouts from "../components/layouts/Layouts";
import { LuMailSearch } from "react-icons/lu";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <Layouts title={"Contact Us - Ecommerce App"}>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-[calc(100vh-130px)] flex flex-col items-center justify-center px-6 py-12">
        {/* Contact Section */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          {/* Contact Image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">
              Contact Us
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Any query and info about the product? Feel free to call anytime,
              we're available 24/7.
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <LuMailSearch className="text-blue-500" />
              <span>Ecommerce@gmail.com</span>
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <FiPhoneCall className="text-green-500" />
              <span>123-456-7890</span>
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />
              <span>987-654-3210</span>
            </p>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Contact;
