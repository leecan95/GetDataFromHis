// All strings must be different
const FIRST_ERROR_CODE = 403000;
const {
	HTTP_ERR_FORBIDDEN,
	HTTP_ERR_NOT_FOUND,
	HTTP_ERR_SERVICE_UNAVAILABLE,
} = require("./http-code");
const SOME_THING_WENT_WRONG = {
	message: "Some thing when wrong",
	http_code: HTTP_ERR_SERVICE_UNAVAILABLE,
	err_code: 100,
};
module.exports = {
	SOME_THING_WENT_WRONG,
	CALL_COULD_NOT_GET_TOKEN: {
		message: "Could not get token from Stringee",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 1
	},
	CALL_ACCOUNT_NOT_EXIST: {
		message: "Account not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 2
	},
	CALL_CALL_NOT_FOUND: {
		message: "Call not found",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 3
	},
	CALL_EVENT_NOT_VALID: {
		message: "Event not valid",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 4
	},
	CALL_APPOINTMENT_NOT_EXIST: {
		message: "Appointment not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 5
	},
	CALL_BALANCE_NOT_ENOUGH: {
		message: "Blance is not enough",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 6,
	},
	CALL_HOTLINE_CALL_SESSION_INVALID: {
		message: "The hotline call session invalid",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 7,
	},
	CALL_HOTLINE_NOT_EXIST: {
		message: "The hotline is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 8,
	},
	CALL_GROUP_DOCTOR_NOT_EXIST: {
		message: "The group doctor is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 9,
	},
	CALL_DOCTOR_PERMISSION: {
		message: "You don't have permission",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 10,
	},
};