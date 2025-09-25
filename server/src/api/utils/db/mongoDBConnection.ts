import mongoose from "mongoose";

const Connection = async (): Promise<void> => {
  try {
    // Ensure that MONGODB_URI is properly provided
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connection established");
  } catch (err) {
    console.error("Error establishing MongoDB connection:", err);
  }
};

export default Connection;
