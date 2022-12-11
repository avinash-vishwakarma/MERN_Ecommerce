import express from "express";
import {
  GlobalErrorHandler,
  NotFoundController,
} from "../Controllers/ErrorController.js";
const app = express.Router();

app.use("*", NotFoundController);
// app.use(GlobalErrorHandler);

export default app;
