"use strict";

import { UUID } from "crypto";
import { Model } from "sequelize";

interface Planogramttributes {
  id_planogram: UUID;
  url_imagen: string;
  fecha_creacion: Date;
  coordenadas: JSON;
  id_manager: UUID;
  matriz_posiciones: JSON;
  lineas: JSON;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Planogram
    extends Model<Planogramttributes>
    implements Planogramttributes
  {
    id_planogram!: UUID;
    url_imagen!: string;
    fecha_creacion!: Date;
    coordenadas!: JSON;
    id_manager!: UUID;
    matriz_posiciones!: JSON;
    lineas!: JSON;
    static associate(models:any) {
      // define association here
      Planogram.belongsTo(models.Manager, {
        foreignKey: "id_manager",
        as: "planogramManager",
      });
    }
  }
  Planogram.init(
    {
      id_planogram: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      url_imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      coordenadas: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      id_manager: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      matriz_posiciones: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      lineas: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    }, 
    {
      sequelize,
      modelName: "Planogram",
      timestamps: true,
    }
  );
  return Planogram;
};
