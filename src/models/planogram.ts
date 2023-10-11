"use strict";

import { UUID } from "crypto";
import { Model } from "sequelize";

interface Planogramttributes {
  id_Planogram: UUID;
  url_imagen: string;
  fecha_creacion: Date;
  coordenadas: JSON;
  id_manager: UUID;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Planogram
    extends Model<Planogramttributes>
    implements Planogramttributes
  {
    id_Planogram!: UUID;
    url_imagen!: string;
    fecha_creacion!: Date;
    coordenadas!: JSON;
    id_manager!: UUID;
  }
  Planogram.init(
    {
      id_Planogram: {
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
        defaultValue: DataTypes.UUIDV4,
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
