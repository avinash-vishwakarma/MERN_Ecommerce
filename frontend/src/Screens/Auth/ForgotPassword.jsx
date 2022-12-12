import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/slice/auth-slice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.length < 3) {
      // show error
      return;
    }

    try {
      const response = await axios.post("/api/forgot-password", {
        email,
      });
      if (response.data.user_id) {
        dispatch(
          authActions.setUser({
            _id: response.data.user_id,
            email,
          })
        );
        dispatch(authActions.setOtp(true));
        navigate("/confrim-otp");
      }
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  return (
    <>
      <div className="login-back-button">
        <a href="page-login.html">
          <i className="bi bi-arrow-left-short"></i>
        </a>
      </div>

      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="img/bg-img/37.png" alt="" />
          </div>

          <div className="register-form mt-4">
            <form onSubmit={resetSubmitHandler}>
              <div className="form-group text-start mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
