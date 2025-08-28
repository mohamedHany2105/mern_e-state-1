import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import serviceRouter from "./routes/service.route.js";
// app & configuration
const app = express();
dotenv.config();
// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routers
app.use('/api/user/',userRouter)
app.use("/api/auth/", authRouter);
app.use('/api/service/',serviceRouter)

// test

app.get("/", (req, res, next) => {
  res.send("feel free the server is running");
});

// connect to server and database

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo connected successfully");
  app.listen(process.env.PORT_NUMBER, () => {
    console.log(
      `server connected : http://localhost:${process.env.PORT_NUMBER}`
    );
  });
});

// error handler

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

