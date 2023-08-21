import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
import seqConnection from "../db/dbInit";
import { GameAttributes, GameTypeValues } from "./interfaces/interfaces";

export interface GameInput extends Optional<GameAttributes, "id" | "name"> {}
export interface GameOuput extends Required<GameAttributes> {}

class Game extends Model<GameAttributes, GameInput> implements GameAttributes {
  public id!: number;
  public name!: string;
  public totalPlayers!: number;
  public initHour!: number;
  public endHour!: number;
  public campusId!: number;
  public active!: boolean;
  // day: Day;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Game.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.game,
  }
);

export default Game;
