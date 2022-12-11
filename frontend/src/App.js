import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Screens/Auth/Login";
import Home from "./Screens/Home";
import PageNotFound from "./Screens/PageNotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
