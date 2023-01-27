import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { logger } from "./logger/Logger.js";
import connectDB from "./db";

dotenv.config();
const app= express();
const PORT = process.env.PORT || 8000;

//db
connectDB();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));