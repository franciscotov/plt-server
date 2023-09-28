import { ConnectionError, ValidationError } from "../../errors";
import List from "../../sequelize/models/List";
import Player from "../../sequelize/models/Player";
import PlayerList, {
  PlayerListInput,
} from "../../sequelize/models/Player_List";
import User from "../../sequelize/models/User";
import {
  ListAttributes,
  PlayerAttributes,
  SignUpPlayerList,
} from "../../sequelize/models/interfaces/interfaces";

export const validateDataSignUpPlayer = ({
  userEmail,
  listId,
}: SignUpPlayerList) => {
  if (!userEmail) throw new ValidationError("userEmail is required");
  if (!listId) throw new ValidationError("listId is required");
  if (typeof listId !== "number")
    throw new ValidationError("listId must be a number");
};

export const findUser = async (userEmail: string) => {
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) throw new ValidationError("User email doesn't exist");
    return user;
  } catch (e) {
    throw new ConnectionError("Error connection Database");
  }
};

export const findList = async (listId: number): Promise<List> => {
  try {
    const list = await List.findOne({ where: { id: listId } });
    if (!list) {
      throw new ValidationError("List doesn't exist");
    }
    return list;
  } catch (e) {
    throw new ConnectionError("Error connection Database");
  }
};

export const findPlayer = async (userId: number): Promise<PlayerAttributes> => {
  try {
    const player = await Player.findOne({ where: { userId: userId } });
    if (!player) {
      throw new ValidationError("Player don't exist for this user");
    }
    return player as PlayerAttributes;
  } catch (e) {
    throw new ConnectionError("Error connection Database");
  }
};

export const createList = async ({
  playerId,
  listId,
}: PlayerListInput): Promise<void> => {
  try {
    await PlayerList.create({
      playerId,
      listId,
    });
  } catch (_e) {
    throw new ValidationError("Can't create player-list");
  }
};

export const validateListNotFull = (list: List): void => {
  const listDTO = list as ListAttributes;
  if (listDTO.playersQuantity >= listDTO.totalPlayers) {
    throw new ValidationError("The list is full");
  }
};

