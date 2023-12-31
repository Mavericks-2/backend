/* 
@Description: Modelo de la tabla status
@Autores: Pablo González, José Ángel García, Erika Marlene
*/

"use strict";

import { UUID } from "crypto";
import { Model } from "sequelize";

interface StatusAttributes {
  id_status: UUID;
  estado: string;
  fecha: Date;
  matrizDiferencias: JSON;
  matrizProductosF: JSON;
  id_acomodador: UUID;
  id_planogram: UUID;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Status extends Model<StatusAttributes> implements StatusAttributes {
    id_status!: UUID;
    estado!: string;
    fecha!: Date;
    matrizDiferencias!: JSON;
    matrizProductosF!: JSON;
    id_acomodador!: UUID;
    id_planogram!: UUID;
    static associate(models: any) {
      // define association here
      Status.belongsTo(models.Planogram, {
        foreignKey: "id_planogram",
        as: "statusPlanogram",
      });

      Status.belongsTo(models.Acomodador, {
        foreignKey: "id_acomodador",
        as: "statusAcomodador",
      });
    }
  }
  Status.init(
    {
      id_status: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      matrizDiferencias: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      matrizProductosF: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      id_acomodador: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      id_planogram: {
        type: DataTypes.UUID,
        allowNull: false,
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
