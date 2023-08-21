import {
  Day as DayE,
  DaysAttributes,
  GameTypeLabels,
  GameTypeValues,
  ListAttributes,
  RoleAttributes,
  UserAttributes,
} from "./models/interfaces/interfaces";
import User from "./models/User";
import { CampusInput } from "./models/Campus";
import Role from "./models/Role";
import Game, { GameInput } from "./models/Game";
import GameType, { GameTypeInput } from "./models/GameType";
import Day from "./models/Days";
import List, { ListInput } from "./models/List";
import { Op, WhereOptions } from "sequelize";

const fourDaysMilliseconds = 24 * 4 * 60 * 60 * 1000;

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
    id: 1,
    name: "admin",
    lastname: "admin",
    password: "123456",
    email: "fran@admin.com",
    roleId: role1.id,
    google: false,
  };

  const userTwo: UserAttributes = {
    id: 2,
    name: "adminTwo",
    lastname: "adminTwo",
    password: "123456",
    email: "adminTwo@admin.com",
    roleId: role1.id,
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
  } catch (e) {
    console.error(e);
  }

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

  try {
    const [, createdUser] = await User.findOrCreate({
      where: { ...userTwo },
      defaults: { ...userTwo },
    });
    if (!createdUser) {
      await User.update(
        { ...userTwo },
        {
          where: { id: userTwo.id },
        }
      );
    }
  } catch (e) {
    console.error("eorrr ", e);
  }

  const game: GameInput = {
    name: "admin",
    totalPlayers: 1,
    initHour: 10,
    endHour: 11,
    campusId: 1,
    dayValue: Number(DayE.Lunes),
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
      value: Number(DayE.Lunes),
    },
    {
      label: "Martes",
      value: Number(DayE.Martes),
    },
    {
      label: "Miércoles",
      value: Number(DayE.Miercoles),
    },
    {
      label: "Jueves",
      value: Number(DayE.Jueves),
    },
    {
      label: "Viernes",
      value: Number(DayE.Viernes),
    },
    {
      label: "Sabado",
      value: Number(DayE.Sabado),
    },
    {
      label: "Domingo",
      value: Number(DayE.Domingo),
    },
  ];

  const typesToCreate: GameTypeInput[] = [
    {
      label: GameTypeLabels.Five,
      value: GameTypeValues.Five,
    },
    {
      label: GameTypeLabels.Six,
      value: GameTypeValues.Six,
    },
    {
      label: GameTypeLabels.Seven,
      value: GameTypeValues.Seven,
    },
    {
      label: GameTypeLabels.Eight,
      value: GameTypeValues.Eight,
    },
    {
      label: GameTypeLabels.Nine,
      value: GameTypeValues.Nine,
    },
    {
      label: GameTypeLabels.Eleven,
      value: GameTypeValues.Eleven,
    },
  ];

  try {
    await Day.bulkCreate(daysToCreate);
  } catch (e) {
    console.error(e);
  }
  try {
    await GameType.bulkCreate(typesToCreate);
  } catch (e) {
    console.error(e);
  }

  return true;
};

const createListForWeek = async () => {
  // scripts para crear lista de juegos
  const games = await Game.findAll({ where: { active: true } });
  console.log(games, "games");
  if (games && games.length > 0) {
    games.forEach(async (game: Game) => {
      const list: ListInput = {
        totalPlayers: game.totalPlayers,
        name: game.name,
        initHour: game.initHour,
        endHour: game.endHour,
        playersQuantity: 0,
        active: true,
        gameId: game.id,
      };
      await List.create(list);
    });
  }
};

const dailyDeactivation = async () => {
  // scripts para descativar listas diariamente
  const date = new Date();
  const today = date.getDay();
  try {
    // get games
    const games = await Game.findAll({ where: { dayValue: today } });

    if (games && games.length > 0) {
      console.log("games");
      const opQuery: WhereOptions<ListAttributes> = games.map(({ id }) => ({
        gameId: id,
      }));
      const lists: List[] = await List.findAll({
        where: { [Op.or]: opQuery, active: true },
      });
      console.log("lists");
      lists.forEach((list: List) => {
        if (today === 4 || today === 5 || today === 6 || today === 7) {
          const dateList = new Date(list.createdAt);
          const millSecList = dateList.getTime();
          const actualMiliSec = date.getTime();
          console.log(
            millSecList,
            "millSecList",
            actualMiliSec,
            "actualMiliSec",
            dateList
          );
          // si es de alguno de estos dias la diferencia de tiempo de creacion debe ser mayor a 4 dias
          if (actualMiliSec - millSecList > fourDaysMilliseconds) {
            list.update({ active: false });
          }
        } else {
          list.update({ active: false });
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
};

// await conn.query(`insert into "product-category" ("productId","categoryId") values (1,1)`)

export { dataPopulation, createListForWeek, dailyDeactivation };
