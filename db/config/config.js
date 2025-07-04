(() => {
  require('dotenv').config();
  module.exports = {
    development: {
      username: 'root',
      password: 'password',
      database: 'testdb',
      host: 'mysqldb',
      dialect: 'mysql',
    },
    test: {
      username: 'root',
      password: 'password',
      database: 'newdb',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      host: process.env.PROD_HOST,
      dialect: process.env.PROD_DIALECT,
    },
  };
})();
