import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants.ts";
import seqConnection from "../db/dbInit.ts";
import { PlayerListAttributes } from "./interfaces/interfaces.ts";

export interface PlayerListInput extends Optional<PlayerListAttributes, "id"> {}
export interface PlayerListOuput extends Required<PlayerListAttributes> {}

class PlayerList extends Model<PlayerListAttributes, PlayerListInput> implements PlayerListAttributes {
  public id!: number;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

PlayerList.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.playerList,
  }
);

export default PlayerList;
