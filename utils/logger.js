const winston = require("winston");
require("winston-daily-rotate-file");
const CircularJSON = require("circular-json");
let io;
let CONFIG = require("../config")[process.env.NODE_ENV || "dev"].log;
const fs = require("fs");
const path = require("path");
// -------------------------------------
//      SETUP LOGGER with Winston
// -------------------------------------
// try to make some pretty output
const alignedWithColorsAndTime = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp(),
	winston.format.align(),
	winston.format.splat(),
	winston.format.json(),
	winston.format.printf(info => {
		const { timestamp, level, message, ...args } = info;
		const ts = timestamp.slice(0, 19).replace("T", " ");
		return `${ts} [${level}]: ${message} ${
			Object.keys(args).length
				? CircularJSON.stringify(args, null, 2)
				: ""
		}`;
	})
);

const timestamp = () => {
	const d = new Date();
	return (
		d.getDate() +
		"-" +
		(d.getMonth() + 1) +
		"-" +
		d.getFullYear() +
		" " +
		(d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
		":" +
		(d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
		":" +
		(d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds())
	);
};

let transport = new winston.transports.DailyRotateFile({
	filename: "logs/application-%DATE%.log",
	datePattern: "DD-MM-YYYY",
	zippedArchive: true,
	maxSize: "20m",
	maxFiles: "30d",
});

// Logger to be used in project
const logger = winston.createLogger({
	level: CONFIG.level || "debug",
	format: alignedWithColorsAndTime,

	transports: [transport],
});

// Output stream to socket.io
logger
	.stream({
		start: -1,
	})
	.on("log", function(log) {
		if (io !== null) {
			io.emit("log", log);
		}
	});

logger.add(
	new winston.transports.Console({
		format: alignedWithColorsAndTime,
	})
);

module.exports = logger;
