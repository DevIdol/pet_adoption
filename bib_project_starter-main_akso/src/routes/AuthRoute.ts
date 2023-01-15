import express, { Router } from "express";
import { login, logout, register } from "../controllers/AuthController";
import { isUser } from "../middlewares/IsAuth";

const authRoute: Router = express.Router();

//register
authRoute.post("/register", register);

//login
authRoute.post("/login", login);

//login
authRoute.post("/logout", isUser, logout);

export default authRoute;
