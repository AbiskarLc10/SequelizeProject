const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const errorMiddleware = require("./middleware/error-middleware");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authroute = require("./route/auth-route");
const userroute = require("./route/user-route");
const postroute = require("./route/post-route");
const transactionroute = require("./route/test-route");
const morgan = require("morgan");
const logger = require("./lib/logger");
// require("./scheduler/schedule")

const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};
app.use(express.json());
app.use(morgan("tiny", { stream }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
app.use("/api/post", postroute);
app.use("/api/transaction", transactionroute);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log(`Listening at 3000`);
});

module.exports = app;
