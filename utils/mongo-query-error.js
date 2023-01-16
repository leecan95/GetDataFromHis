const { SOME_THING_WENT_WRONG } = require("./error.codes");
const { HttpResponseError } = require("./custom-error");
const logger = require("./winston.config").file_logger;

const createMongoQueryError = (mongoError, functionName) => {
	logger.error(functionName, mongoError);
	return new HttpResponseError(SOME_THING_WENT_WRONG, functionName);
};

module.exports = createMongoQueryError;
