import { Request, Response } from "express";
import Game from "../sequelize/models/Game";
import Campus from "../sequelize/models/Campus";
import Day from "../sequelize/models/Days";
import {
  ListAttributes,
  ReqQuery,
} from "../sequelize/models/interfaces/interfaces";
import List from "../sequelize/models/List";
import { Op, WhereOptions } from "sequelize";

const getList = async (req: Request, res: Response) => {
  const { offset, limit }: ReqQuery = req.query as unknown as ReqQuery;
  const offsetNum = Number(offset) * Number(limit);
  try {
    const { count, rows } = await List.findAndCountAll({
      where: {},
      offset: offsetNum,
      limit: Number(limit) || 1000,
      include: [Day, Campus],
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the games list",
    });
  }
};

const getListByCampusId = async (req: Request, res: Response) => {
  const { offset, limit, campusId }: ReqQuery =
    req.query as unknown as ReqQuery;
  const offsetNum = Number(offset) * Number(limit);
  try {
    const games = await Game.findAll({
      where: { campusId },
      attributes: ["id"],
    });
    try {
      if (games && games.length > 0) {
        const opQuery: WhereOptions<ListAttributes> = games.map(({ id }) => ({
          gameId: id,
        }));
        const { count, rows } = await List.findAndCountAll({
          where: { [Op.or]: opQuery, active: true },
          offset: offsetNum,
          limit: Number(limit) || 1000,
          include: [Day, Campus],
        });
        return res.status(200).send({ count, rows });
      }
    } catch (error) {
      throw new Error("no se pudo encontrar el listado")
    }
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the games list",
      error,
    });
  }
};

const updateList = async (req: Request, res: Response) => {
  const { active, id, name, totalPlayers, initHour, endHour } = req.body;
  try {
    const game = await Game.update(
      { active, name, totalPlayers, initHour, endHour },
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

export { getList, updateList, getListByCampusId };
