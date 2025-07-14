(() => {
  require('dotenv').config();
  module.exports = {
    development: {
      username: 'root',
      password: 'password',
      database: 'newdb',
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
    test: {
      username: 'root',
      password: 'password',
      database: 'newdb',
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
    },
    gitci:{
      username:"root",
      password: "password",
      database: "testdb",
      host: "mysqldb",
      dialect: "mysql",
      port: 3306
    }
    ,
    production: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
})();
