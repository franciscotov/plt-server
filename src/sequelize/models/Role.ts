import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
import seqConnection from "../db/dbInit";
import { RoleAttributes } from "./interfaces/interfaces";

export interface RoleInput extends Optional<RoleAttributes, "id"> {}
export interface RoleOuput extends Required<RoleAttributes> {}

class Role
  extends Model<RoleAttributes, RoleInput>
  implements RoleAttributes
{
  public id!: number;
  public value!: string;
  public label!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.role
  }
);

export default Role;
