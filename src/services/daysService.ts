import { Request, Response } from "express";
import { modelsKeys } from "../constants";
import { Days } from "../db";
import { DaysAttributes } from "../sequelize/models/interfaces/interfaces";

const createDay = async (day: DaysAttributes) => {
  const { label, value } = day;
  try {
    let [newDay, created] = await Days.findOrCreate({
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

    //
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
  const { offset, limit } = req.query;
  try {
    const { count, rows } = await Days.findAndCountAll({
      where: {},
      offset: offset,
      limit: limit || 1000,
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the days list",
    });
  }
};

export { createDay, getDays };
