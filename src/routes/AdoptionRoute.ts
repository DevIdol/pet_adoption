import express, { Router } from "express";
import { isUser } from "../middlewares/IsAuth";
import { adoptionForm } from "../controllers/AdoptionController";

const adoptionRoute: Router = express.Router();

adoptionRoute.post('/', isUser, adoptionForm)

export default adoptionRoute;
