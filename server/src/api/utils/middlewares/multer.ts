/**
 * @file cloudinary.middleware.ts
 * @description Configures Multer to use Cloudinary for file storage and provides a middleware
 * for handling multi-file uploads.
 */

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request, Response, NextFunction } from "express";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Define the params interface to include custom fields
interface CloudinaryParams {
  folder?: string;
  allowed_formats?: string[];
  transformation?: Array<{ width: number; height: number; crop: string }>;
}

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Set folder name in Cloudinary
    allowed_formats: ["jpeg", "jpg", "png", "gif"], // Allowed image formats (optional, you can remove it if you want to allow all)
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Image transformations (optional)
  } as CloudinaryParams,
});

// Multer upload middleware without file filter (allows all files)
const upload = multer({
  storage,
  // No file filter, so this will accept any file type
});

// Cloudinary upload middleware for multiple files
const cloudinaryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Accept multiple files (max 10 for example) under field name 'files'
  upload.array("files", 10)(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // If upload is successful, req.files will contain the uploaded files
    if (req.files && Array.isArray(req.files)) {
      req.body.images = req.files.map((file: any) => file.path); // Collect all Cloudinary URLs
    } else {
      req.body.images = [];
    }

    next();
  });
};

export default cloudinaryMiddleware;
