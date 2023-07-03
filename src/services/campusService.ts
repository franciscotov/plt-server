import { CampusAttributes } from "../sequelize/models/interfaces/interfaces";
import { modelsKeys } from "../constants";
import { Campus} from "../db";

const createCampus = async (campus: CampusAttributes) => {
  const { name, adress, lat, lng } = campus;
  try {
    let [newGame, created] = await Campus.findOrCreate({
      where: { name, adress, lat, lng },
      defaults: { name, adress, lat, lng },
    });
    if (!created) {
      newGame.update({ name, adress, lat, lng });
    }
    //
    return {
      __typename: modelsKeys.campus,
      ...newGame.dataValues,
      detail: "campus created",
    };
  } catch (error) {
    return {
      __typename: "error",
      name: "error",
      detail: "Campus already exist o invalid email",
    };
  }
};

export { createCampus };
