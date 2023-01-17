
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer  from "multer";
import cors from "cors";

import path from "path";
import { logger } from "./logger/Logger";
import connectDB from "./db";
import pet_route from "./routes/PetRoute.js";
import pet_user_route from "./routes/PetUserRoute.js";

import cookieParser from "cookie-parser"


import methodOverride from "method-override";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));
app.use(express.static(path.join(__dirname, "../client/public")));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method'));
app.use(multer().any());
app.use(cookieParser());
//db
connectDB();

app.use("/admin/pets/", pet_route);


app.use("/", pet_user_route);
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
