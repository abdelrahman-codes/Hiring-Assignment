/**
 * @file normalizeText.middleware.ts
 * @description Express middleware to standardize and normalize text fields in request body and query parameters.
 * This is particularly useful for ensuring consistent search results and data entry, especially with Arabic characters.
 */

import { Request, Response, NextFunction } from "express";

// Function to normalize text
const normalizeText = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  function normalize(text: string): string {
    if (!text) return text;
    return text
      .trim()
      .replace(/ى/g, "ي")
      .replace(/أ/g, "ا")
      .replace(/إ/g, "ا")
      .replace(/آ/g, "ا")
      .replace(/ة/g, "ه");
  }

  // Normalize any specific fields in the request body or query
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = normalize(req.body[key]);
      }
    }
  }

  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === "string") {
        req.query[key] = normalize(req.query[key]);
      }
    }
  }

  next();
};

export default normalizeText;
