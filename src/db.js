require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { sequelize } = require("./sequelize/db/dbInit.js");

const basename = path.basename(__filename);

const modelDefiners = [];

// Read all files in the models folder, required them and we add to modelDefiners
fs.readdirSync(path.join(__dirname, "sequelize/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "sequelize/models", file)));
  });

// Inject connection(sequelize) for all models
modelDefiners.forEach((model) => model(sequelize));
// We capitalize the names of the models ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Relationate the models
const {
  // Product,
  // Category,
  Users,
  // Review,
  // Order,
  // Lineal_Order,
  // Store,
  // Store_Product,
  // ImageSlider,
} = sequelize.models;

// Relations
// Product.hasMany(Reviews);
// Product.belongsToMany(Category, {
//   through: "product-category",
//   timestamps: false,
// });
// Category.belongsToMany(Product, {
//   through: "product-category",
//   timestamps: false,
// });
// Users.belongsToMany(Product, { through: "user-products" });
// Product.belongsToMany(Users, { through: "user-products" });
// //Agregado ya que el id del producto estaba siendo posible dejarlo en null
// Product.hasMany(Review, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
// Users.hasMany(Review);
// Users.hasMany(Order, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
// Order.belongsTo(Users);
// Product.belongsToMany(Order, { through: Lineal_Order });
// Order.belongsToMany(Product, { through: Lineal_Order });

////stores product order
// Store.hasMany(Order);
// Order.belongsTo(Store);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
