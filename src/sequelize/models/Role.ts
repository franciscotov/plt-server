import { modelsKeys, lengthValues } from "../../constants";
import { DataTypes, Model, Optional } from "sequelize";
import seqConnection from "../db/dbInit";

interface RoleAttributes {
  id: number;
  value: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
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
  }
);

export default Role;

// module.exports = (sequelize: Sequelize) => {
//   sequelize.define(
//     modelsKeys.role,
//     {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   value: {
//     type: DataTypes.STRING(lengthValues.role),
//     unique: true,
//     allowNull: false,
//   },
//   label: {
//     type: DataTypes.STRING(lengthValues.role),
//     allowNull: false,
//   },
// },
//     { timestamps: true }
//   );
// };

// import { Table, Model, Column, DataType } from "sequelize-typescript";

// @Table({
//   timestamps: false,
//   tableName: modelsKeys.role,
// })

// export class Role extends Model {
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     primaryKey: true,
//   })
//   id!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   name!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   lastname!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   tipo!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   image!: string;
// }
