import { server } from "./src/app";
import { conn } from "./src/db";
import { createListForWeek, dataPopulation } from "./src/sequelize/dataPopulation";
import schedule from "node-schedule";

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  await dataPopulation();
  schedule.scheduleJob("10 * * * * *", (fireDate) => {
    createListForWeek()
    console.log("se esta ejecutando", fireDate);
  });
  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!", process.env.PORT || 3001);
  });
});
