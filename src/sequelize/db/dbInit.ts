import { commonsKeys } from "../../constants";
// const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL, DB_NAME } = process.env;

// let sequelize: any = [];

// if (DATABASE_URL) {
//   const URLDB = DATABASE_URL;
//   sequelize = new Sequelize(URLDB, {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     dialect: commonsKeys.postgres,
//     protocol: commonsKeys.postgres,
//     dialectOptions: {
//       native: true,
//       ssl: false,
//     },
//   });
// } else {
//   sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
//     {
//       logging: false, // set to
//       native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     }
//   );
// }

// // module.exports = {
// //   sequelize,
// // };

// export { sequelize };
import { Sequelize } from "sequelize-typescript";
import { dataPopulation } from "../dataPopulation";
import { Role } from "../models/Role";
import { User } from "../models/User";

const connection = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASSWORD,
  storage: ":memory:",
  // models: [__dirname + "/models"], // or [Player, Team],
  models: [Role, User]
});

async function connectionDB() {
  try {
    let res = await connection.sync().then(async () => {
      await dataPopulation();
      console.log("Iniciadoooo");
    });
    // if (res) {
    //   console.log("Iniciado");
    // }
  } catch (error) {
    console.log(error);
  }
}

export default connectionDB;
