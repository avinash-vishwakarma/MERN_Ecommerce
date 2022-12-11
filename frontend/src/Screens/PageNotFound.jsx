import React from "react";

const PageNotFound = () => {
  return (
    <div className="page-content-wrapper py-3">
      <div className="custom-container">
        <div className="card">
          <div className="card-body px-5 text-center">
            <img className="mb-4" src="img/bg-img/39.png" alt="" />
            <h4>
              OOPS... <br /> Page not found!
            </h4>
            <p className="mb-4">
              We couldn't find any results for your search. Try again.
            </p>
            <a className="btn btn-creative btn-danger" href="page-home.html">
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
