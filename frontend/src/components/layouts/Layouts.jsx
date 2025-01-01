import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layouts = ({
  children,
  title = "Ecommerce app - shop now",
  description = "Ecommerce app with MERN",
  keywords = "mern, react, express, mongodb, nodejs, ecommerce , ecommerce app",
  author = "hizbu78@gmail.com",
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "80vh" }}>
        {children}
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default Layouts;
