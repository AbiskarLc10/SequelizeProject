const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("newdb", "root", "password", {
  dialect: "mysql",
});

module.exports = sequelize;
