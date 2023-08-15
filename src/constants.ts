export const modelsKeys = {
  user: "users",
  campus: "campuses",
  game: "games",
  player: "players",
  days: "days",
  role: "roles",
  review: "reviews",
  list: "list",
  playerList: "player_list",
  gameType: "gameType"
};

export const commonsKeys = {
  password: "password",
  salt: "salt",
  hash: "RSA-SHA256",
  postgres: "postgres",
};

export const relationKeys = {
  id: "id",
  value: "value",
};

export const foreignKeys = {
  userPlayer: "userId",
  userRole: "roleId",
  gameCampus: "campusId",
  gameDays: "dayValue",
  playerId: "playerId",
  listPlayer: "listId",
  listGame: "gameId",
  // playerGame: "playerId",
};

export const lengthValues = {
  name: 50,
  lastName: 50,
  adress: 200,
  password: 100,
  email: 150,
  role: 50,
  dni: 50,
  phone: 50,
  day: 20,
  labelDay: 20,
  valueDay: 20,
  title: 100,
  description: 200,
};
