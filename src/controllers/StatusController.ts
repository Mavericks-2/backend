/* 
@Description: Controlador de rutas para la interacción con el status
@Autores: Pablo González, José Ángel García, Erika Marlene

@export: Clase StatusController
*/

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
    this.router.get(
      "/getMostFailedProduct/:idAcomodador",
      this.mostFailedProduct.bind(this)
    );
    this.router.get(
      "/getNumberScanns/:idAcomodador",
      this.numberScanns.bind(this)
    );
    this.router.get(
      "/getNumberScannsProducts/:idAcomodador",
      this.numberScannsProducts.bind(this)
    );
    this.router.get("/getAccuracy/:idAcomodador", this.accuracy.bind(this));
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

  private async mostFailedProduct(req: Request, res: Response) {
    const { idAcomodador } = req.params;
    try {
      const matrizProductosF = await bd.Status.findAll({
        attributes: ["matrizProductosF"],
        where: {
          id_acomodador: idAcomodador,
          estado: "desacomodado",
        },
      });

      let matrices = [];
      for (const matriz of matrizProductosF) {
        const newMatriz = this.convertLongTextToJSON(matriz.dataValues);
        for (const row of newMatriz.matrizProductosF) {
          for (const product of row) {
            matrices.push(product);
          }
        }
      }

      const mostFailedProduct = matrices.reduce((acc, curr) => {
        if (acc[curr] === undefined) {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, {});

      const mostFailedProductArray = Object.entries(mostFailedProduct);

      mostFailedProductArray.sort((a: any, b: any) => {
        return b[1] - a[1];
      });

      let product = mostFailedProductArray[0][0];

      res.json({ product: product });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async numberScanns(req: Request, res: Response) {
    const { idAcomodador } = req.params;
    try {
      const numberScanns = await bd.Status.findAll({
        attributes: [
          [bd.Sequelize.fn("COUNT", bd.Sequelize.col("estado")), "conteo"],
        ],
        where: {
          id_acomodador: idAcomodador,
        },
      });

      res.json({ numberScanns: numberScanns[0].dataValues.conteo });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async numberScannsProducts(req: Request, res: Response) {
    const { idAcomodador } = req.params;
    try {
      const numberScannsProducts = await bd.Status.findAll({
        attributes: ["matrizDiferencias"],
        where: {
          id_acomodador: idAcomodador,
        },
      });

      let matrices = [];
      for (const matriz of numberScannsProducts) {
        const newMatriz = this.convertLongTextToJSON(matriz.dataValues);
        for (const row of newMatriz.matrizDiferencias) {
          for (const product of row) {
            matrices.push(product);
          }
        }
      }

      res.json({ numberScannsProducts: matrices.length });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async accuracy(req: Request, res: Response) {
    const { idAcomodador } = req.params;
    try {
      const acomodados = await bd.Status.findAll({
        attributes: [
          [bd.Sequelize.fn("COUNT", bd.Sequelize.col("estado")), "conteo"],
        ],
        where: {
          id_acomodador: idAcomodador,
          estado: "acomodado",
        },
      });

      const desacomodados = await bd.Status.findAll({
        attributes: [
          [bd.Sequelize.fn("COUNT", bd.Sequelize.col("estado")), "conteo"],
        ],
        where: {
          id_acomodador: idAcomodador,
          estado: "desacomodado",
        },
      });

      const accuracy =
        (acomodados[0].dataValues.conteo /
          (acomodados[0].dataValues.conteo +
            desacomodados[0].dataValues.conteo)) *
        100;

      const accuracyRounded = Math.round(accuracy * 100) / 100;

      res.json({ accuracy: accuracyRounded });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
export default StatusController;
