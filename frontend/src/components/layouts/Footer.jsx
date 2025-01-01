import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-2">
      <div className="text-center">
        <h5 className="text-gray-400 text-sm md:text-base">
          All Rights Reserved &copy; Ecommerce Site
        </h5>
      </div>
      <div className="mt-4 text-center">
        <p className="space-x-4 text-sm md:text-base">
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition"
          >
            About |
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white transition"
          >
            Contact Us |
          </Link>

          <Link
            to="/policy"
            className="text-gray-300 hover:text-white transition"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
