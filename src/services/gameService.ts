import { Request, Response } from "express";
import { Game } from "../db";

async function createGame(req: Request, res: Response) {
  // ver si se pueden tomar los datos de error para mapear mejor
  const { name, playersQuantity, initHour, endHour, campusId } = req.body;
  try {
    let [newGame, created] = await Game.findOrCreate({
      where: { name, playersQuantity, initHour, endHour, campusId },
      defaults: { name, playersQuantity, initHour, endHour, campusId },
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
  const offsetNum = Number(offset) * (Number(limit));
  try {
    const { count, rows } = await Game.findAndCountAll({
      where: {},
      offset: offsetNum,
      limit: limit || 1000,
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    console.log(error, 'rows')
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the games list",
    });
  }
};

const updateGame = async (req: Request, res: Response) => {
  const { active, id, name, playersQuantity, initHour, endHour } = req.body;
  try {
    const game = await Game.update(
      { active, name, playersQuantity, initHour, endHour },
      {
        where: { id: id },
      }
    );
    return res.status(200).send(game);
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant update game",
    });
  }
};

export { createGame, getGames, updateGame };
