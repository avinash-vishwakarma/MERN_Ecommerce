import { body } from "express-validator";

export const SignupValidation = [
  body("name").exists({ checkFalsy: true }).isLength({ min: 3 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  body(
    "confirm_password",
    "password and confirm password does not match"
  ).custom((value, { req }) => value === req.body.password),
];

export const ConfromOtpValidation = [
  body("otp").exists({ checkFalsy: true }).isLength(4),
  body("user_id").exists({ checkFalsy: true }),
];

export const LoginValidation = [
  body("email").exists().isEmail().normalizeEmail(),
  body("password").exists().isLength({ min: 8 }),
];

export const ForgotPasswordValidation = [
  body("email").exists().isEmail().normalizeEmail(),
];

export const ChangePasswordValidation = [
  body("password").exists().isLength({ min: 8 }),
  body("confirm_password").custom(
    (value, { req }) => value === req.body.password
  ),
  body("user_id").exists(),
];
