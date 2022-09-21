const Sequelize = require("sequelize");
const db = require("../config/db.config");

const Post = db.define("posts", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  picture: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.SMALLINT,
    allowNull: false,
  },
  sold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = Post;
