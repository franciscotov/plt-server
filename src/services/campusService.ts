import { Request, Response } from "express";
import { modelsKeys } from "../constants";
import { Campus} from "../db";

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

    //
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

export { createCampus };
