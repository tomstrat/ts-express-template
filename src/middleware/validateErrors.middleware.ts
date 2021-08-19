import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import HttpException from "../classes/httpException";

export default function validateErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().join(', ');
    next(new HttpException(message, 400));
  } else {
    next();
  }
}