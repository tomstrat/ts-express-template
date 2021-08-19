"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const httpException_1 = __importDefault(require("../classes/httpException"));
function validateErrors(req, res, next) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().join(', ');
        next(new httpException_1.default(message, 400));
    }
    else {
        next();
    }
}
exports.default = validateErrors;
