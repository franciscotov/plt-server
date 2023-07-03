import { GameAttributes } from "../sequelize/models/interfaces/interfaces";
import { Game } from "../db";

async function createGame(game: GameAttributes) {
  const { name, type, date, initHour, endHour, campusId } = game;
  try {
    let [newGame, created] = await Game.findOrCreate({
      where: { name, type, date, initHour, endHour, campusId },
      defaults: { name, type, date, initHour, endHour, campusId },
    });
    if (!created) {
      return {
        __typename: "error",
        name: "error",
        detail: "Ya existe un juego con los mismos atributos",
      };
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
      detail: "Ocurrio un error al intentar crear el juego",
    };
  }
}

export { createGame };
