/* 
@Description: Modelo de la tabla colaborador
@Autores: Pablo González, José Ángel García, Erika Marlene
*/

"use strict";

import { Model } from "sequelize";
import { UUID } from "crypto";
// import {Roles} from "./admin";

interface ColaboradorAttributes {
  id_colaborador: UUID;
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
  class Colaborador
    extends Model<ColaboradorAttributes>
    implements ColaboradorAttributes
  {
    id_colaborador!: UUID;
    nombre!: string;
    apellido!: string;
    correo!: string;
    awsCognitoId!: string;
    role!: string;
    id_manager!: UUID;
    static associate(models: any) {
      // define association here
      Colaborador.belongsTo(models.Manager, {
        foreignKey: "id_manager",
        as: "colaboradorManager",
      });
    }
  }
  Colaborador.init(
    {
      id_colaborador: {
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
      id_manager: {
        type: DataTypes.UUID,
        allowNull: false,
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
