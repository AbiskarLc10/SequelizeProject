const winston = require("winston");
const { format, config } = winston;

// const myConsoleFormat = winston.format.printf(function (info) {
//   return `${info.level}: ${info.message} (${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')})`;
// });

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: format.combine(format.colorize()),
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
    }),
  ],
});

winston.exceptions.handle(
  new winston.transports.Console({ format: winston.format.simple() }),
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

module.exports = logger;
