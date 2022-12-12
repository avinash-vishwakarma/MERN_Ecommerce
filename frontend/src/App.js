import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import ChangePassword from "./Screens/Auth/ChangePassword";
import ConfromOtp from "./Screens/Auth/ConfromOtp";
import ForgotPassword from "./Screens/Auth/ForgotPassword";
import Login from "./Screens/Auth/Login";
import Signup from "./Screens/Auth/Signup";
import Home from "./Screens/Home";
import PageNotFound from "./Screens/PageNotFound";
import { authActions } from "./store/slice/auth-slice";

const App = () => {
  // initializin user auth data
  const dispatch = useDispatch();

  const isOtp = useSelector((state) => state.auth.isOtp);
  const isChangePassword = useSelector((state) => state.auth.isChangePassword);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const userInfo = localStorage.getItem("user_info");
    if (userToken && userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(authActions.login(user));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes isAuth={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {isOtp && <Route path="/confrim-otp" element={<ConfromOtp />} />}
        {isChangePassword && (
          <Route path="/change-password" element={<ChangePassword />} />
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
