import { foreignKeys, relationKeys } from "./constants.ts";
import connectionDB from "./sequelize/db/dbInit.ts";
import Campus from "./sequelize/models/Campus.ts";
import Day from "./sequelize/models/Days.ts";
import Game from "./sequelize/models/Game.ts";
import List from "./sequelize/models/List.ts";
import Player from "./sequelize/models/Player.ts";
import PlayerList from "./sequelize/models/Player_List.ts";
import Role from "./sequelize/models/Role.ts";
import User from "./sequelize/models/User.ts";

const { userRole, userPlayer, gameCampus, gameDays, listGame, playerId, listPlayer } = foreignKeys;
const { id, value } = relationKeys;

Role.hasOne(User, { sourceKey: id, foreignKey: userRole });
User.belongsTo(Role, { foreignKey: userRole });

User.hasOne(Player, { sourceKey: id, foreignKey: userPlayer });
Player.belongsTo(User, { foreignKey: userPlayer });

Campus.hasMany(Game, { sourceKey: id, foreignKey: gameCampus });
Game.belongsTo(Campus, { foreignKey: gameCampus });

Game.hasOne(List, { sourceKey: id, foreignKey: listGame });
List.belongsTo(Game, {  foreignKey: listGame });

Player.belongsToMany(List, { through: PlayerList, foreignKey: playerId });
List.belongsToMany(Player, { through: PlayerList, foreignKey: listPlayer  });

Day.hasOne(Game, {
  sourceKey: value,
  foreignKey: gameDays,
});
Game.belongsTo(Day, { foreignKey: gameDays });

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
