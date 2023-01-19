import { NextFunction, Request, Response } from "express";
import {
  editUsernameService,
  updateUserService,
  verifyEmailService,
  editUserEmailService,
  updateUserPasswordService,
  editUserPasswordService,
  deleteUserService,
  userSettingService,
  deleteUserFromAdminService,
} from "../services/UserService";

//verify email
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyEmailService(req, res, next);
};

//show update user form
export const editUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  editUsernameService(req, res, next);
};
//show update user form
export const editUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  editUserEmailService(req, res, next);
};

//show user password form
export const editUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  editUserPasswordService(req, res, next);
};

//update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  updateUserService(req, res, next);
};

// user setting
export const userSetting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userSettingService(req, res, next);
};

//update password
export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  updateUserPasswordService(req, res, next);
};

//delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteUserService(req, res, next);
};

//delete user from admin
export const deleteUserFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteUserFromAdminService(req, res, next);
};
