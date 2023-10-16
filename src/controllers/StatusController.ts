import { Request, Response } from "express";
import AbstractController from "./AbstractController";

import bd from "../models";

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
      }
      private async postComparedPhotos(req: Request, res: Response) {
        const { estado, matrizDiferencias, id_acomodador, id_planogram } =
          req.body;
    
        try {
          const status = await bd.Status.create({
            estado: estado,
            matrizDiferencias: matrizDiferencias,
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
    }
    export default StatusController;