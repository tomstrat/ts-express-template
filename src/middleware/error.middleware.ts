import { NextFunction, Request, Response } from "express";
import HttpException from "../classes/httpException";

export default function errorMiddleware() {
  return (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    res.status(status).json({ status, message });
  }
}