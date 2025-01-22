const app = require("./index.js");
const sequelize = require("./db/sqconn");
const port = process.env.PORT || 8000;

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    console.log("Connected to database successfully");
    app.listen(port, () => {
      console.log(`Server Listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });
