import { Request, Response } from "express";
import AbstractController from "./AbstractController";

import bd from "../models";

const dummy_coordenadas = {
  coordenadas: [
    {
      x: 0,
      y: 0,
      width: 21.875,
      height: 91,
    },
    {
      x: 21.875,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 65.625,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 109.375,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 153.125,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 196.875,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 240.625,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 284.375,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 328.125,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 371.875,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 415.625,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 459.375,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 503.125,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 546.875,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 590.625,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 634.375,
      y: 0,
      width: 43.75,
      height: 91,
    },
    {
      x: 678.125,
      y: 0,
      width: 21.875,
      height: 91,
    },
    {
      x: 0,
      y: 91,
      width: 23.333333333333332,
      height: 76,
    },
    {
      x: 23.333333333333332,
      y: 91,
      width: 46.66666666666667,
      height: 76,
    },
    {
      x: 70,
      y: 91,
      width: 46.66666666666666,
      height: 76,
    },
    {
      x: 116.66666666666666,
      y: 91,
      width: 46.66666666666666,
      height: 76,
    },
    {
      x: 163.33333333333331,
      y: 91,
      width: 46.666666666666686,
      height: 76,
    },
    {
      x: 210,
      y: 91,
      width: 46.66666666666663,
      height: 76,
    },
    {
      x: 256.66666666666663,
      y: 91,
      width: 46.666666666666686,
      height: 76,
    },
    {
      x: 303.3333333333333,
      y: 91,
      width: 46.666666666666686,
      height: 76,
    },
    {
      x: 350,
      y: 91,
      width: 46.66666666666663,
      height: 76,
    },
    {
      x: 396.66666666666663,
      y: 91,
      width: 46.666666666666686,
      height: 76,
    },
    {
      x: 443.3333333333333,
      y: 91,
      width: 46.666666666666686,
      height: 76,
    },
    {
      x: 490,
      y: 91,
      width: 46.66666666666663,
      height: 76,
    },
    {
      x: 536.6666666666666,
      y: 91,
      width: 46.66666666666663,
      height: 76,
    },
    {
      x: 583.3333333333333,
      y: 91,
      width: 46.66666666666674,
      height: 76,
    },
    {
      x: 630,
      y: 91,
      width: 46.66666666666663,
      height: 76,
    },
    {
      x: 676.6666666666666,
      y: 91,
      width: 23.33333333333337,
      height: 76,
    },
    {
      x: 0,
      y: 167,
      width: 15.909090909090908,
      height: 63,
    },
    {
      x: 15.909090909090908,
      y: 167,
      width: 31.81818181818182,
      height: 63,
    },
    {
      x: 47.72727272727273,
      y: 167,
      width: 31.81818181818182,
      height: 63,
    },
    {
      x: 79.54545454545455,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 111.36363636363636,
      y: 167,
      width: 31.818181818181827,
      height: 63,
    },
    {
      x: 143.1818181818182,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 175,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 206.8181818181818,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 238.63636363636363,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 270.45454545454544,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 302.27272727272725,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 334.09090909090907,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 365.9090909090909,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 397.7272727272727,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 429.5454545454545,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 461.3636363636363,
      y: 167,
      width: 31.818181818181813,
      height: 63,
    },
    {
      x: 493.18181818181813,
      y: 167,
      width: 31.81818181818187,
      height: 63,
    },
    {
      x: 525,
      y: 167,
      width: 31.818181818181756,
      height: 63,
    },
    {
      x: 556.8181818181818,
      y: 167,
      width: 31.81818181818187,
      height: 63,
    },
    {
      x: 588.6363636363636,
      y: 167,
      width: 31.818181818181756,
      height: 63,
    },
    {
      x: 620.4545454545454,
      y: 167,
      width: 31.81818181818187,
      height: 63,
    },
    {
      x: 652.2727272727273,
      y: 167,
      width: 31.818181818181756,
      height: 63,
    },
    {
      x: 684.090909090909,
      y: 167,
      width: 15.909090909090992,
      height: 63,
    },
    {
      x: 0,
      y: 230,
      width: 23.333333333333332,
      height: 70,
    },
    {
      x: 23.333333333333332,
      y: 230,
      width: 46.66666666666667,
      height: 70,
    },
    {
      x: 70,
      y: 230,
      width: 46.66666666666666,
      height: 70,
    },
    {
      x: 116.66666666666666,
      y: 230,
      width: 46.66666666666666,
      height: 70,
    },
    {
      x: 163.33333333333331,
      y: 230,
      width: 46.666666666666686,
      height: 70,
    },
    {
      x: 210,
      y: 230,
      width: 46.66666666666663,
      height: 70,
    },
    {
      x: 256.66666666666663,
      y: 230,
      width: 46.666666666666686,
      height: 70,
    },
    {
      x: 303.3333333333333,
      y: 230,
      width: 46.666666666666686,
      height: 70,
    },
    {
      x: 350,
      y: 230,
      width: 46.66666666666663,
      height: 70,
    },
    {
      x: 396.66666666666663,
      y: 230,
      width: 46.666666666666686,
      height: 70,
    },
    {
      x: 443.3333333333333,
      y: 230,
      width: 46.666666666666686,
      height: 70,
    },
    {
      x: 490,
      y: 230,
      width: 46.66666666666663,
      height: 70,
    },
    {
      x: 536.6666666666666,
      y: 230,
      width: 46.66666666666663,
      height: 70,
    },
    {
      x: 583.3333333333333,
      y: 230,
      width: 46.66666666666674,
      height: 70,
    },
    {
      x: 630,
      y: 230,
      width: 46.66666666666663,
      height: 70,
    },
    {
      x: 676.6666666666666,
      y: 230,
      width: 23.33333333333337,
      height: 70,
    },
  ],
};

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
    const { url_imagen, id_manager, coordenadas, matriz_posiciones } = req.body;

    try {
      const planogram = await bd.Planogram.create({
        url_imagen: url_imagen,
        coordenadas: coordenadas,
        id_manager: id_manager,
        matriz_posiciones: matriz_posiciones,
      });

      if (!planogram) {
        throw new Error("Error creating planogram");
      }

      res
        .status(201)
        .send({ message: "ok" });
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
        order: [
          ['createdAt', 'DESC']
        ]
      });

      if (!planogram) {
        throw new Error("Error retrieving planogram");
      }

      res
        .status(201)
        .send({ planogram: planogram, message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}

export default PlanogramController;