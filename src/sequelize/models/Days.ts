import { Sequelize, DataTypes } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";

module.exports = (sequelize: Sequelize) => {
  sequelize.define(
    modelsKeys.days,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING(lengthValues.valueDay),
        unique: true,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(lengthValues.labelDay),
        unique: false,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
