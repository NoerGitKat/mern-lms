import { Redis } from "ioredis";
import { REDIS_CLOUD_URL } from "../constants";

function connectRedis() {
  if (REDIS_CLOUD_URL) {
    console.log(`Redis connected!`);
    return REDIS_CLOUD_URL;
  }
  throw new Error("Redis connection failed.");
}

export const redis = new Redis(connectRedis());
