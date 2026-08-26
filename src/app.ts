import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes";
import applicationRouter from "./routes/application-routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/api", applicationRouter);

app.use(errorHandler);

export default app;
