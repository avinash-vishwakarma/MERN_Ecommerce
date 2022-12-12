import express from "express";
import {
  ChangePasswordController,
  ConfirmOtpController,
  ForgotPasswordController,
  LoginController,
  ResendPasswordController,
  SignupController,
} from "../Controllers/AuthController.js";
import {
  ChangePasswordValidation,
  ConfromOtpValidation,
  ForgotPasswordValidation,
  LoginValidation,
  ResendPasswordValidation,
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

app.post("/resend-otp", ResendPasswordValidation, ResendPasswordController);

export default app;
