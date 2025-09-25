import { Request, Response, NextFunction } from "express";
import Apartment from "./Apartment.model";
import { IApartmentDto } from "./Apartment.dto";

/**
 * @route GET /api/apartments
 * @desc Get a list of apartments with search and pagination.
 */
export const getApartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Parse query parameters and set default values for search term, page, and perPage
    const searchTerm = (req.query.searchTerm as string) || ""; // default empty string if not provided
    const page = parseInt(req.query.page as string) || 1; // default to page 1
    const perPage = parseInt(req.query.perPage as string) || 6; // default to 6 items per page

    // Build the MongoDB query filter for search functionality
    // Uses $or to search across multiple fields (name, project_name, unit_number)
    // Uses $regex and $options: "i" for case-insensitive partial matching
    const queryFilter = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { project_name: { $regex: searchTerm, $options: "i" } },
        { unit_number: { $regex: searchTerm, $options: "i" } },
      ],
    };
    // Find apartments based on the query, applying skip for offset and limit for page size

    const apartments = await Apartment.find(queryFilter)
      .skip((page - 1) * perPage) // Calculate how many documents to skip
      .limit(perPage) // Limit the number of documents returned (page size)
      .sort({ createdAt: -1 }); // Sort by creation date descending (newest first)

    // Get the total count of documents matching the filter for accurate pagination calculation
    const totalCount = await Apartment.countDocuments(queryFilter);

    // Respond with the paginated data and metadata
    res.status(200).json({
      success: true,
      data: {
        apartments,
        totalCount,
        perPage,
        totalPages: Math.ceil(totalCount / perPage), // Calculate total pages
      },
    });
  } catch (err) {
    // Handle internal server errors
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @route GET /api/apartments/:id
 * @desc Get the details for a specific apartment by ID.
 */
// Get apartment details
export const getApartmentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract apartment ID from URL parameters
  const { id } = req.params;
  try {
    // Find the apartment by its MongoDB ID
    const apartment = await Apartment.findById(id); // Check if an apartment with the given ID exists
    if (!apartment) {
      return res
        .status(404) // HTTP 404 Not Found
        .json({ success: false, message: "Apartment not found" });
    } // Respond with the apartment details
    res.status(200).json({ success: true, data: apartment });
  } catch (err) {
    // Handle internal server errors
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @route POST /api/apartments
 * @desc Add a new apartment record to the database.
 */
// Add a new apartment
export const addApartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Destructure necessary fields from the request body (using IApartmentDto for type safety)
  const {
    name,
    unit_number,
    project_name,
    description,
    price,
    location,
    map_location,
    images,
  }: IApartmentDto = req.body;
  try {
    // Create a new Apartment document instance
    const newApartment = new Apartment({
      name,
      unit_number,
      project_name,
      description,
      price,
      location,
      map_location,
      images: images || [], // Ensure images is an array, default to empty array
    }); // Save the new document to the database

    await newApartment.save(); // Respond with success and the newly created apartment data
    res.status(201).json({
      // HTTP 201 Created
      success: true,
      message: "Apartment added successfully",
      data: newApartment,
    });
  } catch (err) {
    // Handle internal server errors
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
