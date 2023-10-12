"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";

interface ManagerAttributes {
  id_Manager: UUID;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  correo: string;
  awsCognitoId: string;
  role: string;
  id_admin: UUID;
}

export enum Roles {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLABORADOR = "COLABORADOR",
  ACOMODADOR = "ACOMODADOR",
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Manager extends Model<ManagerAttributes> implements ManagerAttributes {
    id_Manager!: UUID;
    nombre!: string;
    apellidoP!: string;
    apellidoM!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
    id_admin!: UUID;
  }
  Manager.init(
    {
     id_Manager: {
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
      id_admin: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Roles.ADMIN,
      },
    },
    {
      sequelize,
      modelName: "Manager",
    }
  );
  return Manager;
};
