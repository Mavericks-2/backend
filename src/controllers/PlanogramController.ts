/* 
@Description: Controlador de rutas para la interacción con el planograma
@Autores: Pablo González, José Ángel García, Erika Marlene

@export: Clase PlanogramController
*/

import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import { IMAGE_BASE_URL } from "../config";
import fetch from "node-fetch";
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
    this.router.get(
      "/getPlanogramConfig/:id_acomodador",
      this.getPlanogramConfig.bind(this)
    );
    this.router.post(
      "/postPlanogramToCloud",
      this.postPlanogramToCloud.bind(this)
    );
  }

  private async postPlanogramToCloud(req: Request, res: Response) {
    try {
      const { base_64_image, type } = req.body;

      const imageBuffer = Buffer.from(base_64_image, "base64");

      const random_name = Math.random().toString(36).substring(7);

      const url = IMAGE_BASE_URL + random_name + "." + type.split("/")[1];

      let options = {
        method: "PUT",
        headers: { "Content-Type": `${type}` },
        body: imageBuffer,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Image not found");
      }

      res.status(201).send({ message: "ok", url: response.url });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async postPlanogramConfig(req: Request, res: Response) {
    const { url_imagen, id_manager, coordenadas, matriz_productos, lineas } =
      req.body;
    try {
      const planogram = await bd.Planogram.create({
        url_imagen: url_imagen,
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
    const { id_acomodador } = req.params;

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
      const newPlanogram = this.convertLongTextToJSON(planogram.dataValues);

      res.status(201).send({ planogram: newPlanogram, message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}

export default PlanogramController;
