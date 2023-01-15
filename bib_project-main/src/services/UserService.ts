import { NextFunction, Request, Response } from "express";
import Token from "../models/Token";
import User from "../models/UserModel";

//verify email
export const verifyEmailService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors: any[] = [];
  try {
    const user: any = await User.findOne({ _id: req.params.id });
    if (!user) {
      errors.push({ message: "User Not Found!" });
    }
    const token: any = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      errors.push({ message: "Token Not Found!" });
    }

    if (errors.length > 0) {
      res.render("verify-email", { errors });
    } else {
      await User.updateOne({ _id: user.id }, { $set: { verified: true } });
      await token.remove();
      res.render("verify-email", { message: "Email verified successfully!" });
    }
  } catch (error) {
    console.log(error);
  }
};
