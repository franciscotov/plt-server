import { Request, Response } from "express";
import {
  ReqQuery,
} from "../sequelize/models/interfaces/interfaces.ts";
import GameType from "../sequelize/models/GameType.ts";

const getGameTypes = async (req: Request, res: Response) => {
  const { offset, limit }: ReqQuery = req.query as unknown as ReqQuery;
  try {
    const { count, rows } = await GameType.findAndCountAll({
      where: {},
      offset: Number(offset),
      limit: Number(limit) || 1000,
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the gameType list",
    });
  }
};

export { getGameTypes };
