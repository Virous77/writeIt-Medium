import React from "react";
import { useUserAuthContext } from "../store/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useUserAuthContext();
  if (!user.isLoggedIn) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
