import { NextFunction, Request, Response } from "express";
import { ContactMail } from "../utils/ContactMail";

export const ContactMailService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, email, subject, message } = req.body;
    await ContactMail(name, email, subject, message, req, res);
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};
