"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";
// import {Roles} from "./admin";
interface ManagerAttributes {
  id_manager: UUID;
  nombre: string;
  apellido: string;
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
    id_manager!: UUID;
    nombre!: string;
    apellido!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
    id_admin!: UUID;
    static associate(models:any) {
      // define association here
      Manager.belongsTo(models.Admin, {
        foreignKey: "id_admin",
        as: "managerAdmin",
      });
    }
  }
  Manager.init(
    {
     id_manager: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
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
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Roles.MANAGER,
      },
    },
    {
      sequelize,
      modelName: "Manager",
    }
  );
  return Manager;
};
