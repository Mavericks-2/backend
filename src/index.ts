import express from "express";
import cors from "cors";
import Server from "./providers/Server";
import AuthenticationController from "./controllers/AuthenticationController";

const servidor = new Server({
  port: 8080,
  middlewares: [express.json(), express.urlencoded({ extended: true }), cors()],
  controllers: [AuthenticationController.getInstance()],
  env: "development",
});

declare global {
  namespace Express {
    interface Request {
      aws_cognito: string;
      token: string;
    }
  }
}

servidor.init();
