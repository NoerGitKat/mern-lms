import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils";

// interface GlobalError extends Error {
//   statusCode: number;
//   path: string;
//   keyValue: NonNullable<unknown>;
//   code: number;
// }

export function catchAsyncErrorsMiddleware(
  handler: (req: Request, res: Response, next: NextFunction) => void,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function catchErrorsMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  let msg: string;

  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server error";

  // Wrong MongoDB ID
  if (error.name === "CastError") {
    msg = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(msg, 400);
  }

  // Duplicate key
  if (error.code === 11000) {
    msg = `Duplicate ${Object.keys(error.keyValue)} entered.`;
    error = new ErrorHandler(msg, 400);
  }

  // Wrong JWT
  if (error.name === "JsonWebTokenError") {
    msg = `JWT is invalid. Try again.`;
    error = new ErrorHandler(msg, 400);
  }

  // JWT expired
  if (error.name === "TokenExpiredError") {
    msg = `JWT is expired. Log in again.`;
    error = new ErrorHandler(msg, 400);
  }

  if (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    next();
  }
}
