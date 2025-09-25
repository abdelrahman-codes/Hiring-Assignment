/**
 * @file index.ts
 * @description Main router file for the API. It handles versioning and delegates requests to specific feature routers.
 */

import { Router, Request, Response } from "express";
import apartmentRoutes from "./apartment/Apartment.Routes";

const router: Router = Router();

router.get("/", (req: Request, res: Response): void => {
  res.json({ message: "welcome to version nawy task" });
});

router.use("/apartments", apartmentRoutes);

export default router;
