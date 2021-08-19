import { body } from "express-validator";

export default function validateTemplate() {
  return [
    body("title").trim().escape().isLength({ min: 4, max: 40 }).withMessage("Must be between 4 and 40 characters"),
    body("desc").trim().escape().isLength({ min: 1, max: 500 }).withMessage("Must be between 1 and 500 characters")
  ];
}