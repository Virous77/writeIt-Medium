import React from "react";
import { Link } from "react-router-dom";
import "../styles/Error.css";
import found from "../images/found.svg";

const ErrorPage = () => {
  return (
    <section className="errorBar">
      <div className="errorCard">
        <img src={found} alt="Error not found" />
        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
