const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
const logger = require("../lib/logger");
const environment = process.env.NODE_ENV || "development";
const configOption = config[environment];

const sequelize = new Sequelize(
  configOption.database,
  configOption.username,
  configOption.password,
  {
    dialect: configOption.dialect,
    logging: (msg) => {
      logger.info(msg);
    },
  }
);

module.exports = sequelize;
