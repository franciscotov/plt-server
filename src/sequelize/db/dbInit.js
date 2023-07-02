const { Sequelize } = require("sequelize");
const { commonsKeys } = require("../../constants");
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;

let sequelize = null;

if (DATABASE_URL) {
  const URLDB = DATABASE_URL;
  sequelize = new Sequelize(URLDB, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: commonsKeys.postgres,
    protocol: commonsKeys.postgres,
    dialectOptions: {
      native: true,
      ssl: false,
    },
  });
} else {
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
    {
      logging: false, // set to
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
  );
}

module.exports = {
  sequelize,
};
