// All strings must be different
const FIRST_ERROR_CODE = 401000;
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
	DOCTOR_STATUS_NOT_EXIST: {
		message: "New status is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 1,
	},
	DB_DOCTOR_NOT_EXIST: {
		message: "Doctor is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 2,
	},
	DB_PATIENT_NOT_EXIST: {
		message: "Patient not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 3,
	},
	DB_CALL_NOT_EXITS: {
		message: "Call not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 4,
	},
	DB_NO_COLUMN_IS_UPDATES: {
		message: "Can not update this fields",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 5,
	},
	DB_SOME_FIELDS_CANNOT_EMPTY: {
		message: "Name, Date of birth, Gender cannot be empty",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 6,
	},
	DB_DOCTOR_HAVE_NO_RIGHT: {
		message: "Doctor have no right",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 7,
	},
	DB_APPOINTMENT_NOT_EXIST: {
		message: "Appointment not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 8,
	},
	DB_NOT_FREETIME: {
		message: "Not freetime of doctor",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 9,
	},
	DB_DOCTOR_PERMISSION: {
		message: "You don't have permission",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 10,
	},
	DB_PATIENT_SERVICE_NOT_EXIST: {
		message: "You don't register any service package",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 11,
	},
	DB_CALL_HAS_RATING: {
		message: "Call has rating",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 12,
	},
	DB_APPOINTMENT_COULD_NOT_CHANGE: {
		message: "This appointment could not change",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 13,
	},
	DB_APPOINTMENT_IS_CANCELED: {
		message: "This appointment is canceled",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 14,
	},
	DB_DEPARTMENT_NOT_EXIST: {
		message: "Department not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 15,
	},
	DB_NURSE_IN_SHIFT_NOT_EXIST: {
		message: "Nurse not selected",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 16,
	},
	DB_NURSE_SHIFT_NOT_EXIST: {
		message: "Nurse shift not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 17,
	},
	DB_NURSE_SHIFT_DATE: {
		message: "Date is invalid",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 18,
	},
	DB_NURSE_SHIFT_CANT_DELETE: {
		message: "Nurse shift can't delete",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 19,
	},
	DB_DEPARTMENT_SHIFT_TIME: {
		message: "Time is invalid",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 20,
	},
	DB_DEPARTMENT_SHIFT_NOT_EXIST: {
		message: "Department shift not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 21,
	},
	DB_DOCTOR_NOT_IN_DEPARTMENT: {
		message: "You are not in the department",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 22,
	},
	DB_HOTLINE_IS_NOT_EXIST: {
		message: "Hotline is not exist",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 23,
	},
	DB_NURSE_SHIFT_UPDATE_ON_GOING: {
		message: "Nurse shift on going, can't update",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 24,
	},
	DB_NURSE_SHIFT_UPDATE_HAS_HAPPENED: {
		message: "Nurse shift has happened, can't update",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 25,
	},
	DB_NURSE_SHIFT_REMOVE_ON_GOING: {
		message: "Nurse shift on going, can't delete",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 26,
	},
	DB_NURSE_SHIFT_REMOVE_HAS_HAPPENED: {
		message: "Nurse shift has happened, can't delete",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 27,
	},
	DB_DEPARTMENT_SHIFT_DESCRIPTION: {
		message: "Description is invalid",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 28,
	},
	DB_CALL_TIME_EVALUATE_EXPIRED: {
		message: "Time for evaluate was expired",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 29,
	},
	DB_APPOINTMENT_PATIENT_NOT_FREETIME: {
		message: "Not free time of patient",
		http_code: HTTP_ERR_FORBIDDEN,
		err_code: FIRST_ERROR_CODE + 30,
	}
};
