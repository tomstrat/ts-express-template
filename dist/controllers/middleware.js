"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTicketExists = void 0;
const ticket_1 = require("../models/ticket");
function checkTicketExists() {
    return async (req, res, next) => {
        try {
            await ticket_1.Ticket.findOne({ where: { id: req.params.id } });
            next();
        }
        catch (err) {
            console.log(err);
        }
    };
}
exports.checkTicketExists = checkTicketExists;
