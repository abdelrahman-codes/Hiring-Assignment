/**
 * @file app.ts
 * @description Main configuration file for the Express application.
 * It sets up middleware, connects to the database, and defines global routing and error handling.
 */

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import connection from "./api/utils/db/mongoDBConnection";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./api/modules/index";
import logger from "./api/utils/middlewares/logger";
import { NormalizeTextMiddleware } from "./api/utils/middlewares";

// Database connection
connection();

const app = express();

// set security HTTP headers
app.use(helmet());

// json body parser
app.use(express.json());

// enable cors
app.use(cors());

// Normalize text middleware
app.use(NormalizeTextMiddleware);

// Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Api running routes
app.use("/api", apiRoutes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.warn(`Unknown API request: ${req.method} ${req.url}`);

  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
