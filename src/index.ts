import App from "./app";
import TemplatesController from "./controllers/templates";

const app = new App(
  [
    new TemplatesController()
  ],
  false
);

app.listen();