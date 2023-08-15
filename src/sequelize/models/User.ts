import { DataTypes, Model, Optional } from "sequelize";
import crypto from "crypto";
import { UserAttributes } from "./interfaces/interfaces";
import {
  modelsKeys,
  commonsKeys,
  lengthValues,
} from "../../constants";
import seqConnection from "../db/dbInit";

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public password!: string;
  public email!: string;
  public address!: string;
  public dni!: string;
  public phoneNumber!: string;
  public google!: boolean;
  public secretOtp!: string;
  public salt!: string;
  public newsletter!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
        return () =>
          this.getDataValue(commonsKeys.password as keyof UserAttributes);
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
        return () =>
          this.getDataValue(commonsKeys.salt as keyof UserAttributes);
      },
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.user,
  }
);

const generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

export const encryptPassword = function (plainText: string, salt: string = "") {
  return crypto
    .createHash(commonsKeys.hash)
    .update(plainText)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user: User) => {
  if (user.changed("password")) {
    user.salt = generateSalt();
    user.password = encryptPassword(
      user.getDataValue("password") || "",
      user.getDataValue("salt") || ""
    );
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

export default User;
