import { Request, Response } from "express";
import { SignUpPlayerList } from "../sequelize/models/interfaces/interfaces.ts";
import List from "../sequelize/models/List.ts";
import User from "../sequelize/models/User.ts";
import PlayerList from "../sequelize/models/Player_List.ts";
import Player from "../sequelize/models/Player.ts";

const signUpPlayerToList = async (req: Request, res: Response) => {
  const { userEmail, listId } = req.body as SignUpPlayerList;
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error("User email doesn't exist");
    } else {
      // se comprueba si la lista tienes menos de la cantidad maxima de jugadores al momento
      const list = await List.findOne({ where: { id: listId } });
      const playerQuantity = list?.getDataValue("playersQuantity") || 0;
      const totalPlayers = list?.getDataValue("totalPlayers") || 0;
      if (list && playerQuantity < totalPlayers) {
        const player = await Player.findOne({ where: { userId: user.id } });
        if (player) {
          const playerList = await PlayerList.create({
            playerId: player.id,
            listId: list.id,
          });
          if (playerList) {
            list.increment("playersQuantity");
            return res.status(200).send("success");
          } else {
            throw new Error("Can't create player-list");
          }
        } else {
          throw new Error("Player don't exist");
        }
      } else {
        throw new Error("List doesn't exist");
      }
    }
  } catch (error: any) {
    return res.status(400).send({
      __typename: "error",
      name: error.name || "error",
      detail: error?.message || "Cant update game",
    });
  }
};

export { signUpPlayerToList };
