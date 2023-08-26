import Player, { PlayerInput } from "../sequelize/models/Player.ts";
import { UserAttributes } from "../sequelize/models/interfaces/interfaces.ts";

const createPlayer = async (user: UserAttributes): Promise<Player> => {
  const playerToCreate: PlayerInput = {
    name: user.name,
    lastname: user.lastname,
  };

  const player = await Player.create(playerToCreate);
  return player;
};

export { createPlayer };
