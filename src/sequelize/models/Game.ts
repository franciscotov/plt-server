import { DataTypes, Sequelize } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";

module.exports = (sequelize: Sequelize) => {
  sequelize.define(
    modelsKeys.game,
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
      playersQuantity: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      initHour: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      endHour: {
        type: DataTypes.INTEGER,
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
