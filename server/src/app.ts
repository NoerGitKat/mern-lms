import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { globalRouter } from "./routes";
import { handleNotFound } from "./controllers/global.controller";
import { catchErrorsMiddleware } from "./middlewares";

const app = express();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8000",
  }),
);
app.use(catchErrorsMiddleware);

// Routes
app.use("/api/v1", globalRouter);
app.use("*", handleNotFound);

export default app;
