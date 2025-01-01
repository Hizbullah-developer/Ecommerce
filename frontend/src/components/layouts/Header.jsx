import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="w-full">
      <nav className="bg-slate-300 shadow-md w-full">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between px-4 py-4 w-full">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold flex items-center">
            <MdOutlineShoppingCart className="mr-2" /> Ecommerce App
          </Link>
          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <SearchInput />
          </div>
          {/* Navigation Links */}
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link text-gray-700 hover:text-gray-900 ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="relative group">
              <Link
                to="/categories"
                className="nav-link flex items-center text-gray-700 hover:text-gray-900"
              >
                Categories <FaChevronDown className="ml-1 text-sm" />
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md">
                <li>
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    to="/categories"
                  >
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `nav-link text-gray-700 hover:text-gray-900 ${
                        isActive ? "font-bold underline" : ""
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `nav-link text-gray-700 hover:text-gray-900 ${
                        isActive ? "font-bold underline" : ""
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="relative group">
                <NavLink
                  className="nav-link flex items-center text-gray-700 hover:text-gray-900"
                  to="#"
                >
                  {auth?.user?.name} <FaChevronDown className="ml-1 text-sm" />
                </NavLink>
                <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link relative text-gray-700 hover:text-gray-900 ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                Cart
                <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart?.length || 0}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Mobile Layout */}
        <div className="md:hidden w-full">
          {/* Toggle Menu */}
          <div className="flex justify-between items-center p-4">
            <Link to="/" className="text-xl font-semibold flex items-center">
              <MdOutlineShoppingCart className="mr-2" /> Ecommerce App
            </Link>
            <button
              className="text-gray-800 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
          {/* Menu Links */}
          {menuOpen && (
            <ul className="flex flex-col items-start bg-gray-200 w-full px-4 py-2">
              <li>
                <NavLink
                  to="/"
                  className="nav-link text-gray-700 hover:text-gray-900 py-2"
                >
                  Home
                </NavLink>
              </li>
              <li className="relative group">
                <Link
                  to="/categories"
                  className="nav-link flex items-center text-gray-700 hover:text-gray-900 py-2"
                >
                  Categories <FaChevronDown className="ml-1 text-sm" />
                </Link>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="nav-link text-gray-700 hover:text-gray-900 py-2"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="nav-link text-gray-700 hover:text-gray-900 py-2"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="nav-link text-gray-700 hover:text-gray-900 py-2"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="nav-link text-gray-700 hover:text-gray-900 py-2"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/cart"
                  className="nav-link text-gray-700 hover:text-gray-900 py-2"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
