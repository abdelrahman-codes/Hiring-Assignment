import mongoose, { Document, Schema } from "mongoose";

// Define the Apartment interface
interface IApartment extends Document {
  name: string;
  unit_number: string;
  project_name: string;
  description: string;
  price: number;
  location: string;
  map_location?: string;
  images: string[]; // An array to store image URLs
}

// Create the Apartment schema
const apartmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    unit_number: { type: String, required: true, trim: true },
    project_name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, trim: true },
    map_location: { type: String, trim: true },
    images: { type: [String], default: [] }, // Array of image URLs
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create the Mongoose model for Apartment
const Apartment = mongoose.model<IApartment>("Apartment", apartmentSchema);

export default Apartment;
