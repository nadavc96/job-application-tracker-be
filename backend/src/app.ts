import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "./config/env";
import authRouter from "./routes/auth-routes";
import applicationRouter from "./routes/application-routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/api", applicationRouter);

app.use(errorHandler);

export default app;
