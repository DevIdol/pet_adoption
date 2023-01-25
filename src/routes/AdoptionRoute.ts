import express, { Router } from "express";
import { isUser, isAdmin } from "../middlewares/IsAuth";
import {
  adoptionAdminDelete,
  adoptionDelete,
  adoptionForm,
} from "../controllers/AdoptionController";

const adoptionRoute: Router = express.Router();

adoptionRoute.post("/", isUser, adoptionForm);
adoptionRoute.delete("/:id", isUser, adoptionDelete);
adoptionRoute.delete("/admin/:userId/:adoId", isAdmin, adoptionAdminDelete);

export default adoptionRoute;
