import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { ENV } from "./lib/env.js";
import { connectDb } from "./lib/connection.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import messageRouter from "./routes/message.route.js";

const app = express();
const port = ENV.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);

//auth routes
app.use("/api/auth", authRouter);
//messages routes
app.use("/api/messages", messageRouter);

// Ready for deploy into single domain
const singleDomainDeploy = () => {
  if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.use((_, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
  }
};

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

singleDomainDeploy();
server();
