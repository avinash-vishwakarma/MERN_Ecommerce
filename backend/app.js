import express from "express";
const app = express();
import dotenv from "dotenv";
import { connect_DB } from "./config/DB_Config.js";
import GenralRoutes from "./Routes/routes.js";
import ErrorRoutes from "./Routes/ErrorRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import bodyParser from "body-parser";
import { GlobalErrorHandler } from "./Controllers/ErrorController.js";

// configure
dotenv.config();
app.use(bodyParser.json());
app.use(GenralRoutes);
app.use("/api", AuthRoutes);
app.use(ErrorRoutes);
app.use(GlobalErrorHandler);

connect_DB(() => {
  const { PORT } = process.env;
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
});
