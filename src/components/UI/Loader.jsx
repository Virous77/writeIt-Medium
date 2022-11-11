import React from "react";
import "./Loader.css";
import { BiLoaderCircle } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="loader">
      <BiLoaderCircle className="loaderIcon" />
    </div>
  );
};

export default Loader;
