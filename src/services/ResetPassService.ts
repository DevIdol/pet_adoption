import { NextFunction, Request, Response } from "express";
import Token from "../models/Token";
import User from "../models/UserModel";
import crypto from "crypto";
import { SendMail } from "../utils/ChangePassMail";
import bcrypt from "bcrypt";

//Forgot Password
export const forgotPasswordService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", "Invalid Email!");
      return res.redirect("/forgot-password");
    }
    if (!user.verified) {
      req.flash("error", "Email is not verified!");
      return res.redirect("/forgot-password");
    }
    let token = await Token.findOne({
      userId: user._id,
    });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const url = `${process.env.BASE_URL}/forgot-password/${user._id}/${token.token}`;
    await SendMail(user.email, "Password Reset", url, req);
    res.redirect("/forgot-password");
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

// Password  Verify Url
export const passwordVerifyURLService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user: any = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.render("not-found", { error: "User not found!" });
    }
    const token: any = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      res.render("not-found", { error: "Token not found!" });
    }

    res.render("reset-password", { user: user._id, token: token.token });
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//Password Reset
export const resetPasswordService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { password, confirmPass } = req.body;
  let errors: any[] = [];
  try {
    if (!password || !confirmPass) {
      errors.push({ message: "Input fields can't be empty!" });
    }

    if (password !== confirmPass) {
      errors.push({ message: "Password do not match!" });
    }
    if (password.length < 6) {
      errors.push({ message: "Password should be at least 6 characters!" });
    }
    let user: any = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.render("not-found", { error: "User not found!" });
    }
    let token: any = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      res.render("not-found", { error: "Token not found!" });
    }
    if (errors.length > 0) {
      res.render("reset-password", {
        errors,
        password,
        confirmPass,
        token,
      });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      password = await bcrypt.hash(password, salt);
      user.password = password;
      await user.save();
      await token.remove();
      req.flash("success", "Password changed successfully!");
      res.redirect("/login");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};
