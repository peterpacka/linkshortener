import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Add uri to .env");
  }

  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
