import React from "react";
import "../styles/PostDetails.css";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  console.log(id);

  return <div>PostDetails</div>;
};

export default PostDetails;
