"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const tickets_1 = __importDefault(require("../controllers/tickets"));
const app = new app_1.default([
    new tickets_1.default()
], true);
const server = app.app;
describe("When accessing /tickets", () => {
    beforeAll(async () => await app.connectToDatabase());
    describe("Posts a new ticket", () => {
        it("should return ticket and send code 201", async () => {
            const newTicket = await supertest_1.default(server).post("/tickets").send({ title: "Test", desc: "Testing" });
            expect(newTicket.body.ticket).toMatchObject({ title: "Test", desc: "Testing" });
            expect(newTicket.statusCode).toEqual(201);
        });
    });
    describe("Retrieves all tickets", () => {
        it("should retrieve all tickets with code 200", async () => {
            const tickets = await supertest_1.default(server).get("/tickets");
            expect(tickets.body.tickets.length).toBeGreaterThan(0);
            expect(tickets.statusCode).toEqual(200);
        });
    });
    describe("Retrieve a specific ticket", () => {
        it("should retrieve a specific ticket with code 200", async () => {
            const newTicket = await supertest_1.default(server).post("/tickets").send({ title: "Test", desc: "Testing" });
            const ticket = await supertest_1.default(server).get(`/tickets/${newTicket.body.ticket.id}`);
            expect(ticket.statusCode).toEqual(200);
            expect(ticket.body.ticket.id).toEqual(newTicket.body.ticket.id);
        });
    });
    describe("Update a specific ticket", () => {
        it("should update a specific ticket and return code 200", async () => {
            const newTicket = await supertest_1.default(server).post("/tickets").send({ title: "Test", desc: "Testing" });
            const ticket = await supertest_1.default(server).patch(`/tickets/${newTicket.body.ticket.id}`)
                .send({ title: "newTest", desc: "newTesting" });
            const updatedTicket = await supertest_1.default(server).get(`/tickets/${newTicket.body.ticket.id}`);
            expect(ticket.statusCode).toEqual(200);
            expect(updatedTicket.body.ticket).toMatchObject({ title: "newTest", desc: "newTesting" });
        });
    });
    describe("Delete a specific ticket", () => {
        it("should delete a specific ticket and return code 204", async () => {
            const newTicket = await supertest_1.default(server).post("/tickets").send({ title: "Test", desc: "Testing" });
            const ticket = await supertest_1.default(server).delete(`/tickets/${newTicket.body.ticket.id}`);
            const deletedTicket = await supertest_1.default(server).get(`/tickets/${newTicket.body.ticket.id}`);
            expect(ticket.statusCode).toEqual(204);
            expect(deletedTicket.statusCode).toEqual(404);
        });
    });
    describe("Access missing ticket", () => {
        it("should return an error and code 404", async () => {
            const ticketString = await supertest_1.default(server).get(`/tickets/whoops`);
            const ticketNumber = await supertest_1.default(server).get(`/tickets/${50}`);
            expect(ticketString.statusCode).toEqual(404);
            expect(ticketNumber.statusCode).toEqual(404);
        });
    });
});
