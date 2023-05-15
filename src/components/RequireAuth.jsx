import React from "react";
import { useAuth } from "../service/auth";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
