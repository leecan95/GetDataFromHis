const BaseLogger = require("moleculer").Loggers.Base;
const file_logger = require("./winston.config").file_logger;

class MyLogger extends BaseLogger {
	getLogHandler(bindings) {
		return (type, args) => {
			for (let i = 0; i < args.length; i++) {
				if (args[i] === null) args[i] = "null";
				else if (typeof (args[i]) === "object" && Object.keys(args[i]).length > 0) {
					let cache = [];
					args[i] = JSON.stringify(args[i], (key, value) => {
						if (typeof value === 'object' && value !== null) {
							// Duplicate reference found, discard key
							if (cache.includes(value)) return;
							// Store value in our collection
							cache.push(value);
						}
						return value;
					}, " ");
				}
			}
			file_logger[type === "fatal" ? "error" : type](args);
		};
	}
}

module.exports = MyLogger;