"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";
import {Roles} from "./manager";

interface AdminAttributes {
  id_admin: UUID;
  nombre: string;
  apellido: string;
  correo: string;
  awsCognitoId: string;
  role: string;
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model<AdminAttributes> implements AdminAttributes {
    id_admin!: UUID;
    nombre!: string;
    apellido!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
  }
  Admin.init(
    {
     id_admin: {
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
