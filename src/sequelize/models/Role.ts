import { DataTypes, Sequelize } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";

module.exports = (sequelize: Sequelize) => {
  sequelize.define(
    modelsKeys.role,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING(lengthValues.role),
        unique: true,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(lengthValues.role),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
