const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
const environment = process.env.NODE_ENV || "development";
const configOption = config[environment];

// const sequelizeWithoutDb = new Sequelize({
//   host: configOption.host,
//   username: configOption.username,
//   password: configOption.password,
//   dialect: configOption.dialect,
// });

// const main = async () => {
//   try {
//     await sequelizeWithoutDb.query(
//       `CREATE DATABASE IF NOT EXISTS \`${configOption.database}\`;`
//     );
//     console.log(`Database "${configOption.database}" ensured.`);
//   } catch (error) {
//     console.error("Error creating database:", error);
//     process.exit(1);
//   } finally {
//     await sequelizeWithoutDb.close();
//   }
// };

// main();
const sequelize = new Sequelize(
  configOption.database,
  configOption.username,
  configOption.password,
  {
    dialect: configOption.dialect,
    host: configOption.host
  }
);

module.exports = sequelize;
