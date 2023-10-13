"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";

interface AdminAttributes {
  id_Admin: UUID;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  correo: string;
  awsCognitoId: string;
  role: string;
}

export enum Roles {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLABORADOR = "COLABORADOR",
  ACOMODADOR = "ACOMODADOR",
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model<AdminAttributes> implements AdminAttributes {
    id_Admin!: UUID;
    nombre!: string;
    apellidoP!: string;
    apellidoM!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
  }
  Admin.init(
    {
     id_Admin: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Roles.ADMIN,
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
