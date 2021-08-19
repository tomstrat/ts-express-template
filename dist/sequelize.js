"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ticket_1 = require("./models/ticket");
const dbConfig = new sequelize_1.Sequelize('sqlite::memory:');
ticket_1.initialise(dbConfig);
const testConnection = (async () => {
    try {
        await dbConfig.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
dbConfig.sync() //{ force: true }
    .then(() => {
    console.log("Database & tables created!");
});
