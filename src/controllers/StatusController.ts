import { Request, Response } from "express";
import AbstractController from "./AbstractController";

import bd from "../models";
import acomodador from "../models";
import { Console } from "node:console";

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
    this.router.get("/getFechasStatus", this.getFechasStatus.bind(this));
  }
  private async postComparedPhotos(req: Request, res: Response) {
    const {
      estado,
      matrizDiferencias,
      matrizProductosF,
      id_acomodador,
      id_planogram,
    } = req.body;

    try {
      const status = await bd.Status.create({
        estado: estado,
        matrizDiferencias: matrizDiferencias,
        matrizProductosF: matrizProductosF,
        id_acomodador: id_acomodador,
        id_planogram: id_planogram,
        fecha: new Date(new Date().getTime() - 21600000),
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
        order: [[bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha")), "ASC"]],
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
          [
            bd.Sequelize.fn(
              "GROUP_CONCAT",
              bd.Sequelize.col("matrizDiferencias")
            ),
            "matricesDiferencias",
          ],
          [
            bd.Sequelize.fn(
              "GROUP_CONCAT",
              bd.Sequelize.col("matrizProductosF")
            ),
            "matricesProductosF",
          ],
        ],
        group: [bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha"))],
        order: [[bd.Sequelize.fn("DATE", bd.Sequelize.col("fecha")), "ASC"]],
      });
      res.json(status);
    } catch (error) {
      console.error("Error en la consulta: " + error);
      res.status(500).send("Error en la consulta.");
    }
  }
  private async getFechasStatus(req: Request, res: Response) {
    const { Op } = require("sequelize");
    try {
      const fechasUnicas = await bd.Status.findAll({
        attributes: [
          [
            bd.Sequelize.fn(
              "DATE_FORMAT",
              bd.Sequelize.col("fecha"),
              "%Y-%m-%d"
            ),
            "fecha",
          ],
        ],
        group: [
          bd.Sequelize.fn("DATE_FORMAT", bd.Sequelize.col("fecha"), "%Y-%m-%d"),
        ],
        order: [["fecha", "ASC"]],
        raw: true,
      });

      const resultados = [];

      for (const fecha of fechasUnicas) {
        // Obtener la fecha anterior y posterior
        const fechaActual = new Date(`${fecha.fecha}`);
        fechaActual.setHours(fechaActual.getHours() + 23);
        fechaActual.setMinutes(fechaActual.getMinutes() + 59);
        fechaActual.setSeconds(fechaActual.getSeconds() + 59);


        const fechaAnterior = new Date(fechaActual);
        const fechaPosterior = new Date(fechaActual);
        fechaAnterior.setDate(fechaAnterior.getDate() - 1);
        fechaPosterior.setDate(fechaPosterior.getDate() + 1);
        fechaPosterior.setHours(fechaPosterior.getHours() - 23);
        fechaPosterior.setMinutes(fechaPosterior.getMinutes() - 59);
        fechaPosterior.setSeconds(fechaPosterior.getSeconds() - 59);
      

        const inicioFecha = `${fechaAnterior.toISOString()}`;
        const finFecha = `${fechaPosterior.toISOString()}`;

        let primerDesacomodado = await bd.Status.findOne({
          attributes: ["fecha", "estado"],
          where: {
            estado: "desacomodado",
            fecha: {
              [Op.between]: [inicioFecha, finFecha],
            },
          },
          order: [["fecha", "ASC"]],
        });

        if (primerDesacomodado === null) {
          primerDesacomodado = await bd.Status.findOne({
            attributes: ["fecha", "estado"],
            where: {
              estado: "acomodado",
              fecha: {
                [Op.between]: [inicioFecha, finFecha],
              },
            },
            order: [["fecha", "ASC"]],
          });
        }

        let primerAcomodado = await bd.Status.findOne({
          attributes: ["fecha", "estado"],
          where: {
            estado: "acomodado",
            fecha: {
              [Op.between]: [inicioFecha, finFecha],
            },
          },
          order: [["fecha", "ASC"]],
        });

        let timestamp;
        if (primerAcomodado) {
          timestamp = primerAcomodado.fecha - primerDesacomodado.fecha;
        } else {
          timestamp = 0;
          primerAcomodado = {
            fecha: primerDesacomodado.fecha,
            estado: "acomodado",
          };
        }
  
        timestamp = timestamp / 60000;

        resultados.push({
          fecha: fecha.fecha,
          primerDesacomodado,
          primerAcomodado,
          timestamp,
        });
      }

      res.json(resultados);
    } catch (error) {
      console.error("Error al obtener las fechas:", error);
      res.status(500).json({ error: "Error al obtener las fechas" });
    }
  }
}
export default StatusController;
