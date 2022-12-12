import { authActions } from "./auth-slice";

export const loginUserAction = (user, token) => {
  return (dispatch) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_info", JSON.stringify(user));

    dispatch(authActions.login(user));
  };
};
