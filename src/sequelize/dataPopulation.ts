import { Request, Response } from "express";
import {
  CampusAttributes,
  Day,
  DaysAttributes,
  GameAttributes,
  UserBase,
} from "./models/interfaces/interfaces";
import { createUser } from "../services/userService";
import { createDay } from "../services/daysService";

const dataPopulation = async () => {
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
    playersQuantity: 1,
    initHour: 10,
    endHour: 11,
    campusId: 1,
    day: Day.Lunes,
  };

  const campus: CampusAttributes = {
    name: "first place",
    address: "Banco Nacion",
    lat: 14.34,
    lng: 14.98,
  };

  const daysToCreate: DaysAttributes[] = [
    {
      label: "Lunes",
      value: Day.Lunes,
    },
    {
      label: "Martes",
      value: Day.Martes,
    },
    {
      label: "Miércoles",
      value: Day.Miercoles,
    },
    {
      label: "Jueves",
      value: Day.Jueves,
    },
    {
      label: "Viernes",
      value: Day.Viernes,
    },
    {
      label: "Sabado",
      value: Day.Sabado,
    },
    {
      label: "Domingo",
      value: Day.Domingo,
    },
  ];

  // const res = new Response();
  // const req = new Request(game);

  await createUser(user);
  daysToCreate.forEach(async (day: DaysAttributes) => {
    await createDay(day);
  });

  // await createCampus(campus);

  // const game1 = await createGame({ body: game }, {});
  // const game2 = await createGame(game, res);
  // console.log(game1, "game1, ");
  // console.log(game2, ", game2");
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
