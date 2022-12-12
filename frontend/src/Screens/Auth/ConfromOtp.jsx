import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/slice/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTimer from "../../hooks/useTimer";

const ConfromOtp = () => {
  const email = useSelector((state) => state.auth.user.email);
  const userId = useSelector((state) => state.auth.user._id);
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showResend, setShowResend] = useState(false);

  const [minutes, seconds, setStartTimer] = useTimer(2, 60, () => {
    setShowResend(true);
  });

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/confirm-otp", {
        otp,
        user_id: userId,
      });
      dipatch(authActions.setOtp(false));
      if (response.data.changepassword) {
        dipatch(authActions.setChangePassword(true));
        navigate("/change-password", {
          replace: true,
        });
        return;
      }

      if (response.data.validated) {
        navigate("/", {
          replace: true,
        });
        return;
      }
    } catch (error) {
      alert(error.response.error.message);
    }
  };

  const ResendOtpHandler = async () => {
    try {
      const response = await axios.post("/api/resend-otp", {
        user_id: userId,
      });
      if (response.data.send) {
        setStartTimer((old) => !old);
        setShowResend(false);
      }
    } catch (error) {
      console.log(error.response.error.message);
    }
  };

  return (
    <>
      <div className="login-back-button">
        <a href="page-otp.html">
          <i className="bi bi-arrow-left-short"></i>
        </a>
      </div>

      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center">
            <img
              className="mx-auto mb-4 d-block"
              src="img/bg-img/38.png"
              alt=""
            />
            <h3>Verify Email address</h3>
            <p className="mb-4">
              Enter the OTP code sent to <strong>{email}</strong>
            </p>
          </div>

          <div className="otp-verify-form mt-4">
            <form onSubmit={otpSubmitHandler}>
              <div className="input-group mb-3">
                <input
                  className="form-control w-100 align-center"
                  type="text"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={(e) => {
                    setIsDisabled(e.target.value.length !== 4);
                    setOtp(e.target.value);
                  }}
                />
              </div>
              <button className="btn btn-primary w-100" disabled={isDisabled}>
                Verify &amp; Proceed
              </button>
            </form>
          </div>

          <div className="login-meta-data text-center">
            {!showResend && (
              <p className="mt-3 mb-0">
                Don't received the OTP? resend after{" "}
                <span className="otp-sec" id="resendOTP">
                  {minutes} : {seconds}
                </span>
              </p>
            )}

            {showResend && (
              <button
                onClick={ResendOtpHandler}
                className="btn m-1 btn-sm btn-link"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfromOtp;
