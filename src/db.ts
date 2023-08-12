import connectionDB from "./sequelize/db/dbInit";

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

export { connectionDB };
