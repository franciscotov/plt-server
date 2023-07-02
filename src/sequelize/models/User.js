// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const { modelsKeys, commonsKeys } = require("../../constants");

module.exports = (sequelize) => {
  const Users = sequelize.define(
    modelsKeys.users,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return () => this.getDataValue(commonsKeys.password);
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      google: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      secretOtp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salt: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue(commonsKeys.salt);
        },
      },
      newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      twoFA: {
        type: DataTypes.BOOLEAN,
      },
    },
    { timestamps: true }
  );

  Users.generateSalt = function () {
    return crypto.randomBytes(16).toString(commonsKeys.base);
  };

  Users.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash(commonsKeys.hash)
      .update(plainText)
      .update(salt)
      .digest(commonsKeys.hex);
  };

  const setSaltAndPassword = (user) => {
    if (user.changed(commonsKeys.password)) {
      user.salt = Users.generateSalt();
      user.password = Users.encryptPassword(user.password(), user.salt());
    }
  };

  Users.beforeCreate(setSaltAndPassword);
  Users.beforeUpdate(setSaltAndPassword);
};
