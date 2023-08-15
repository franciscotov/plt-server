import { DataTypes, Model, Optional } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";
import seqConnection from "../db/dbInit";
import { ReviewAttributes } from "./interfaces/interfaces";

export interface ReviewInput extends Optional<ReviewAttributes, "id"> {}
export interface ReviewOuput extends Required<ReviewAttributes> {}

class Review
  extends Model<ReviewAttributes, ReviewInput>
  implements ReviewAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public stars!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(lengthValues.title),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(lengthValues.description),
      allowNull: true,
    },
    stars: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      defaultValue: "1",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: seqConnection,
    paranoid: true,
    tableName: modelsKeys.review,
  }
);

export default Review;
