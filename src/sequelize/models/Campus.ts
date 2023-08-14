import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
import seqConnection from "../db/dbInit";
import { CampusAttributes } from "./interfaces/interfaces";

export interface CampusInput extends Optional<CampusAttributes, "id"> {}
export interface CampusOuput extends Required<CampusAttributes> {}

class Campus
  extends Model<CampusAttributes, CampusInput>
  implements CampusAttributes
{
  public id!: number;
  public name!: string;
  public address!: string;
  public lat!: number;
  public lng!: number;
  public active!: boolean;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Campus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(lengthValues.name),
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(lengthValues.adress),
      unique: false,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      unique: false,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
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
    tableName: modelsKeys.campus,
  }
);

export default Campus;
