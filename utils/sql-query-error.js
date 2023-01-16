const { SOME_THING_WENT_WRONG } = require("./error.codes");
const { HttpResponseError } = require("./custom-error");
const logger = require("./winston.config").file_logger;
const createSQLQueryError = (sqlError, functionName) => {
	logger.error(functionName, sqlError);
	return new HttpResponseError(SOME_THING_WENT_WRONG, functionName);
};

module.exports = createSQLQueryError;
