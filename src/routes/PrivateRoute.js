import React from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
