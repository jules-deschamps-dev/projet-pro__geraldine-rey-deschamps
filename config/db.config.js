const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "./config/.env" });
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: process.env.INSTANCE_HOST,
    port: "3306",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully ......");
} catch (error) {
  console.error("/!/ Unable to connect to the database", error);
}
module.exports = sequelize;
