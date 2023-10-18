import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import { IMAGE_BASE_URL } from "../config";
import multer from 'multer';
import { randomBytes } from "crypto";
import fetch from 'node-fetch';



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    this.router.get("/getPlanogramConfig/:id_acomodador", this.getPlanogramConfig.bind(this));
    this.router.post("/postPlanogramToCloud", this.postPlanogramToCloud.bind(this));
  }

  private async postPlanogramToCloud(req: Request, res: Response) {

    try {

    const { base_64_image, content_type} = req.body;

    console.log(base_64_image, content_type);

    //let base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAB+jAAAfowB9hn7bAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAC7vSURBVHja7d13lFz1YejxnJP38t55f8dOYjt5SfxiMMUYY2zciMtzJU6CiTvFxjgxDm48d+PYsU0zTYDBgIR6r6hri6TVSlpJq9WupNX2Mqvtqy6BASHB780dZ23AAqQpu3Pnfu45n3N83HaYW37fmbn39/ujEMIf8XsjIz1vSvtFWnVaV9pTaQHgZRxMK0u7Oe1C11LiwJvw+4H/krTtLmRAjk4ODXbd39lR/3rXVgRAcQ/8/y3tobTnXLiAfBgc7AodbTuO7+1pusRAgwAozsH/v6ctdsEC8h0AbS21UQQ8IwIQAMUZAPNcrIBCBYAIQAAU5+D/GRcqoNABIAIQAMU1+P9p2j4XKmAsAkAEIACKJwB+7iIFjGUAiAAEQHHc+DfkIgWMdQCIAATA+AbAp1yggPEKABGAABi/AJjlAgWMZwCIAATA+ARAlwsUMN4BIAIQAGM7+L/axQkolgAQAQiAsQuAj7o4AcUUACIAATA2AXCNixNQbAEgAhAAhQ+Ab7g4AcUYACIAAVDYAPgPFyegWANABCAAChcAd7k4AcUcACIAAVCYAJjg4gQUewCIAASAAAASGgAiAAEgAICEBoAIQAAIACChASACEAACAEhoAIgABIAAABIaACIAASAAgIQGgAhAAAgAIKEBIAIQAAIASGgAiAAEgAAAEhoAIgABIACAhAaACEAACAAgoQHwvAh4u0ENASAAgAQFgAhAAAgAIKEBIAIQAAIASGgAiAAEgAAAEhoAIgABIACAhAaACEAACAAgoQEgAhAAAgBIaACIAASAAAASGgAiAAEgAICEBoAIQAAIACChASACEAAuTkBCA0AEIAAAEhoAIgABAJDQABABCACAhAaACEAAACQ0AESAABAAAAkNABEgAAQAQEIDQAQIAAEAkNAAEAECQAAAJDQARIAAEAAACQ0AESAABABAQgNABAgAAQCQ0AAQAQJAAAAkNABEgAAQAAAJDQARIAAEAEBCA0AECAABAJDQABABAkAAACQ0AJ4XAW8zgAoAAQCQoAAQAQJAAAAkNABEgAAQAAAJDQARIAAEAEBCA0AECAABAJDQABABAkAAACQ0AESAABAAAAkNABEgAAQAIAASGgAiQAAIAEAAJDQARIAAEACAABABIkAACABAAIgABIAAAASACEAACABAAIgABIAAAASACEAACABAAIgABIAAAASACEAACABAAIgABIAAAASACEAACABAAIgABIAAAASACEAAAAgAESAABACAABABAkAAAAgAESAABACAABABAkAAAAgAESAABACAABABAkAAAALAIC4CBIAAAAQA2UdAas/FBmwBIAAAASACEAACABAAIgABIAAAASACEAACABAAIgABIAAAASACEAAUp1TYN9QU9g9sCQf6ysPBvYvCodTUcLjrvnCk4+ZwtO37ad9J/+ufp/+9Cen/7NH0f2dB+r+7Jv2/2Zz+3zam/z+6vY8IABGAABAARW+4PRzoXREOd/4yHGu+Ljze9PncNH8hHQi/SIfB4nQQNHt/EQAiAAEgAIpF9Ek9+uR+pONn6QH7mtwH/Zd0VTja/qNwsGdW2DdY771HAIgABABjrzs96C8MR9t+kB6YryzgoP/SjrbeGA71TA8jwx32BwJABAgAAUChRb/RH2391rgM+qdyrOX6zP0F0T0H9g8CQAQIAAFAnu0f2BSOtt9UNAP/qb4RONBXZl8hAESAABAA5OU3/sH6cKTztnH7qv9MHWn/ceYpAvsOASACBIAAIMvH+A6lJqcH1atjMfC/0JXhcNc9YWS4035EAIgAASAAOJPH+Y503BLDgf9FPwu0ff+/5hOwTxEAIkAACABe4bG+nemB89uxH/yff5OgnwQQACJAAAgAXu5Gv/4N6QHzX0tm8H/+hEIHepfZxwgAESAABAAvFj3XH8/f+0/fodREjwsiAESAABAAjDqUmlTSA/8LnhLovE0EIABEgAAQABzsXZKYwf933wR0P2LfIwBEgAAQAEme3GdjgefvL17uCUAAiAABIAASerf/rnCs5SuJHPx/e2PgNZ4OQACIAAEgAJL2nH9HONr23eQO/s97RNA8AQgAESAABEBi/HZq38+TmSzoe2YMRACIAAEgABJwx3/PdAP/ixzuutuxgQAogQjoSe25SAAIAE75u39jeLz5iwb9U4hWO3SM8GJDQ92hq3MnMZHq3j3U19vyvwSAAOBFDnfda7B/qZ8C2m9yjEBp+IoAEAA8/5G/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'

    let base64Image_v = base_64_image;

    console.log(base64Image_v)

    const imageBuffer = Buffer.from(base64Image_v, 'base64');

    let url = 'https://objectstorage.us-phoenix-1.oraclecloud.com/p/vTN-YtYueiUERJ4F04LxJl9UW0Z5aRg11Z6l8cSnG45_RGqEhRXA9wNGLMXytliE/n/axgqa3qtoox6/b/Mavericks/o/angel.jpg';


    let options = {
      method: 'PUT',
      headers: {'Content-Type': 'image/jpeg', 'User-Agent': 'insomnia/8.3.0'},
      body: imageBuffer
    };

    // create fetch
    const response = await fetch(url, options)


      const image = "h"
      
      if (!image) {
        throw new Error("Image not found");
      }

      console.log(image)


      res.status(201).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
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

      res.status(201).send({ planogram: planogram, message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}

export default PlanogramController;
