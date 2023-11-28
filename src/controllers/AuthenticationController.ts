/* 
@Description: Controlador de autenticación con rutas para el registro, 
login y verificación de usuarios
@Autores: Pablo González, José Ángel García, Erika Marlene

@export: Clase AuthenticationController
*/

import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import bd from "../models";

class AuthenticationController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }

  // Singleton
  private static instance: AuthenticationController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AuthenticationController("auth");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/signup", this.signup.bind(this));
    this.router.post("/verify", this.verify.bind(this));
    this.router.post("/signin", this.signin.bind(this));
    this.router.post("/getUser", this.getUser.bind(this));
    this.router.post("/signupAcomodador", this.signupAcomodador.bind(this));
    this.router.post("/verifyAcomodador", this.verifyAcomodador.bind(this));
    this.router.post("/signinAcomodador", this.signinAcomodador.bind(this));
    this.router.post("/getUserAcomodador", this.getUserAcomodador.bind(this));
    this.router.post("/forgotPassword", this.forgotPassword.bind(this));
    this.router.post("/confirmForgotPassword", this.changePassword.bind(this));
  }

  private async getUser(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await bd.Manager.findOne({
        where: {
          correo: email,
        },
      });


      res.status(200).send({ message: "okay", user: user });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const login = await this.cognitoService.signInUser(email, password);
      res.status(200).send({ ...login.AuthenticationResult });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
  private async verify(req: Request, res: Response) {
    const { email, verifyCode } = req.body;
    try {
      await this.cognitoService.verifyUser(email, verifyCode);
      res.status(200).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async signup(req: Request, res: Response) {
    const { email, password, name, lastName } = req.body;
    try {
      // Crear el usuario de cognito
      const userSignUp = await this.cognitoService.signUpUser(email, password, [
        {
          Name: "email",
          Value: email,
        },
      ]);

      if (!userSignUp) {
        throw new Error("Error creating user in Cognito");
      }

      const user = await bd.Manager.create({
        nombre: name,
        apellido: lastName,
        correo: email,
        awsCognitoId: userSignUp.UserSub,
        id_admin: "550e8400-e29b-41d4-a716-446655440000",
        role: "MANAGER",
      });

      if (!user) {
        throw new Error("Error creating user");
      }

      res.status(201).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async getUserAcomodador(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await bd.Acomodador.findOne({
        where: {
          correo: email,
        },
      });


      res.status(200).send({ message: "okay", user: user });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async signinAcomodador(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const login = await this.cognitoService.signInUser(email, password);
      res.status(200).send({ ...login.AuthenticationResult });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async verifyAcomodador(req: Request, res: Response) {
    const { email, verifyCode } = req.body;
    try {
      await this.cognitoService.verifyUser(email, verifyCode);
      res.status(200).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async signupAcomodador(req: Request, res: Response) {
    const { email, password, name, lastName } = req.body;
    try {
      // Crear el usuario de cognito
      const userSignUp = await this.cognitoService.signUpUser(email, password, [
        {
          Name: "email",
          Value: email,
        },
      ]);

      if (!userSignUp) {
        throw new Error("Error creating user in Cognito");
      }

      const manager = await bd.Manager.findOne();

      const user = await bd.Acomodador.create({
        nombre: name,
        apellido: lastName,
        correo: email,
        awsCognitoId: userSignUp.UserSub,
        id_manager: manager.id_manager,
        role: "ACOMODADOR",
      });

      if (!user) {
        throw new Error("Error creating user");
      }

      res.status(201).send({ message: "ok" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const forgotten_code = await this.cognitoService.forgotPassword(email);
      res.status(200).send({ message: forgotten_code });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async changePassword(req: Request, res: Response) {
    const { email, code, newPassword } = req.body;
    try {
      const change = await this.cognitoService.confirmForgotPassword(
        email,
        code,
        newPassword
      );
      res.status(200).send({ message: "okay" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}

export default AuthenticationController;
