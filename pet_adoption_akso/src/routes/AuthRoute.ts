import express, { Router } from "express";
import {
  login,
  logout,
  register,
  approvedAdmin,
} from "../controllers/AuthController";
import { isAdmin, isUser } from "../middlewares/IsAuth";

const authRoute: Router = express.Router();

//register
authRoute.post("/register", register);

//login
authRoute.post("/login", login);

//login
authRoute.post("/logout", isUser, logout);

//verify admin
authRoute.put("/admin/approval/:id", isAdmin, approvedAdmin);

export default authRoute;
