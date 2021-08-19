"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const ticket_1 = require("./models/ticket");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
class App {
    constructor(controllers, isTest) {
        this._app = express_1.default();
        this.DB = new sequelize_1.Sequelize('sqlite::memory:');
        //in order to get tests to work so no two databases setup
        if (!isTest) {
            this.connectToDatabase();
        }
        this.initialiseMiddlewares();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    get app() {
        return this._app;
    }
    listen() {
        this._app.listen(3000, () => {
            console.log(`App listening on port ${3000}`);
        });
    }
    initialiseMiddlewares() {
        this._app.use(express_1.default.urlencoded({ extended: false }));
        this._app.use(express_1.default.json());
    }
    initialiseErrorHandling() {
        this._app.use(error_middleware_1.default());
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this._app.use("/", controller.router);
        });
    }
    async connectToDatabase() {
        ticket_1.initialise(this.DB);
        return new Promise(async (resolve) => {
            try {
                await this.DB.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
            this.DB.sync() //{ force: true }
                .then(() => {
                console.log("Database & tables created!");
                resolve("success");
            });
        });
    }
}
exports.default = App;
