import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import { ENV } from "./lib/env.js";
import { connectDb } from "./lib/connection.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = ENV.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);

//auth routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

//server connecting function
const server = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log("server running on port:", port);
    });
  } catch (error) {
    console.log("Db connecting error:", error);
  }
};

server();
