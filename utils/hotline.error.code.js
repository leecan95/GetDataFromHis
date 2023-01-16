// All strings must be different
const FIRST_ERROR_CODE = 404000;
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
	DEPARTMENT_NOT_EXIST: {
		message: "Department not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 1,
	},
	DOCTOR_NOT_EXIST: {
		message: "Doctor is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 2,
	},
	DOCTOR_NOT_IN_DEPARTMENT: {
		message: "You are not in the department",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 3,
	},
	DOCTOR_HAVE_NO_PERMISSION: {
		message: "You don't have permission",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 4,
	},
	INVALID_SHIFT_DATE: {
		message: "Date is invalid",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 5,
	},
	CONFLICT_SHIFT_TIME : {
		message: "The shift time conflict",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 6,
	},
	NURSE_IN_SHIFT_NOT_EXIST: {
		message: "Nurse not selected",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 7,
	},
	CALL_SESSION_NOT_EXIST: {
		message: "The call session not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 8,
	},
	SHIFT_NOT_EXIST: {
		message: "The shift not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 9,
	},
	SHIFT_CAN_NOT_BE_UPDATED: {
		message: "The shift can not be updated",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 10,
	},
	SHIFT_CAN_NOT_BE_REMOVED: {
		message: "The shift can not be removed",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 11,
	},
	PASSED_SHIFT_TIME: {
		message: "The shift time has passed",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 12,
	},

};