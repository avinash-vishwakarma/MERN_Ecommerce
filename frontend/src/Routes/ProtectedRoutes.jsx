import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import PageNotFound from "../Screens/PageNotFound";

const ProtectedRoutes = ({ isAuth = true }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return isLogin === isAuth ? <Outlet /> : <PageNotFound />;
};

export default ProtectedRoutes;
