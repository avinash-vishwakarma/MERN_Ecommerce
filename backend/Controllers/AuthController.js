import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import genrateJwtToken from "../util/genrateJwtToken.js";
import genrateOtp from "../util/genarteOtp.js";
import timeValidation from "../util/timeValidation.js";

// @Route : /signup
// @Method : POST
// @Body : { name , email , password  , confirm_password  }
// @Response : { user , jwt_token }
// *incomplete : send otp in email
// *incomplete : do not send user data and token just now

export const SignupController = async (req, res, next) => {
  // check for existing user in db
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      status: 422,
      message: errors.array()[0].msg,
    });
    return;
  }

  const existUser = await User.exists({ email: req.body.email });
  if (existUser) {
    next({
      status: 422,
      message: "sorry no user found",
    });
    return;
  }

  // Create new user
  const randomOTP = genrateOtp();
  console.log(randomOTP);
  const createdUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    validation: {
      otp: randomOTP,
      genratedTime: new Date(),
    },
  });
  // genrate a token
  // send back the user data and jwt token

  const user = await User.findById(createdUser._id).select(
    "-password -createdAt -updatedAt -validation"
  );

  return res.json({
    staus: "ok",
    user,
    token: genrateJwtToken({ user_id: createdUser._id }),
  });
};

// @Route : /confirm-otp
// @Method : POST
// @Body : { otp , user_id  }
// @Response : validated
export const ConfirmOtpController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      status: 422,
      message: errors.array()[0].msg,
    });
    return;
  }

  const { otp, user_id } = req.body;
  const foundUser = await User.findById(user_id);

  // check if validation is null or not
  if (!foundUser || !foundUser.validation) {
    next({
      status: 422,
      message: "sorry no user found",
    });
    return;
  }

  // check if otp time is valid or expired

  if (!timeValidation(foundUser.validation.genratedTime, 5)) {
    next({
      status: 422,
      message: "entered otp is expired",
    });
    return;
  }

  if (foundUser.validation.otp !== +otp) {
    next({
      status: 422,
      message: "entered otp is invalid",
    });
    return;
  }

  // remove validation from db

  foundUser.validation.otp = undefined;
  foundUser.validation.genratedTime = undefined;
  foundUser.validatedAt = Date.now();
  await foundUser.save();

  if (foundUser.validation.forgotpassword) {
    return res.json({
      status: "ok",
      validated: true,
      changepassword: true,
    });
  }
  // response
  res.json({
    status: "ok",
    validated: true,
  });
};

// @Route : /login
// @Method : POST
// @Body : { email , password  }
// @Response : validated

export const LoginController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      status: 422,
      message: errors.array()[0].msg,
    });
    return;
  }

  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    next({
      status: 422,
      message: "sorry no user found with this email",
    });
    return;
  }

  const match = await foundUser.matchPassword(req.body.password);

  if (!match) {
    next({
      status: 422,
      message: "password does not match please try again",
    });
    return;
  }
  // genrate tokne send response

  const user = await User.findById(foundUser._id).select(
    "-password -createdAt -updatedAt"
  );

  res.json({
    status: "ok",
    user,
    token: genrateJwtToken({ user_id: user._id }),
  });
};

// @Route : /forgot-password
// @Method : POST
// @Body : { email  }
// @Response : validated
// *incomplete : send otp in email

export const ForgotPasswordController = async (req, res, next) => {
  // find the user with email
  // set the validation otp and genarted time
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    next({
      status: 422,
      message: "sorry no user found with this email",
    });
    return;
  }

  // genarte otp
  const genartedOtp = genrateOtp();
  foundUser.validation = {
    otp: genartedOtp,
    genratedTime: Date.now(),
    forgotpassword: Date.now(),
  };
  await foundUser.save();

  // response
  res.json({
    status: "ok",
    user_id: foundUser._id,
  });
};

// @Route : /change-password
// @Method : POST
// @Body : { password , user_id  }
// @Response : password_updated
// @Incomplate : check if the passwor is hashed or not

export const ChangePasswordController = async (req, res, next) => {
  const { password, user_id } = req.body;

  // find the user
  // update the password

  const updateUser = await User.findById(user_id);

  if (!updateUser.validation?.forgotpassword) {
    return next({
      status: 422,
      message: "sorry we are unable to change password",
    });
  }

  if (!timeValidation(updateUser.validation.forgotpassword, 5)) {
    return next({
      status: 422,
      message: "time expire for updating password",
    });
  }

  updateUser.validation.forgotpassword = undefined;

  updateUser.password = password;
  await updateUser.save();
  res.json({
    status: "ok",
    password_updated: true,
  });
};
