import { UserBase } from "./models/interfaces/interfaces";
import { createUser } from "../services/userService";
import { createCampus } from "../services/campusService";

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

  await createUser(user);

  await createCampus({
    name: "Campus A",
    adress: "conesa 4586",
    lat: 19.222,
    lng: 15.0,
  });

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
