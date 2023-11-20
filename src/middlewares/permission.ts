/* 
@Description: Middleware para verificar permisos de usuario
@Autores: Pablo González, José Ángel García, Erika Marlene
*/

import { Response, Request, NextFunction } from "express";
// Models
import { HydratedDocument } from "mongoose";
import db from "../models";

export default class PermissionMiddleware {
  // Singleton
  private static instance: PermissionMiddleware;
  public static getInstance(): PermissionMiddleware {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PermissionMiddleware();
    return this.instance;
  }

  /**
   * Verify that the current user is an Admin
   */
  public async checkIsAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { aws_cognito } = req;
      /*
      TODO: Corregir validación de usuarios
      const user = await db.User.findOne({
        where: { awsCognitoId: aws_cognito },
      });

      if (!user) {
        throw "Failed to find user";
      }

      if (user.role === "ADMIN") {
        next();
      } else {
        res.status(401).send({
          code: "UserNotAdminException",
          message: "The logged account is not an admin",
        });
      }*/
      next();
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}
