import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slice/auth-slice";
import { loginUserAction } from "../../store/slice/auth-actions";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !userName.length > 3 ||
      !email.includes("@") ||
      !password.length > 8 ||
      confirmPassword !== password
    ) {
      // set error
      console.error("enter a valid values");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        name: userName,
        password,
        confirm_password: confirmPassword,
        email,
      });

      // set data to redux

      const { token, user } = response.data;
      dispatch(authActions.setOtp(true));
      dispatch(loginUserAction(user, token));
      navigate("/confrim-otp");
    } catch (error) {
      console.log(error.response.error.message);
    }
  };

  const guestUserHandler = () => {
    setUserName("test user");
    setEmail("testuser@test.com");
    setPassword("testpassword@");
    setConfirmPassword("testpassword@");
    setShowPassword(true);
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

            <form onSubmit={SignupSubmitHandler}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="form-group position-relative">
                <input
                  className="form-control"
                  id="psw-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div
                  className="position-absolute"
                  id="password-visibility"
                  onClick={setShowPassword.bind(null, (old) => !old)}
                >
                  <i className="bi bi-eye"></i>
                </div>
              </div>

              <div className="form-group position-relative">
                <input
                  className="form-control"
                  id="psw-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Confrim Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <div
                  className="position-absolute"
                  id="password-visibility"
                  onClick={setShowPassword.bind(null, (old) => !old)}
                >
                  <i className="bi bi-eye"></i>
                </div>
              </div>

              <button
                className="btn btn-success w-100 mb-2"
                type="button"
                onClick={guestUserHandler}
              >
                gest user data
              </button>

              <button className="btn btn-primary w-100" type="submit">
                Sign up
              </button>
            </form>
          </div>

          <div className="login-meta-data text-center">
            <p className="mb-0">
              already a user ?{" "}
              <Link to="/login" className="stretched-link">
                login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
