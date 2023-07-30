import { Request, Response } from "express";
import { Game } from "../db";

async function createGame(req: Request, res: Response) {
  // ver si se pueden tomar los datos de error para mapear mejor
  const { name, playersQuantity, initHour, endHour, campusId, day } = req.body;
  try {
    let [newGame, created] = await Game.findOrCreate({
      where: { name, playersQuantity, initHour, endHour, campusId, day },
      defaults: { name, playersQuantity, initHour, endHour, campusId, day },
    });
    if (!created) {
      return res.status(400).send({
        name: "error",
        detail: "Ya existe un juego con los mismos atributos",
      });
    }
    //
    return res.status(200).send({
      ...newGame.dataValues,
      detail: "game created",
    });
  } catch (error) {
    return res.status(400).send({
      name: "error",
      detail: "Ocurrio un error al intentar crear el juego",
    });
  }
}

const getGames = async (req: Request, res: Response) => {
  const { offset, limit } = req.query;
  try {
    const { count, rows } = await Game.findAndCountAll({
      where: {},
      offset: offset,
      limit: limit || 1000,
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the games list",
    });
  }
}

export { createGame , getGames};
