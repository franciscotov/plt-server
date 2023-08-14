import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues, relationKeys } from "../../constants";
import seqConnection from "../db/dbInit";
import { GameAttributes } from "./interfaces/interfaces";
import Campus from "./Campus";
import Day from "./Days";

export interface GameInput extends Optional<GameAttributes, "id"> {}
export interface GameOuput extends Required<GameAttributes> {}

class Game extends Model<GameAttributes, GameInput> implements GameAttributes {
  public id!: number;
  public name!: string;
  public playersQuantity!: number;
  public initHour!: number;
  public endHour!: number;
  public campusId!: number;
  // day: Day;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Game.init(
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
