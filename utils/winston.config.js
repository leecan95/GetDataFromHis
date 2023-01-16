const winston = require("winston");
require("winston-daily-rotate-file");
const CircularJSON = require("circular-json");
const logLevel = require("../config/logger.cfg")[process.env.NODE_ENV === "production" ? "production" : "dev"].level;

const alignedWithColorsAndTime = winston.format.combine(
	winston.format.colorize(),
	winston.format.align(),
	winston.format.printf(info => {
		const { level, message, ...args } = info;
		return `${timestamp()} [${level}]: ${message} ${
			Object.keys(args).length ? CircularJSON.stringify(args, null, 2) : ""
			}`;
	})
);

const alignedWithoutColorsAndTime = winston.format.combine(
	winston.format.align(),
	winston.format.printf(info => {
		const { level, message, ...args } = info;
		return `${timestamp()} [${level}]: ${message} ${
			Object.keys(args).length ? CircularJSON.stringify(args, null, 2) : ""
			}`;
	})
);

const timestamp = () => {
	const d = new Date();
	return (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + "-"
		+ (d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "-" + d.getFullYear() + " "
		+ (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":"
		+ (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":"
		+ (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
};

const createWinstonConfig = (logLevel) => {
	return {
		type: "Winston",
		options: {
			// Logging level
			level: logLevel,
			winston: {
				// More settings: https://github.com/winstonjs/winston#creating-your-own-logger
				transports: [
					new winston.transports.Console({
						format: alignedWithColorsAndTime
					}),
					new (winston.transports.DailyRotateFile)({
						format: alignedWithoutColorsAndTime,
						filename: "logs/application-%DATE%.log",
						datePattern: "DD-MM-YYYY",
						zippedArchive: true,
						maxSize: "20m",
						maxFiles: "30d"
					})
				]
			}
		},
	};
};

// Logger to be used in project
var transport = new (winston.transports.DailyRotateFile)({
	filename: 'logs/application-%DATE%.log',
	datePattern: 'DD-MM-YYYY',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '30d'
});
const logger = winston.createLogger({
	level: logLevel,
	format: alignedWithoutColorsAndTime,
	transports: [transport]
});

logger.add(
	new winston.transports.Console({
		format: alignedWithColorsAndTime
	})
);

module.exports.createWinstonConfig = createWinstonConfig;
module.exports.file_logger = logger;