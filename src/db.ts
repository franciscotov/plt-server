// require("dotenv").config();
import fs from "fs";
import path from "path";
// import { sequelize } from "./sequelize/db/dbInit";
import { relationKeys } from "./constants";
import { GameAttributes } from "./sequelize/models/interfaces/interfaces";
import connectionDB from "./sequelize/db/dbInit";
import { User } from "./sequelize/models/User";
import { Role } from "./sequelize/models/Role";

const basename = path.basename(__filename);

const modelDefiners: any = [];
Role.hasOne(User, { sourceKey: "id" });
User.belongsTo(Role);
// Read all files in the models folder, required them and we add to modelDefiners
// fs.readdirSync(path.join(__dirname, "sequelize/models"))
//   .filter(
//     (file: any) =>
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
//   )
//   .forEach((file: any) => {
//     modelDefiners.push(require(path.join(__dirname, "sequelize/models", file)));
//   });

// // Inject connection(sequelize) for all models
// modelDefiners.forEach((model: any) => model(sequelize));
// // We capitalize the names of the models ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [
//   entry[0][0].toUpperCase() + entry[0].slice(1),
//   entry[1],
// ]);
// sequelize.models = Object.fromEntries(capsEntries);

// Relationate the models
// const { User, Player, Game, Campus, Days, Role } = sequelize.models;

// // Relations
// // Users.hasOne(Player, { through: relationKeys.userPlayer });
// Role.hasOne(User, { through: relationKeys.userRole });
// User.belongsTo(Role);
// Days.hasOne(Game, { through: relationKeys.gameDays });
// Game.belongsTo(Days);
// Campus.hasMany(Game);
// Game.belongsTo(Campus);
// Game.hasMany(Player);

// Game.beforeCreate(async (game: GameAttributes) => {
//   const { campusId, initHour, playersQuantity } = game;

//   // Verifica si existe otro juego en el mismo campus en la misma fecha y hora
//   const existingGame = await Game.findOne({
//     where: {
//       campusId,
//       initHour,
//       playersQuantity,
//     },
//     raw: true,
//   });
//   if (existingGame) {
//     throw new Error(
//       "No se puede crear un juego en el mismo campus en la misma fecha y hora."
//     );
//   }
// });

// // Define el hook "beforeUpdate" para verificar la restricción
// Game.beforeUpdate(async (game: GameAttributes) => {
//   const { campusId, initHour, playersQuantity } = game;

//   // Verifica si existe otro juego en el mismo campus en la misma fecha y hora
//   const existingGame = await Game.findOne({
//     where: {
//       campusId,
//       initHour,
//       playersQuantity,
//     },
//     raw: true,
//   });

//   if (existingGame && existingGame.id !== game.id) {
//     throw new Error(
//       "No se puede actualizar el juego a una fecha y hora ocupada en el mismo campus."
//     );
//   }
// });

// // const models: any = [...sequelize.models];
// const conn = sequelize;

export { connectionDB };
