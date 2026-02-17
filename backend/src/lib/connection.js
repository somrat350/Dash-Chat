import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDb = async () => {
  try {
    await mongoose.connect(ENV.DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
