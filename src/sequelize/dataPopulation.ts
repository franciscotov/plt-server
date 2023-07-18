import {
  CampusAttributes,
  GameAttributes,
  UserBase,
} from "./models/interfaces/interfaces";
import { createUser } from "../services/userService";
import { createCampus } from "../services/campusService";
import { createGame } from "../services/gameService";

const dataPopulation = async () => {
  //   await Category.bulkCreate(MOCK_CATEOGRIES),
  //     await Product.bulkCreate(MOCK_PRODUCTS);
  //   await Promo.bulkCreate(MOCK_PROMOS);
  const user: UserBase = {
    name: "admin",
    lastname: "admin",
    password: "12345",
    email: "fran@admin.com",
    role: "admin",
    google: false,
  };

  const game: GameAttributes = {
    name: "admin",
    type: 1,
    date: 1,
    initHour: 10,
    endHour: 11,
    campusId: 1,
  };

  const campus: CampusAttributes = {
    name: "first place",
    adress: "Banco Nacion",
    lat: 14.34,
    lng: 14.98,
  };

  await createUser(user);

  await createCampus(campus);

  const game1 = await createGame(game);
  const game2 = await createGame(game);
  console.log(game1, "game1, ");
  console.log(game2, ", game2");
  // await modifyUser(6,null,null,null,null,null,null,null, null, true);

  //Pruebas no debe ir
  // const user = await Users.findOne({
  //   where: {
  //     id: 2,
  //   },
  // });
  // user.secretOtp = "HBGSUVDMHZLDY7JVMZASULZOIFPCSZKR";
  // user.save();

  return true;
};

export { dataPopulation };
