import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  // defino el modelo
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stars: {
        type: DataTypes.ENUM('1', '2', '3', '4','5'),
        defaultValue: '1',
        allowNull: false,
      },
    },
    { timestamps: true }
  )
}
