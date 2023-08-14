import { server } from "./src/app";
import { connectionDB } from "./src/db";
import { createListForWeek, dataPopulation } from "./src/sequelize/dataPopulation";
import schedule from "node-schedule";

connectionDB.sync({ force: false }).then(async () => {
  await dataPopulation();
  schedule.scheduleJob("10 * * * * *", (fireDate) => {
    createListForWeek()
    console.log("se esta ejecutando", fireDate);
  });
  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!", process.env.PORT || 3001);
  });
});
