import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8000;
export const HOST = process.env.HOST || "localhost";
export const MONGO_URI = process.env.MONGO_URI || "";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const REDIS_CLOUD_URL = process.env.REDIS_CLOUD_URL;
