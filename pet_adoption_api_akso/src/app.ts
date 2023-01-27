import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { logger } from "./logger/Logger.js";
import connectDB from "./db";
import cors from "cors";
import fs from 'fs';
// swagger import
import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'js-yaml';
//routes
import DonationRoute from "./routes/DonationRoute.js";

//loading swagger
const yamlString = fs.readFileSync('./swagger/api.yaml', 'utf8');
const swaggerDocument = YAML.load(yamlString) as swaggerUI.JsonObject;;

dotenv.config();
const app= express();
const PORT = process.env.PORT || 8000;

//db
connectDB();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//swager route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//donation route
app.use("/api/", DonationRoute);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`)); 