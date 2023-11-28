/* 
@Description: Servidor de la aplicación
@Autores: Pablo González, José Ángel García, Erika Marlene
*/

import express, { NextFunction, Request, Response } from "express";
import AbstractController from "../controllers/AbstractController";
import db from "../models";

class Server {
  //Atributos
  private app: express.Application;
  private port: number;
  private env: string;

  //Metodos
  constructor(appInit: {
    port: number;
    env: string;
    middlewares: any[];
    controllers: AbstractController[];
  }) {
    this.app = express();
    this.port = appInit.port;
    this.env = appInit.env;
    this.loadMiddlewares(appInit.middlewares);
    this.loadControllers(appInit.controllers);
  }

  private loadMiddlewares(middlewares: any[]): void {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  private loadControllers(controllers: AbstractController[]) {
    controllers.forEach((controller: AbstractController) => {
      this.app.use(`/${controller.prefix}`, controller.router);
    });

    this.app.use(express.raw({ type: "image/jpeg", limit: "10mb" })); // Adjust the limit according to your needs
  }

  public async init() {
    await db.sequelize.sync();

    this.app.listen(this.port, () => {
      console.log(`Server:Running 🚀 @'http://localhost:${this.port}'`);

      // Log details of the requests
      this.app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} ${req.path}`);
        const startTime = Date.now();

        res.on("finish", () => {
          const duration = Date.now() - startTime;
          console.log(
            `${req.method} ${req.path} ${res.statusCode} ${duration}ms`
          );
        });
        next();
      });
    });

    db.sequelize
      .sync()
      .then(() => {
        console.log("Conectado a la base de datos ✅");
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}

export default Server;
