import { DataTypes, Sequelize, Model, ModelCtor } from "sequelize";
import crypto  from "crypto";
import { UserAttributes } from "./interfaces/interfaces";
import { modelsKeys, commonsKeys, lengthValues } from "../../constants";

 interface UserI extends Model<UserAttributes>, UserAttributes {
  // Aquí puedes agregar métodos o propiedades de instancia si es necesario
}

export interface UsersModel extends ModelCtor<UserI> {
  generateSalt(): string;
  encryptPassword(plainText: string, salt: string): string;
}

module.exports = (sequelize: Sequelize) => {
  const Users = <UsersModel>sequelize.define(
    modelsKeys.user,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(lengthValues.name),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(lengthValues.lastName),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return () => this.getDataValue(commonsKeys.password as keyof UserAttributes);
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
      address: {
        type: DataTypes.STRING(lengthValues.adress),
      },
      dni: {
        type: DataTypes.STRING(lengthValues.dni),
      },
      phoneNumber: {
        type: DataTypes.STRING(lengthValues.phone),
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
          return () => this.getDataValue(commonsKeys.salt as keyof UserAttributes);
        },
      },
      newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );

  Users.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
  };

  Users.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash(commonsKeys.hash)
      .update(plainText)
      .update(salt)
      .digest('hex');
  };

  const setSaltAndPassword = (user: any) => {
    if (user.changed(commonsKeys.password)) {
      user.salt = Users.generateSalt();
      user.password = Users.encryptPassword(user.password(), user.salt());
    }
  };

  Users.beforeCreate(setSaltAndPassword);
  Users.beforeUpdate(setSaltAndPassword);
};
