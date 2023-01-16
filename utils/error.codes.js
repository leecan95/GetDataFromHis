// All strings must be different
const FIRST_ERROR_CODE = 100;
const AUTH_ERROR_CODE = 10;
const USER_ERROR_CODE = 50;
const {
	HTTP_ERR_FORBIDDEN,
	HTTP_ERR_NOT_FOUND,
	HTTP_ERR_SERVICE_UNAVAILABLE,
} = require("./http-code");
const SOME_THING_WENT_WRONG = {
	message: "Some thing when wrong",
	http_code: HTTP_ERR_SERVICE_UNAVAILABLE,
	err_code: FIRST_ERROR_CODE,
};
module.exports = {
	SOME_THING_WENT_WRONG,
	UNKOWN_ERROR: SOME_THING_WENT_WRONG,
};
