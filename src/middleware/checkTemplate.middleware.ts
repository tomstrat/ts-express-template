import { Template } from "../models/template";
import { Request, Response, NextFunction } from "express";
import HttpException from "../classes/httpException";

export default async function checkTemplateExists(req: Request, res: Response, next: NextFunction) {

  const test = await Template.findOne({ where: { id: req.params.id } });
  if (test) {
    next();
  } else {
    next(new HttpException("No Template Found", 404));
  }
}
