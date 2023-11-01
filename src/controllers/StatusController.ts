import { Request, Response } from "express";
import AbstractController from "./AbstractController";

import bd from "../models";
import acomodador from "../models";

class StatusController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }

  // Singleton
  private static instance: StatusController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new StatusController("status");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/postComparedPhotos", this.postComparedPhotos.bind(this));
    this.router.get(
      "/getIntentosPrevAcomodo",
      this.getIntentosPrevAcomodo.bind(this)
    );
    this.router.get(
      "/getMatrizDiferencias",
      this.getMatrizDiferencias.bind(this)
    );
  }
  private async postComparedPhotos(req: Request, res: Response) {
    const { estado, matrizDiferencias, matrizProductosF, id_acomodador, id_planogram } = req.body;

    try {
      const status = await bd.Status.create({
        estado: estado,
        matrizDiferencias: matrizDiferencias,
        matrizProductosF: matrizProductosF,
        id_acomodador: id_acomodador,
        id_planogram: id_planogram,
      });

      if (!status) {
        throw new Error("Error creating status");
      }

      res.status(201).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
  private async getIntentosPrevAcomodo(req: Request, res: Response) {
    try {
      const status = await bd.Status.findAll({
        attributes: [
          "id_acomodador",
          [bd.Sequelize.fn("COUNT", bd.Sequelize.col("estado")), "conteo"],
          [bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha")), "fecha"],
        ],
        where: {
          estado: {
            [bd.Sequelize.Op.not]: "acomodado",
          },
        },
        group: [
          "id_acomodador",
          "id_planogram",
          [bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha"))],
        ],
        order: [[bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha")), "DESC"]],
        include: [
          {
            model: bd.Acomodador,
            as: "statusAcomodador",
            attributes: ["nombre"],
          },
        ],
      });

      res.json(status);
    } catch (error) {
      console.error("Error en la consulta: " + error);
      res.status(500).send("Error en la consulta.");
    }
  }
  private async getMatrizDiferencias(req: Request, res: Response) {
    try {
      const status = await bd.Status.findAll({
        attributes: [
          [bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha")), "fecha"],
          [bd.Sequelize.fn("GROUP_CONCAT", bd.Sequelize.col("matrizDiferencias")), "matricesDiferencias"],
        ],
        group: [bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha"))], // Agrupa por fecha
        order: [[bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha")), "ASC"]],
      });      
      res.json(status);
      
    } catch (error) {
      console.error("Error en la consulta: " + error);
      res.status(500).send("Error en la consulta.");
    }
  }
}
export default StatusController;
