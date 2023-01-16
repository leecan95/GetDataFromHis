const { MoleculerError } = require("moleculer").Errors;
const logger = require("./winston.config").file_logger;
const { SOME_THING_WENT_WRONG } = require("./error.codes");
class HttpResponseError extends MoleculerError {
	constructor(error = SOME_THING_WENT_WRONG, source) {
		let message = "";
		if (typeof error === "object" && typeof error.message != "undefined") {
			message = error.message;
		} else message = error;
		logger.error(
			`[${source}]:  ${JSON.stringify(message)} ${error.err_code ||
			SOME_THING_WENT_WRONG.err_code} `
		);
		super(
			message,
			error.http_code || SOME_THING_WENT_WRONG.http_code,
			"RESPONSE_ERROR",
			{
				message: message,
				http_code: error.http_code || SOME_THING_WENT_WRONG.http_code,
				err_code: error.err_code || SOME_THING_WENT_WRONG.err_code,
				data: error.data || undefined
			}
		);
		return;
	}
}
module.exports.HttpResponseError = HttpResponseError;
