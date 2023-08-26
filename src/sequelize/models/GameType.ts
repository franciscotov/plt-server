import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys } from "../../constants.ts";
import seqConnection from "../db/dbInit.ts";
import {
  GameTypeAttributes,
  GameTypeValues,
  GameTypeLabels,
} from "./interfaces/interfaces.ts";

export interface GameTypeInput extends Optional<GameTypeAttributes, "id"> {}
export interface GameTypeOuput extends Required<GameTypeAttributes> {}

class GameType
  extends Model<GameTypeAttributes, GameTypeInput>
  implements GameTypeAttributes
{
  public id!: number;
  public value!: string;
  public label!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

GameType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    value: {
      type: DataTypes.ENUM(
        GameTypeValues.Five.toString(),
        GameTypeValues.Six.toString(),
        GameTypeValues.Seven.toString(),
        GameTypeValues.Eight.toString(),
        GameTypeValues.Nine.toString(),
        GameTypeValues.Eleven.toString()
      ),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    label: {
      type: DataTypes.ENUM(
        GameTypeLabels.Five.toString(),
        GameTypeLabels.Six.toString(),
        GameTypeLabels.Seven.toString(),
        GameTypeLabels.Eight.toString(),
        GameTypeLabels.Nine.toString(),
        GameTypeLabels.Eleven.toString()
      ),
      unique: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.gameType,
  }
);

export default GameType;
