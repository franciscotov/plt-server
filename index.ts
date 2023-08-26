import { server } from "./src/app.ts";
import { connectionDB } from "./src/db.ts";
import { createListForWeek, dailyDeactivation, dataPopulation } from "./src/sequelize/dataPopulation.ts";
import schedule from "node-schedule";

connectionDB.sync({ force: false }).then(async () => {
  await dataPopulation();
  schedule.scheduleJob("59 59 * * * 4", (fireDate) => {
    console.log(fireDate, 'fireDate')
    createListForWeek()
  });
  schedule.scheduleJob("59 50 15 * * *", (fireDate) => {
    // daily deactivation
    console.log('se ejecuta', fireDate)
    dailyDeactivation()
  })
  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!", process.env.PORT || 3001);
  });
});
