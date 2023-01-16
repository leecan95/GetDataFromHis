// All strings must be different
const FIRST_ERROR_CODE = 402000;
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
	DB_PATIENT_NOT_EXIST: {
		message: "Patient not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 1,
	},
	DB_PATIENT_SUPERVISOR_FOLLOW: {
		message: "You already followed this person",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 2,
	},
	DB_PATIENT_FOLLOW_SUPERVISOR: {
		message: "The person already followed you",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 3,
	},
	DB_PATIENT_ALREADY_RES_PKG: {
		message: "You already registed this package",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 4,
	},
	DB_CALL_NOT_EXIST: {
		message: "Call is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 5,
	},
	DB_RATE_ALREADY_EXIST: {
		message: "Rating already exists",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 6,
	},
	DB_DOCTOR_NOT_EXIST: {
		message: "Doctor not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 7,
	},
	DB_SUPERVISOR_NOT_EXIST: {
		message: "Supervisor not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 8,
	},
	DB_NOT_FREETIME: {
		message: "Not freetime of doctor",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 9,
	},
	DB_APPOINTMENT_NOT_EXIST: {
		message: "Appointment not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 10,
	},
	DB_PATIENT_HAVE_NO_RIGHT: {
		message: "Patient have no right",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 11
	},
	DB_PATIENT_TAKECARE_NOT_EXIST: {
		message: "Patient takecare not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 12,
	},
	TAKECARE_PERMISSION_DENIED: {
		message: "You don't have permission to see takecare data of this person",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 13,
	},
	DB_REMINDER_NOT_EXIST: {
		message: "Patient reminder is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 14,
	},
	DB_DEPARTMENT_NOT_EXIST: {
		message: "Department is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 15,
	},
	DB_SERVICE_PACKAGE_NOT_EXIST: {
		message: "Serivce package is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 16,
	},
	DB_BALANCE_NOT_ENOUGH: {
		message: "Balance is not enough",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 17,
	},
	DB_PERIOD_PACKET_NOT_EXIST: {
		message: "Period packet is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 18,
	},
	DB_PERIOD_PACKET_EXPIRED: {
		message: "This package cannot extend now",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 19,
	},
	DB_APPOINTMENT_COULD_NOT_CHANGE: {
		message: "This appointment could not change",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 20,
	},
	DB_APPOINTMENT_IS_CANCELED: {
		message: "This appointment is canceled",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 21,
	},
	DB_APPOINTMENT_COULD_NOT_CANCEL: {
		message: "This appointment could not cancel",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 22,
	},
	DB_PATIENT_RATING_TIME_EXPIRED: {
		message: "Time for rating was expired",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 23,
	},
	DB_PATIENT_PERMISSION_APPOINTMENT: {
		message: "You don't have permission appointment",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 24,
	},
	DB_PATIENT_CHILD_HAS_APPOINTMENT: {
		message: "Dependent person has appointment",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 25,
	},

	DB_APPOINTMENT_NOT_EXIST_ON_CURRENT_APP_VERSION: {
		message: "Appointment not exist on current app version",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 50,
	},
};
