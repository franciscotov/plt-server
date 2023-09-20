import Player from "../sequelize/models/Player.ts";
import { PlayerWithUser, UserAttributes } from "../sequelize/models/interfaces/interfaces.ts";

const createPlayer = async (user: UserAttributes): Promise<Player> => {
  const playerToCreate: PlayerWithUser = {
    name: user.name,
    lastname: user.lastname,
    userId: user.id,
  };

  const player = await Player.create(playerToCreate);
  return player;
};

export { createPlayer };
