import { Request, Response } from "express";
import { modelsKeys } from "../constants.ts";
import {
  DaysAttributes,
  ReqQuery,
} from "../sequelize/models/interfaces/interfaces.ts";
import Day from "../sequelize/models/Days.ts";

const createDay = async (day: DaysAttributes) => {
  const { label, value } = day;
  try {
    let [newDay, created] = await Day.findOrCreate({
      where: { label, value },
      defaults: { label, value },
    });
    if (!created) {
      return {
        __typename: "error",
        name: "error",
        detail: "Day already exist",
      };
    }
    return {
      __typename: modelsKeys.campus,
      ...newDay.dataValues,
      detail: "day created",
    };
  } catch (error) {
    return {
      __typename: "error",
      name: "error",
      detail: "Day already exist o invalid day",
    };
  }
};

const getDays = async (req: Request, res: Response) => {
  const { offset, limit }: ReqQuery = req.query as unknown as ReqQuery;
  try {
    const { count, rows } = await Day.findAndCountAll({
      where: {},
      offset: Number(offset),
      limit: Number(limit) || 1000,
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    console.log(error, 'error')
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the days list",
    });
  }
};

export { createDay, getDays };
