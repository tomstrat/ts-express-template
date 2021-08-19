import express from "express";
import { Sequelize } from "sequelize";
import { initialise } from "./models/template";
import Controller from "./interfaces/controller";
import errorMiddleware from "./middleware/error.middleware";

class App {
  private _app: express.Application;
  private DB: Sequelize;

  constructor(controllers: Controller[], isTest: boolean) {
    this._app = express();
    this.DB = new Sequelize('sqlite::memory:');

    //in order to get tests to work so no two databases setup
    if (!isTest) {
      this.connectToDatabase();
    }

    this.initialiseMiddlewares();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  get app(): express.Application {
    return this._app;
  }

  public listen() {
    this._app.listen(3000, () => {
      console.log(`App listening on port ${3000}`);
    });
  }

  private initialiseMiddlewares() {
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(express.json());
  }

  private initialiseErrorHandling() {
    this._app.use(errorMiddleware());
  }

  private initialiseControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this._app.use("/", controller.router);
    });
  }

  public async connectToDatabase() {
    initialise(this.DB);
    return new Promise(async (resolve) => {
      try {
        await this.DB.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
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

export default App;