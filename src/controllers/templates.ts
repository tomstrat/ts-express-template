import express, { Request, Response } from "express";
import { Template } from "../models/template";
import checkTemplateExists from "../middleware/checkTemplate.middleware";
import validateTemplate from "../middleware/validateTemplate.middleware";
import Controller from "../interfaces/controller";
import validateErrors from "../middleware/validateErrors.middleware";

class TemplatesController implements Controller {
  public path = "/templates";
  public router = express.Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(this.path, validateTemplate(), validateErrors, this.createTemplate);
    this.router.get(this.path, validateTemplate(), validateErrors, this.getTemplates);
    this.router.get(`${this.path}/:id`, checkTemplateExists, this.getTemplate);
    this.router.patch(`${this.path}/:id`, checkTemplateExists, this.updateTemplate);
    this.router.delete(`${this.path}/:id`, checkTemplateExists, this.deleteTemplate);
  }

  private async createTemplate(req: Request, res: Response) {
    const { title, desc } = req.body;
    const newTemplate = await Template.create({ title, desc });
    console.log(`Created new Template: ${title} With Description: ${desc}`);
    res.status(201).json({ message: "Created Template", template: newTemplate });
  }

  private async getTemplates(req: Request, res: Response) {
    const templates = await Template.findAll();
    console.log(`Found all templates`);
    res.status(200).json({ message: "Retrieved Templates", templates });
  }

  private async getTemplate(req: Request, res: Response) {
    const id = req.params.id;
    const template = await Template.findOne({ where: { id } });
    console.log(`Found template ${id}`);
    res.status(200).json({ message: "Retrieved Template", template })
  }

  private async updateTemplate(req: Request, res: Response) {
    const id = req.params.id;
    const { title, desc } = req.body;
    await Template.update({ title, desc }, { where: { id } });
    console.log(`Updated Template ${id}`);
    res.status(200).json({ message: "Updated Template" });
  }

  private async deleteTemplate(req: Request, res: Response) {
    const id = req.params.id;
    await Template.destroy({ where: { id } });
    console.log(`Deleted template ${id}`);
    res.status(204).json({ message: "Deleted Template" });
  }
}

export default TemplatesController;