import { server } from "./src/app";
import { connectionDB } from "./src/db";
import { createListForWeek, dataPopulation } from "./src/sequelize/dataPopulation";
import schedule from "node-schedule";
import seqConnection from "./src/sequelize/db/dbInit";

// Syncing all the models at once.
// connectionDB()
// schedule.scheduleJob("10 * * * * *", (fireDate) => {
//   createListForWeek()
//   console.log("se esta ejecutando", fireDate);
// });
// server.listen(process.env.PORT || 3001, () => {
// //   await dataPopulation();

//   console.log("Iniciado!", process.env.PORT || 3001);
// });

seqConnection.sync({ force: true }).then(async () => {
  await dataPopulation();
  schedule.scheduleJob("10 * * * * *", (fireDate) => {
    createListForWeek()
    console.log("se esta ejecutando", fireDate);
  });
  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!", process.env.PORT || 3001);
  });
});
