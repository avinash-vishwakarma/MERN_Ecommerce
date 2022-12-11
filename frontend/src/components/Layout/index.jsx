import React from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="page-content-wrapper">
        <div className="pt-3"></div>
        <div className="container">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
