import mongoose from "mongoose";
import { MONGO_URI } from "../constants";

export async function connectDB() {
  try {
    const data = await mongoose.connect(MONGO_URI);
    console.log(`Database is connected with ${data.connection.host}`);
  } catch (error) {
    console.log("DB error!", error.message as unknown);
    // Retry connecting
    setTimeout(connectDB, 5000);
  }
}
