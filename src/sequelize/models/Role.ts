import { DataTypes, Sequelize } from "sequelize";
import { modelsKeys, lengthValues } from "../../constants";

// module.exports = (sequelize: Sequelize) => {
//   sequelize.define(
//     modelsKeys.role,
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       value: {
//         type: DataTypes.STRING(lengthValues.role),
//         unique: true,
//         allowNull: false,
//       },
//       label: {
//         type: DataTypes.STRING(lengthValues.role),
//         allowNull: false,
//       },
//     },
//     { timestamps: true }
//   );
// };

import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: modelsKeys.role,
})

export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tipo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;
}
