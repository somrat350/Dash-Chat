import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { ENV } from "./lib/env.js";
import { connectDb } from "./lib/connection.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import friendsRouter from "./routes/friends.route.js";
import userRouter from "./routes/user.route.js";
import callRouter from "./routes/call.route.js";
import { isAuthenticated } from "./middleware/auth.middleware.js";

const port = ENV.PORT || 3000;
const __dirname = path.resolve();
const allowedOrigins = ENV.CLIENT_URLS.length
  ? ENV.CLIENT_URLS
  : [ENV.CLIENT_URL].filter(Boolean);

const corsOriginValidator = (origin, callback) => {
  // Allow requests with no origin (server-to-server, curl, health checks).
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error("CORS origin not allowed"));
};

app.use(express.json());
app.use(cors({ origin: corsOriginValidator, credentials: true }));
app.use(cookieParser());

//auth routes
app.use("/api/auth", authRouter);
//messages routes
app.use("/api/messages", messageRouter);
//friends routes
app.use("/api/friends", friendsRouter);
app.use("/api/calls", callRouter);
app.use("/api/users", isAuthenticated, userRouter);

// Ready for deploy into single domain
// const singleDomainDeploy = () => {
//   if (ENV.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.use((_, res) => {
//       res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
//     });
//   }
// };

//server connecting function
const startServer = async () => {
  try {
    await connectDb();
    server.listen(port, () => {
      console.log("server running on port:", port);
    });
  } catch (error) {
    console.log("Db connecting error:", error);
  }
};

// singleDomainDeploy();
startServer();

// error handler middleware
app.use(errorHandler);
