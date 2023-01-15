import express, { Router } from "express";
import { verifyEmail } from "../controllers/UserController";

const userRoute: Router = express.Router();

//verify email
userRoute.get("/:id/verify/:token", verifyEmail);
export default userRoute;
