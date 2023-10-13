"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";

interface AcomodadorAttributes {
  id_acomodador: UUID;
  nombre: string;
  apellido: string;
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
  class Acomodador extends Model<AcomodadorAttributes> implements AcomodadorAttributes {
    id_acomodador!: UUID;
    nombre!: string;
    apellido!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
    id_manager!: UUID;
  }
  Acomodador.init(
    {
     id_acomodador: {
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
        defaultValue: Roles.ACOMODADOR,
      },
    },
    {
      sequelize,
      modelName: "Acomodador",
    }
  );
  return Acomodador;
};
