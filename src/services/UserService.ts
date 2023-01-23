import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Token from "../models/Token";
import User from "../models/UserModel";
import FavoriteModel from "../models/FavoriteModel";

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
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//show update username form
export const editUsernameService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  try {
    const user = await User.findById(req.params.id);
    res.render("edit-username", { user, token });
  } catch (error) {
    res.render("not-found", {
      error: "404 | Page Not Found!",
    });
  }
};

//show update email form
export const editUserEmailService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  try {
    const user = await User.findById(req.params.id);
    res.render("edit-email", { user, token });
  } catch (error) {
    res.render("not-found", {
      error: "404 | Page Not Found!",
    });
  }
};

//show update password form
export const editUserPasswordService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  try {
    const user = await User.findById(req.params.id);
    res.render("edit-password", { user, token });
  } catch (error) {
    res.render("not-found", {
      error: "404 | Page Not Found!",
    });
  }
};

//update user
export const updateUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    req.flash("success", "Updated Success!");
    res.redirect("/personal-info");
  } catch (error: any) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//user setting
export const userSettingService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  const user: any = req.user;
  let { username, email, currentPassword, password } = req.body;
  let errors: any[] = [];
  try {
    let users: any = await User.findById(user._id);
    if (!username || !email || !currentPassword || !password) {
      errors.push({ message: "Input fields can't be empty!" });
    }
    const verifiedPassword = await bcrypt.compare(
      currentPassword,
      users.password
    );
    if (!verifiedPassword) {
      errors.push({ message: "Current password is wrong!" });
    }
    if (password.length < 6) {
      errors.push({ message: "Password should be at least 6 characters!" });
    }
    if (errors.length > 0) {
      res.render("setting", {
        errors,
        username,
        email,
        currentPassword,
        password,
        user,
        token,
      });
    } else {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: req.body,
          },
          { new: true }
        );
        req.flash("success", "Updated Success!");
        res.redirect("/setting");
      }
    }
  } catch (error: any) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//change password
export const updateUserPasswordService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  let user: any = await User.findOne({ _id: req.params.id });
  let { currentPassword, password, confirmPass } = req.body;
  let errors: any[] = [];
  try {
    const verifiedPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!currentPassword || !password || !confirmPass) {
      errors.push({ message: "Input fields can't be empty!" });
    }
    if (!verifiedPassword) {
      errors.push({ message: "Current password is wrong!" });
    }
    if (password !== confirmPass) {
      errors.push({ message: "Password do not match!" });
    }
    if (password.length < 6) {
      errors.push({ message: "Password should be at least 6 characters!" });
    }
    if (errors.length > 0) {
      res.render("edit-password", {
        errors,
        currentPassword,
        password,
        confirmPass,
        token,
        user,
      });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      password = await bcrypt.hash(password, salt);
      user.password = password;
      await user.save();
      req.flash("success", "Password changed successfully!");
      res.redirect("/personal-info");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//delete user
export const deleteUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors: any[] = [];
  const token = req.cookies.access_token;
  const user: any = req.user;
  try {
    let { password } = req.body;
    let users: any = await User.findOne({ _id: req.params.id });
    const verifiedPassword = await bcrypt.compare(password, users.password);
    if (!verifiedPassword) {
      errors.push({ message: "Invalid Password" });
    }
    if (errors.length > 0) {
      res.render("setting", { errors, password, token, user });
    } else {
      await User.findByIdAndDelete(req.params.id).populate("favorites");
      await FavoriteModel.deleteMany({ userId: user._id });
      res.clearCookie("access_token");
      req.flash("success", "Your account is deleted!");
      res.redirect("/");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

// delete user form admin
export const deleteUserFromAdminService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await FavoriteModel.deleteMany({ userId: userId });
    User.deleteOne({ _id: userId }, (err) => {
      if (!err) {
        res.redirect("/admin");
      }
    });
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};
