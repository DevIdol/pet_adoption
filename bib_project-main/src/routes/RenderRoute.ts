import express, { Router, Request, Response, NextFunction } from "express";
import { isAdmin, isUser } from "../middlewares/IsAuth";

const renderRoute: Router = express.Router();

//show home
renderRoute.get("/", (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.access_token;
  res.render("index", { token });
});

renderRoute.get("/pets", (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.access_token;
  res.render("pet", { token });
});

//show pets

//show register form
renderRoute.get(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    !token && res.render("register", { token });
    token && res.redirect("/");
  }
);

//show login form
renderRoute.get("/login", (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.access_token;
  !token && res.render("login", { token });
  token && res.redirect("/");
});

//show favorite page
renderRoute.get(
  "/favorites",
  isUser,
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    res.render("favorite", { user: req.user, token });
  }
);

//show manage account
renderRoute.get(
  "/manage-account",
  isUser,
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    token && res.render("manage-account", { user: req.user, token });
    !token && res.redirect("/");
  }
);

//show dashboard
renderRoute.get(
  "/dashboard",
  isAdmin,
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any = req.user;
    res.render("dashbard", { user, token });
  }
);

//show forgot-password
renderRoute.get(
  "/forgot-password",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    res.render("forgot-password", { token });
  }
);

export default renderRoute;
