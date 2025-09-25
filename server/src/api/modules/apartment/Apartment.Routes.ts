import { Router } from "express";
import {
  getApartments,
  getApartmentDetails,
  addApartment,
} from "./Apartment.Controller";
import cloudinaryMiddleware from "../../utils/middlewares/multer";

const router = Router();

// Route for listing apartments
router.get("/", getApartments);

// Route for getting apartment details
router.get("/:id", getApartmentDetails);

// Route for adding a new apartment
router.post("/", cloudinaryMiddleware, addApartment);

export default router;
