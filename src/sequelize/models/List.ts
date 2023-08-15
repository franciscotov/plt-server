import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
import seqConnection from "../db/dbInit";
import { GameTypeValues, ListAttributes } from "./interfaces/interfaces";

export interface ListInput extends Optional<ListAttributes, "id"> {}
export interface ListOuput extends Required<ListAttributes> {}

class List extends Model<ListAttributes, ListInput> implements ListAttributes {
  public id!: number;
  public name!: string;
  public totalPlayers!: number;
  public playersQuantity!: number;
  public initHour!: number;
  public endHour!: number;
  // day: Day;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

List.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(lengthValues.name),
      unique: false,
      allowNull: false,
    },
    totalPlayers: {
      type: DataTypes.ENUM(
        GameTypeValues.Five.toString(),
        GameTypeValues.Six.toString(),
        GameTypeValues.Seven.toString(),
        GameTypeValues.Eight.toString(),
        GameTypeValues.Nine.toString(),
        GameTypeValues.Eleven.toString()
      ),
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
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.list,
  }
);

export default List;
