"use strict";

import { UUID } from "crypto";
import { Model } from "sequelize";

interface StatusAttributes {
  id_Status: UUID;
  estado: string;
  fecha: Date;
  numIntentos: number;
  numProdFallidos: number;
  matrizDiferencias: JSON;
  id_acomodador: UUID;
  id_planograma: UUID;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Status extends Model<StatusAttributes> implements StatusAttributes {
    id_Status!: UUID;
    estado!: string;
    fecha!: Date;
    numIntentos!: number;
    numProdFallidos!: number;
    matrizDiferencias!: JSON;
    id_acomodador!: UUID;
    id_planograma!: UUID;
    id_manager!: UUID;
  }
  Status.init(
    {
      id_Status: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      estado: {
        type: DataTypes.number,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      numIntentos: {
        type: DataTypes.number,
        allowNull: false,
      },
      numProdFallidos: {
        type: DataTypes.number,
        allowNull: false,
      },
      matrizDiferencias: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      id_acomodador: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      id_planograma: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "Status",
      timestamps: true,
    }
  );
  return Status;
};
