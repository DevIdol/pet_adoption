import mongoose from "mongoose";
import { logger } from "./logger/Logger.js";

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB || "")
    .then(() => logger.info("MongoDB Connected!"))
    .catch((error:any) => logger.error(`Couldn't connect to MongoDB!`, error));
};

export default connectDB;
