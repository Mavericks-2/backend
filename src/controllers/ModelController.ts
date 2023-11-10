import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import bd from "../models";


class ModelController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }
  private static instance: ModelController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ModelController("model");
    return this.instance;
  }
  protected initRoutes(): void {
    this.router.post("/postAccuracyModel", this.postAccuracyModel.bind(this));
    this.router.get("/getAccuracyModel", this.getAccuracyModel.bind(this));
  }
  private async postAccuracyModel(req: Request, res: Response) {
    const { accuracy, matrizProductosE, id_admin } = req.body;
    try {
      console.log(bd.Modelo); // Verifica que bd.Model esté definido
      const model = await bd.Modelo.create({
        accuracy: accuracy,
        matrizProductosE: matrizProductosE,
        id_admin: id_admin,
      });
      if (!model) {
        throw new Error("Error creating model");
      }
      res.status(201).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async getAccuracyModel(req: Request, res: Response) {
    try {
      const model = await bd.Modelo.findOne({
        order: [["createdAt", "DESC"]],
      });
      if (!model) {
        throw new Error("Error getting model");
      }
      res.json(model);
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}
export default ModelController;
