const winston = require("winston");
const { format} = winston;

// const myConsoleFormat = winston.format.printf(function (info) {
//   return `${info.level}: ${info.message} (${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')})`;
// });

const customLevels = {
  levels: {
    http: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    http: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

const logFormat = format.combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);
const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: format.combine(format.colorize({
        all: true
      })),
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      format: logFormat,
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/http.log",
      format: logFormat,
      level: "http"
    })
  ],
});


winston.exceptions.handle(
  new winston.transports.Console({ format: winston.format.simple() }),
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

module.exports = logger;
