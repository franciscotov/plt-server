import {
  LiquibaseConfig,
  Liquibase,
  POSTGRESQL_DEFAULT_CONFIG,
} from "node-liquibase";

const { DB_USER, DB_PASSWORD, DATABASE_URL_LIQUIBASE } = process.env;

const myConfig: LiquibaseConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  url: DATABASE_URL_LIQUIBASE || "",
  username: DB_USER || "",
  password: DB_PASSWORD || "",
  changeLogFile: "changelog.xml",
  classpath: "node_modules/node-liquibase/dist/drivers/postgresql-42.2.8.jar",
};
const instance = new Liquibase(myConfig);

async function doEet() {
  await instance.status();
  console.log("se agregaron los datos a la DB");
}

export default doEet;
