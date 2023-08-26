import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants.ts";
import seqConnection from "../db/dbInit.ts";
import { DaysAttributes } from "./interfaces/interfaces.ts";

export interface DayInput extends Optional<DaysAttributes, "id"> {}
export interface DayOuput extends Required<DaysAttributes> {}

class Day extends Model<DaysAttributes, DayInput> implements DaysAttributes {
  public id!: number;
  public value!: number;
  public label!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Day.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    value: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(lengthValues.labelDay),
      unique: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.days,
  }
);

export default Day;
