import React from "react";
import Layouts from "../components/layouts/Layouts";

const About = () => {
  return (
    <Layouts title={"About us - Ecommerce App"}>
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-[calc(100vh-130px)] flex flex-col items-center justify-center px-6 py-12">
        {/* About Section */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          {/* About Image */}
          <div className="flex items-center justify-center">
            <img
              src="/images/about.jpeg"
              alt="About Us"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
            />
          </div>

          {/* About Info */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">
              About Us
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis qui, earum fuga, minus suscipit error deserunt porro
              rerum mollitia, atque necessitatibus illo dolor officiis accusamus
              commodi explicabo nostrum quisquam nisi rem ad! Aut, tenetur
              laboriosam nulla eveniet asperiores totam fugiat.
            </p>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default About;
