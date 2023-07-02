const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const { dataPopulation } = require("./src/sequelize/dataPopulation");
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  //   await dataPopulation();

  server.listen(process.env.PORT || 3001, () => {
    console.log("Iniciado!");
  });
});
