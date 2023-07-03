import { GameAttributes } from "../sequelize/models/interfaces/interfaces";
import { Game } from "../db";

async function createGame(game: GameAttributes) {
  const { name, type, date, initHour, endHour } = game;
  try {
    let [newGame, created] = await Game.findOrCreate({
      where: { name, type, date, initHour, endHour },
      defaults: { name, type, date, initHour, endHour },
    });
    if (!created) {
      newGame.update({ name, type, date, initHour, endHour });
    }
    //
    return {
      __typename: "user",
      ...newGame.dataValues,
      detail: "game created",
    };
  } catch (error) {
    return {
      __typename: "error",
      name: "error",
      detail: "Email already exist o invalid email",
    };
  }
}

module.exports = {
  createGame,
};
