// Include Sequelize module.
const Sequelize = require("sequelize");
const db = require("../config/db.config");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  pseudo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = User;

//pass = web::master!_
