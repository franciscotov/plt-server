import { Request, Response } from "express";
import { GameAttributes } from "../sequelize/models/interfaces/interfaces";
import { Game } from "../db";

async function createGame(req: Request, res: Response) {
  const { name, type, date, initHour, endHour, campusId, day } = req.body;
  try {
    let [newGame, created] = await Game.findOrCreate({
      where: { name, type, date, initHour, endHour, campusId, day },
      defaults: { name, type, date, initHour, endHour, campusId, day },
    });
    if (!created) {
      return res.status(400).send({
        __typename: "error",
        name: "error",
        detail: "Ya existe un juego con los mismos atributos",
      });
    }
    //
    return res.status(400).send({
      __typename: "user",
      ...newGame.dataValues,
      detail: "game created",
    });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Ocurrio un error al intentar crear el juego",
    });
  }
}

export { createGame };
