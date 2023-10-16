import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import { IMAGE_BASE_URL } from "../config";

import bd from "../models";

class PlanogramController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }

  // Singleton
  private static instance: PlanogramController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PlanogramController("planogram");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post(
      "/postPlanogramConfig",
      this.postPlanogramConfig.bind(this)
    );
    this.router.get("/getPlanogramConfig", this.getPlanogramConfig.bind(this));
  }

  private async postPlanogramConfig(req: Request, res: Response) {
    const { name_image, id_manager, coordenadas, matriz_productos, lineas } =
      req.body;
    const base_url = IMAGE_BASE_URL;
    const url = base_url + name_image;
    try {
      const planogram = await bd.Planogram.create({
        url_imagen: url,
        coordenadas: coordenadas,
        id_manager: id_manager,
        matriz_productos: matriz_productos,
        lineas: lineas,
      });

      if (!planogram) {
        throw new Error("Error creating planogram");
      }

      res.status(201).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async getPlanogramConfig(req: Request, res: Response) {
    const { id_acomodador } = req.body;

    try {
      const acomodador = await bd.Acomodador.findOne({
        where: {
          id_acomodador: id_acomodador,
        },
      });

      if (!acomodador) {
        throw new Error("Error retrieving acomodador");
      }

      const planogram = await bd.Planogram.findOne({
        where: {
          id_manager: acomodador.id_manager,
        },
        order: [["createdAt", "DESC"]],
      });

      if (!planogram) {
        throw new Error("Error retrieving planogram");
      }

      res.status(201).send({ planogram: planogram, message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}

export default PlanogramController;
