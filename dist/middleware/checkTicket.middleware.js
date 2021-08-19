"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = require("../models/ticket");
const httpException_1 = __importDefault(require("../classes/httpException"));
async function checkTicketExists(req, res, next) {
    const test = await ticket_1.Ticket.findOne({ where: { id: req.params.id } });
    if (test) {
        next();
    }
    else {
        next(new httpException_1.default("No Ticket Found", 404));
    }
}
exports.default = checkTicketExists;
