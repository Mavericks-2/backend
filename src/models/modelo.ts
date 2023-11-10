"use strict";

import { UUID } from "crypto";
import { Model } from "sequelize";

interface ModelAttributes {
  id_model: UUID;
  accuracy: number;
  fecha: Date;
  matrizProductosE: JSON;
  id_admin: UUID;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Modelo extends Model<ModelAttributes> implements ModelAttributes {
    id_model!: UUID;
    accuracy!: number;
    fecha!: Date;
    matrizProductosE!: JSON;
    id_admin!: UUID;
    static associate(models: any) {
      Modelo.belongsTo(models.Admin, {
        foreignKey: "id_admin",
        as: "modelAdmin",
      });
    }
  }
  Modelo.init(
    {
      id_model: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      accuracy: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      matrizProductosE: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      id_admin: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Modelo",
      timestamps: true,
    }
  );
  return Modelo;
};
