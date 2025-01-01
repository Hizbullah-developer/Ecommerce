import React from "react";
import Layouts from "../components/layouts/Layouts";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layouts title={"All Categories"}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">
          All Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((c) => (
            <div
              key={c._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-800 mb-2">
                  {c.name}
                </h2>
                <Link
                  to={`/category/${c.slug}`}
                  className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
};

export default Categories;
