import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes";
import applicationRouter from "./routes/application-routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/api", applicationRouter);

export default app;
