"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_1 = require("../models/ticket");
const middleware_1 = require("./middleware");
class TicketsController {
    constructor() {
        this.path = "/tickets";
        this.router = express_1.default.Router();
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(this.path, this.createTicket);
        this.router.get(this.path, this.getTickets);
        this.router.get(`${this.path}/:id`, middleware_1.checkTicketExists, this.getTicket);
        this.router.patch(`${this.path}/:id`, middleware_1.checkTicketExists, this.updateTicket);
        this.router.delete(`${this.path}/:id`, middleware_1.checkTicketExists, this.deleteTicket);
    }
    async createTicket(req, res) {
        const { title, desc } = req.body;
        const newTicket = await ticket_1.Ticket.create({ title, desc });
        console.log(`Created new Ticket: ${title} With Description: ${desc}`);
        res.status(201).json({ message: "Created Ticket", ticket: newTicket });
    }
    async getTickets(req, res) {
        const tickets = await ticket_1.Ticket.findAll();
        console.log(`Found all tickets`);
        res.status(200).json({ message: "Retrieved Tickets", tickets });
    }
    async getTicket(req, res) {
        const id = req.params.id;
        const ticket = await ticket_1.Ticket.findOne({ where: { id } });
        console.log(`Found ticket ${id}`);
        res.status(200).json({ message: "Retrieved Ticket", ticket });
    }
    async updateTicket(req, res) {
        const id = req.params.id;
        const { title, desc } = req.body;
        const ticket = await ticket_1.Ticket.update({ title, desc }, { where: { id } });
        console.log(`Updated Ticket ${id}`);
        res.status(200).json({ message: "Updated Ticket", ticket });
    }
    async deleteTicket(req, res) {
        const id = req.params.id;
        await ticket_1.Ticket.destroy({ where: { id } });
        console.log(`Deleted ticket ${id}`);
        res.status(204).json({ message: "Deleted Ticket" });
    }
}
exports.default = TicketsController;
