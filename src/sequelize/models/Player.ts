import { DataTypes, Sequelize } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";

module.exports = (sequelize: Sequelize) => {
  sequelize.define(
    modelsKeys.player,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(lengthValues.name),
        unique: false,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(lengthValues.lastName),
        unique: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
