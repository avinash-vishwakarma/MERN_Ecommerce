import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/slice/auth-slice";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [showPass, setShowPass] = useState(false);
  const user_id = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendPassword = async () => {
    const response = await axios.post("/api/change-password", {
      password,
      confirm_password,
      user_id,
    });
    return response.data;
  };

  const changePasswordSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendPassword();
      console.log(data);
      if (data.password_updated) {
        console.log("password update successfully");
        dispatch(authActions.setChangePassword(false));
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-back-button">
        <Link to="/login">
          <i className="bi bi-arrow-left-short"></i>
        </Link>
      </div>

      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img className="login-intro-img" src="img/bg-img/36.png" alt="" />
          </div>

          <div className="register-form mt-4">
            <form onSubmit={changePasswordSubmitHandler}>
              <h6 className="mb-3 text-center">Update your password</h6>

              <div className="form-group text-start mb-3 position-relative">
                <input
                  className="form-control"
                  id="psw-input"
                  type={showPass ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="position-absolute" id="password-visibility">
                  <i
                    className="bi bi-eye"
                    onClick={() => {
                      setShowPass((old) => !old);
                    }}
                  ></i>
                </div>
              </div>

              <div className="mb-3" id="pswmeter"></div>

              <div className="form-group text-start mb-3">
                <input
                  className="form-control"
                  type={showPass ? "text" : "password"}
                  placeholder="Re-write password"
                  value={confirm_password}
                  onChange={(e) => {
                    setConfirm_password(e.target.value);
                  }}
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
