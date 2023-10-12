"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";

interface ColaboradorAttributes {
  id_Colaborador: UUID;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  correo: string;
  awsCognitoId: string;
  role: string;
  id_manager: UUID;
}

export enum Roles {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLABORADOR = "COLABORADOR",
  ACOMODADOR = "ACOMODADOR",
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Colaborador extends Model<ColaboradorAttributes> implements ColaboradorAttributes {
    id_Colaborador!: UUID;
    nombre!: string;
    apellidoP!: string;
    apellidoM!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
    id_manager!: UUID;
  }
  Colaborador.init(
    {
     id_Colaborador: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidoP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidoM: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      awsCognitoId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id_manager: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Roles.COLABORADOR,
      },
    },
    {
      sequelize,
      modelName: "Colaborador",
    }
  );
  return Colaborador;
};
