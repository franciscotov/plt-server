import { Request, Response } from "express";
import {
  CampusAttributes,
  Day,
  DaysAttributes,
  GameAttributes,
  RoleAttributes,
  UserAttributes,
  UserBase,
} from "./models/interfaces/interfaces";
import { createUser } from "../services/userService";
import { createDay } from "../services/daysService";
import User from "./models/User";
import { CampusInput } from "./models/Campus";
import Role from "./models/Role";
// import { Role, User } from "../db";

const dataPopulation = async () => {
  const role1: RoleAttributes = {
    id: 1,
    value: "admin",
    label: "Administrator",
  };
  const role2: RoleAttributes = {
    id: 2,
    value: "user",
    label: "User",
  };

  const user: UserAttributes = {
    // id: 1,
    name: "admin",
    lastname: "admin",
    password: "123456",
    email: "fran@admin.com",
    RoleId: role1.id,
    google: false,
  };

  try {

    const [] = await Role.findOrCreate({
      where: { ...role1 },
      defaults: role1,
    });
    const [] = await Role.findOrCreate({
      where: { ...role2 },
      defaults: role2,
    });
  } catch(e) {
    console.error(e)
  }
  // if (createdRole1) {
  // User.create()
  try {
    const [, createdUser] = await User.findOrCreate({
      where: { ...user },
      defaults: { ...user },
    });
    if (!createdUser) {
      await User.update(
        { ...user },
        {
          where: { id: user.id },
        }
      );
    }
  } catch (e) {
    console.error("eorrr ", e);
  }

  const game: GameAttributes = {
    name: "admin",
    playersQuantity: 1,
    initHour: 10,
    endHour: 11,
    CampusId: 1,
    DayValue: Day.Lunes,
  };

  const campus: CampusInput = {
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

  daysToCreate.forEach(async (day: DaysAttributes) => {
    await createDay(day);
  });

  return true;
};

const createListForWeek = () => {
  // scripts para crear lista de juegos
};

// await conn.query(`insert into "product-category" ("productId","categoryId") values (1,1)`)

export { dataPopulation, createListForWeek };
