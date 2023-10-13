"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";
import {Roles} from "./manager";

interface ColaboradorAttributes {
  id_colaborador: UUID;
  nombre: string;
  apellido: string;
  correo: string;
  awsCognitoId: string;
  role: string;
  id_manager: UUID;
}



module.exports = (sequelize: any, DataTypes: any) => {
  class Colaborador extends Model<ColaboradorAttributes> implements ColaboradorAttributes {
    id_colaborador!: UUID;
    nombre!: string;
    apellido!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
    id_manager!: UUID;
  }
  Colaborador.init(
    {
     id_colaborador: {
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
