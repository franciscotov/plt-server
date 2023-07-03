import { Sequelize } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
const { DataTypes } = require("sequelize");

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
      adress: {
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
    },
    { timestamps: true }
  );
};
