import React from "react";
import Layouts from "../components/layouts/Layouts";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layouts title={"Search Resulrs"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
              <div className="card m-3" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> Rs {p.price}</p>
                  <button className="btn btn-primary ms-1">DETAILS</button>
                  <button className="btn btn-secondary ms-2">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Search;
