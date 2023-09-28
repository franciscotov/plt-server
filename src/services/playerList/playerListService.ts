import { Request, Response } from "express";
import {
  createList,
  findList,
  findPlayer,
  findUser,
  validateDataSignUpPlayer,
  validateListNotFull,
} from "./validations.ts";
import {
  PlayerAttributes,
  SignUpPlayerList,
} from "../../sequelize/models/interfaces/interfaces.ts";
import List from "../../sequelize/models/List.ts";

const signUpPlayerToList = async (req: Request, res: Response) => {
  const { userEmail, listId } = req.body as SignUpPlayerList;
  try {
    validateDataSignUpPlayer({ userEmail, listId });
    const user = await findUser(userEmail);
    const list: List = await findList(listId);
    // se comprueba si la lista tienes menos de la cantidad maxima de jugadores al momento
    validateListNotFull(list);
    const player: PlayerAttributes = await findPlayer(user.id);
    await createList({
      playerId: player.id,
      listId: list.id,
    });
    list.increment("playersQuantity");
    return res.status(200).send("success");
  } catch (error: any) {
    return res.status(400).send({
      __typename: "error",
      name: error.name || "error",
      detail: error?.message || "Cant update game",
    });
  }
};

export { signUpPlayerToList };
