import express, { Router } from "express";
import { ContactMailService } from "../services/ContactService";

const contactRoute: Router = express.Router();

contactRoute.post('/', ContactMailService)

export default contactRoute