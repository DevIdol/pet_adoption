import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const isVerified = passport.authenticate("jwt", { session: false });

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.access_token;
  if (token) {
    isVerified(req, res, () => {
      if (req.user) {
        return next();
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  isVerified(req, res, () => {
    let user: any = req.user;
    if (user.isAdmin) {
      return next();
    } else {
      res.redirect("/");
    }
  });
};
