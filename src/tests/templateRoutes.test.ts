import App from "../app";
import supertest from "supertest";
import TemplatesController from "../controllers/templates";


const app = new App([
  new TemplatesController()
], true);

const server = app.app;


describe("When accessing /templates", () => {
  beforeAll(async () => await app.connectToDatabase());
  describe("Posts a new template", () => {
    it("should return template and send code 201", async () => {
      const newTemplate = await supertest(server).post("/templates").send({ title: "Test", desc: "Testing" });
      expect(newTemplate.body.template).toMatchObject({ title: "Test", desc: "Testing" });
      expect(newTemplate.statusCode).toEqual(201);
    });
  });
  describe("Retrieves all templates", () => {
    it("should retrieve all templates with code 200", async () => {
      const templates = await supertest(server).get("/templates");
      expect(templates.body.templates.length).toBeGreaterThan(0);
      expect(templates.statusCode).toEqual(200);
    });
  });
  describe("Retrieve a specific template", () => {
    it("should retrieve a specific template with code 200", async () => {
      const newTemplate = await supertest(server).post("/templates").send({ title: "Test", desc: "Testing" });
      const template = await supertest(server).get(`/templates/${newTemplate.body.template.id}`);
      expect(template.statusCode).toEqual(200);
      expect(template.body.template.id).toEqual(newTemplate.body.template.id);
    });
  });
  describe("Update a specific template", () => {
    it("should update a specific template and return code 200", async () => {
      const newTemplate = await supertest(server).post("/templates").send({ title: "Test", desc: "Testing" });
      const template = await supertest(server).patch(`/templates/${newTemplate.body.template.id}`)
        .send({ title: "newTest", desc: "newTesting" });
      const updatedTemplate = await supertest(server).get(`/templates/${newTemplate.body.template.id}`);
      expect(template.statusCode).toEqual(200);
      expect(updatedTemplate.body.template).toMatchObject({ title: "newTest", desc: "newTesting" });
    });
  });
  describe("Delete a specific template", () => {
    it("should delete a specific template and return code 204", async () => {
      const newTemplate = await supertest(server).post("/templates").send({ title: "Test", desc: "Testing" });
      const template = await supertest(server).delete(`/templates/${newTemplate.body.template.id}`);
      const deletedTemplate = await supertest(server).get(`/templates/${newTemplate.body.template.id}`)
      expect(template.statusCode).toEqual(204);
      expect(deletedTemplate.statusCode).toEqual(404);
    });
  });
  describe("Access missing template", () => {
    it("should return an error and code 404", async () => {
      const templateString = await supertest(server).get(`/templates/whoops`);
      const templateNumber = await supertest(server).get(`/templates/${50}`);
      expect(templateString.statusCode).toEqual(404);
      expect(templateNumber.statusCode).toEqual(404);
    });
  });
});
