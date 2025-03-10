import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
    throw new Error("Error connecting to database");
  }
};
