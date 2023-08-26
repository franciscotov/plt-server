import { Request, Response } from "express";
import { modelsKeys } from "../constants.ts";
import Campus from "../sequelize/models/Campus.ts";
import { ReqQuery } from "../sequelize/models/interfaces/interfaces.ts";

const createCampus = async (req: Request, res: Response) => {
  const { name, address, lat, lng } = req.body;
  try {
    let [newCampus, created] = await Campus.findOrCreate({
      where: { name, address, lat, lng },
      defaults: { name, address, lat, lng },
    });

    if (!created) {
      return res.status(400).send({
        __typename: "error",
        name: "error",
        detail: "Campus already exist",
      });
    }

    return res.status(200).send({
      __typename: modelsKeys.campus,
      ...newCampus.dataValues,
      detail: "campus created",
    });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Campus already exist o invalid email",
    });
  }
};

const getCampus = async (req: Request, res: Response) => {
  const { offset, limit }: ReqQuery = req.query as unknown as ReqQuery;
  const offsetNum = Number(offset) * (Number(limit));
  try {
    const { count, rows } = await Campus.findAndCountAll({
      where: {},
      offset: offsetNum,
      limit: limit || 1000,
    });
    return res.status(200).send({ count, rows });
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant get the campus list",
    });
  }
};

const updateCampus = async (req: Request, res: Response) => {
  const { active, id, name, address, lat, lng } = req.body;
  try {
    const campus = await Campus.update(
      { active, name, address, lat, lng },
      {
        where: { id: id },
      }
    );
    return res.status(200).send(campus);
  } catch (error) {
    return res.status(400).send({
      __typename: "error",
      name: "error",
      detail: "Cant update campus",
    });
  }
};

export { createCampus, getCampus, updateCampus };
