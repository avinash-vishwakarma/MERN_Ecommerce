import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const LoginSubmitHandler = (e) => {
    e.preventDefault();
    // get all the value and send to the backend

    if (
      emailInput &&
      emailInput.includes("@") &&
      passwordInput &&
      passwordInput.length >= 4
    ) {
      axios.post("");
    }
  };

  return (
    <>
      <div className="login-back-button">
        <a>
          <i className="bi bi-arrow-left-short"></i>
        </a>
      </div>

      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="img/bg-img/36.png" alt="" />
          </div>

          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">Login to kharidar</h6>

            <form onSubmit={LoginSubmitHandler}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div className="form-group position-relative">
                <input
                  className="form-control"
                  id="psw-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <div
                  className="position-absolute"
                  id="password-visibility"
                  onClick={setShowPassword.bind(null, (old) => !old)}
                >
                  <i className="bi bi-eye"></i>
                </div>
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Sign In
              </button>
            </form>
          </div>

          <div className="login-meta-data text-center">
            <a className="stretched-link forgot-password d-block mt-3 mb-1">
              Forgot Password?
            </a>
            <p className="mb-0">
              Didn't have an account?{" "}
              <a className="stretched-link">Register Now</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
