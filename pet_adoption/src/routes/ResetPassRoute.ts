import express from "express";
import {
  forgotPassword,
  passwordVerifyURL,
  resetPassword,
} from "../controllers/ResetPassController";
const resetPassRoute = express.Router();

//Forgot Password
resetPassRoute.post("/", forgotPassword);

//Password Verify URL
resetPassRoute.get("/:id/:token", passwordVerifyURL);

//Reset Password
resetPassRoute.post("/:id/:token", resetPassword);

export default resetPassRoute;
