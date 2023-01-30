import express, { Router } from "express";
import { isUser, isAdmin } from "../middlewares/IsAuth";
import {
  adoptionAdminDelete,
  adoptionDelete,
  adoptionForm,
  availableAdoption,
} from "../controllers/AdoptionController";

const adoptionRoute: Router = express.Router();

//create adoption
adoptionRoute.post("/", isUser, adoptionForm);

//delete adoption
adoptionRoute.delete("/:id", isUser, adoptionDelete);

//delete adoption from admin
adoptionRoute.delete("/admin/:userId/:adoId", isAdmin, adoptionAdminDelete);

//available adoption
adoptionRoute.put("/admin/:id", isAdmin, availableAdoption);

export default adoptionRoute;
