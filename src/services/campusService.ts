import { CampusAttributes } from "../sequelize/models/interfaces/interfaces";
import { modelsKeys } from "../constants";
import { Campus} from "../db";

const createCampus = async (campus: CampusAttributes) => {
  const { name, adress, lat, lng } = campus;
  try {
    let [newCampus, created] = await Campus.findOrCreate({
      where: { name, adress, lat, lng },
      defaults: { name, adress, lat, lng },
    });
    if (!created) {
      newCampus.update({ name, adress, lat, lng });
    }
    console.log(newCampus, created, 'newGame, created')
    //
    return {
      __typename: modelsKeys.campus,
      ...newCampus.dataValues,
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
