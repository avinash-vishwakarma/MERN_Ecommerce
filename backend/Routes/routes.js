import { Router } from "express";
import { HomeController } from "../Controllers/GenralController.js";
const app = Router();

app.get("/", HomeController);

export default app;
