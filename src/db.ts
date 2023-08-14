import { relationKeys } from "./constants";
import connectionDB from "./sequelize/db/dbInit";
import Campus from "./sequelize/models/Campus";
import Day from "./sequelize/models/Days";
import Game from "./sequelize/models/Game";
import Player from "./sequelize/models/Player";
import Role from "./sequelize/models/Role";
import User from "./sequelize/models/User";

Role.hasOne(User, { sourceKey: "id" });
User.belongsTo(Role);

User.hasOne(Player, { sourceKey: "id" });
Player.belongsTo(User);

Campus.hasMany(Game);
Game.belongsTo(Campus);
Game.hasMany(Player);
Day.hasOne(Game, { sourceKey: relationKeys.gameDays });
Game.belongsTo(Day);

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

export { connectionDB };
