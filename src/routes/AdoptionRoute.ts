import express, { Router } from "express";
import { isUser } from "../middlewares/IsAuth";
import { adoptionDelete, adoptionForm } from "../controllers/AdoptionController";

const adoptionRoute: Router = express.Router();

adoptionRoute.post('/', isUser, adoptionForm)
adoptionRoute.delete('/:id', isUser, adoptionDelete)

export default adoptionRoute;
