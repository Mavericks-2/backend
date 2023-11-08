import { Router } from "express";

// Middlewares
import ValidationErrorMiddleware from "../middlewares/validationError";
import AuthMiddleware from "../middlewares/authorization";
import PermissionMiddleware from "../middlewares/permission";

// Servicios
import CognitoService from "../services/cognitoService";

export default abstract class AbstractController {
  private _router: Router = Router();
  private _prefix: string;

  protected handleErrors = ValidationErrorMiddleware.handleErrors;
  protected authMiddleware = AuthMiddleware.getInstance();
  protected permissionMiddleware = PermissionMiddleware.getInstance();
  protected cognitoService = CognitoService.getInstance();

  public get router(): Router {
    return this._router;
  }

  public get prefix(): string {
    return this._prefix;
  }

  protected constructor(prefix: string) {
    this._prefix = prefix;
    this.initRoutes();
  }

  // Inicializar las rutas
  protected abstract initRoutes(): void;

  // Validar el body de la petición
  protected abstract validateBody(type: any): any;

  protected convertLongTextToJSON(element: any) {
    const newElement : any = {...element}; 
    Object.keys(newElement).forEach((key) => {
      console.log("KEY", key);
      if (typeof newElement[key] === "string") {
        console.log("STRING", newElement[key]);
        if (newElement[key].startsWith("{") || newElement[key].startsWith("[")) {
          console.log("JSON", newElement[key]);
          newElement[key] = JSON.parse(newElement[key].replace(/'/g, '"'));
        }
      }
    });
    
    return newElement;
  }
}
