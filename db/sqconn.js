const { Sequelize } = require('sequelize');
const config = require('./config/config.js');
const logger = require('../lib/logger');
const environment = process.env.NODE_ENV || 'development';
const configOption = config[environment];
console.log(configOption);
let sequelize;
if (environment === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    configOption.database,
    configOption.username,
    configOption.password,
    {
      dialect: configOption.dialect,
      logging: (msg) => {
        logger.info(msg);
      },
      port: configOption.port,
    }
  );
}

module.exports = sequelize;
