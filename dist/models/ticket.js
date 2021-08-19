"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialise = exports.Ticket = void 0;
const sequelize_1 = require("sequelize");
class Ticket extends sequelize_1.Model {
}
exports.Ticket = Ticket;
const initialise = (sequelize) => {
    Ticket.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        desc: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize, modelName: "Ticket"
    });
};
exports.initialise = initialise;
