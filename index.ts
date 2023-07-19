import {server} from "./src/app";
import { conn } from "./src/db";
import { dataPopulation } from "./src/sequelize/dataPopulation";

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await dataPopulation();

  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!", process.env.PORT || 3001);
  });
});
