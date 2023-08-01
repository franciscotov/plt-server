import { Sequelize, DataTypes } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";

module.exports = (sequelize: Sequelize) => {
  sequelize.define(
    modelsKeys.campus,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(lengthValues.name),
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(lengthValues.adress),
        unique: false,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        unique: false,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        unique: false,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );
};
