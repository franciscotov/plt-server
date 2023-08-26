import Player, { PlayerInput } from "../sequelize/models/Player";
import { UserAttributes } from "../sequelize/models/interfaces/interfaces";

const createPlayer = async (user: UserAttributes): Promise<Player> => {
  const playerToCreate: PlayerInput = {
    name: user.name,
    lastname: user.lastname,
  };

  const player = await Player.create(playerToCreate);
  return player;
};

export { createPlayer };
