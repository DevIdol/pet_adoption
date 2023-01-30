import express from "express";
import { petDetailUser } from "../controllers/PetUserController.js";
const router = express.Router();

router.route("/:id").get(petDetailUser);

export default router;
