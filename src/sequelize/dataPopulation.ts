import { Request, Response } from "express";
import {
  CampusAttributes,
  Day,
  DaysAttributes,
  GameAttributes,
  RoleI,
  UserBase,
} from "./models/interfaces/interfaces";
import { createUser } from "../services/userService";
import { createDay } from "../services/daysService";
import { Role, User } from "../db";

const dataPopulation = async () => {
  const role1: RoleI = {
    id: 1,
    value: "admin",
    label: "Administrator",
  };
  const role2: RoleI = {
    id: 2,
    value: "user",
    label: "User",
  };

  const user: UserBase = {
    id: 1,
    name: "admin",
    lastname: "admin",
    password: "123456",
    email: "fran@admin.com",
    roleId: role1.id,
    google: false,
  };

  const [, createdRole1] = await Role.findOrCreate({
    where: { ...role1 },
    defaults: role1,
  });
  const [] = await Role.findOrCreate({
    where: { ...role2 },
    defaults: role2,
  });
  if (createdRole1) {
    const [, createdUser] = await User.findOrCreate({
      where: { ...user },
      defaults: user,
    });
    if (!createdUser) {
      const updateUser = await User.update(
        { ...user },
        {
          where: { id: user.id },
        }
      );
    }
  } else {
    try {
      const [user2, createdUser] = await User.findOrCreate({
        where: { id: user.id },
        defaults: user,
      });
      if (!createdUser) {
        user2.update({
          password: user.password,
          google: false,
          roleId: role1.id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

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
