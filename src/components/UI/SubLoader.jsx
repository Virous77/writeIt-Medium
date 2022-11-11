import React from "react";
import "./Loader.css";
import { BiLoaderCircle } from "react-icons/bi";

const SubLoader = () => {
  return (
    <div className="Subloader">
      <BiLoaderCircle className="loaderIcon" />
    </div>
  );
};

export default SubLoader;
