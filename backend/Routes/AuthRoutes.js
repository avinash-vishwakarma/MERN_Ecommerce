import express from "express";
import {
  ChangePasswordController,
  ConfirmOtpController,
  ForgotPasswordController,
  LoginController,
  SignupController,
} from "../Controllers/AuthController.js";
import {
  ChangePasswordValidation,
  ConfromOtpValidation,
  ForgotPasswordValidation,
  LoginValidation,
  SignupValidation,
} from "./validation/AuthValidation.js";
const app = express.Router();

app.post("/signup", SignupValidation, SignupController);
app.post("/confirm-otp", ConfromOtpValidation, ConfirmOtpController);
app.post("/login", LoginValidation, LoginController);
app.post(
  "/forgot-password",
  ForgotPasswordValidation,
  ForgotPasswordController
);

app.post(
  "/change-password",
  ChangePasswordValidation,
  ChangePasswordController
);

export default app;
