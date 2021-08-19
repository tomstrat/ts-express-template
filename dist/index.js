"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const tickets_1 = __importDefault(require("./controllers/tickets"));
const app = new app_1.default([
    new tickets_1.default()
], false);
app.listen();
