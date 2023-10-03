import { NextFunction, Request, Response } from "express";

export function getHealthCheck(_req: Request, res: Response) {
  return res.json({ status: 200, msg: "OK" });
}

export function handleNotFound(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl === "/favicon.ico") next();
  const err = new Error(`Route ${req.originalUrl} not found.`);
  next(err);
}
