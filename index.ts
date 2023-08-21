import { server } from "./src/app";
import { connectionDB } from "./src/db";
import { createListForWeek, dailyDeactivation, dataPopulation } from "./src/sequelize/dataPopulation";
import schedule from "node-schedule";

connectionDB.sync({ force: false }).then(async () => {
  await dataPopulation();
  schedule.scheduleJob("59 59 * * * 1", (fireDate) => {
    console.log(fireDate, 'fireDate')
    createListForWeek()
  });
  schedule.scheduleJob("59 59 23 * * *", (fireDate) => {
    // daily deactivation
    console.log('se ejecuta', fireDate)
    dailyDeactivation()
  })
  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!", process.env.PORT || 3001);
  });
});
