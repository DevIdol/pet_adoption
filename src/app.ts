import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";
import cors from "cors";
import path from "path";
import { logger } from "./logger/Logger";
import connectDB from "./db";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import renderRoute from "./routes/RenderRoute";
import authRoute from "./routes/AuthRoute";
import userRoute from "./routes/UserRoute";
import "./config/Passport";
import resetPassRoute from "./routes/ResetPassRoute";
import petRoute from "./routes/PetUserRoute";
import adminRoute from "./routes/PetRoute";
import { isAdmin, isUser } from "./middlewares/IsAuth";
import favoriteRoute from "./routes/FavoriteRoute";
import adoptionRoute from "./routes/AdoptionRoute";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8000;

//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));
app.use(express.static(path.join(__dirname, "../client/public")));

//db
connectDB();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: String(process.env.SECRET_KEY),
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



//render route
app.use("/", renderRoute);

app.use("/", authRoute);
app.use("/users", userRoute);
app.use("/personal-info", userRoute);
app.use("/forgot-password", resetPassRoute);

//pets
app.use("/pets", petRoute);

//add to save
app.use("/favorites", isUser, favoriteRoute);

//adoption register
app.use("/adoption-register", adoptionRoute);

//admin route
app.use("/admin", isAdmin, adminRoute);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
