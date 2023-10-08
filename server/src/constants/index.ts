import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8000;
export const HOST = process.env.HOST || "localhost";
export const MONGO_URI = process.env.MONGO_URI || "";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const REDIS_CLOUD_URL = process.env.REDIS_CLOUD_URL;
export const EMAIL_REG_EX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ACTIVATION_SECRET: string = process.env.ACTIVATION_SECRET || "mysupersecret";
export const SMTP_HOST = process.env.SMTP_HOST || "";
export const SMTP_PORT = process.env.SMTP_PORT || "";
export const SMTP_SERVICE = process.env.SMTP_SERVICE || "";
export const SMTP_MAIL = process.env.SMTP_MAIL || "";
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
