import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
import seqConnection from "../db/dbInit";
import { PlayerAttributes } from "./interfaces/interfaces";

export interface PlayerInput extends Optional<PlayerAttributes, "id"> {}
export interface PlayerOuput extends Required<PlayerAttributes> {}

class Player
  extends Model<PlayerAttributes, PlayerInput>
  implements PlayerAttributes
{
  public id!: number;
  public name!: string;
  public lastname!: string;
  // public userId!: number;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Player.init(
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
    lastname: {
      type: DataTypes.STRING(lengthValues.lastName),
      unique: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.player,
  }
);

export default Player;
