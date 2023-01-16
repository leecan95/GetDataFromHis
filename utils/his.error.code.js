// All strings must be different
const FIRST_ERROR_CODE = 405000;
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
    DB_HIS_RECORD_NOT_EXIST: {
        message: "record not exist",
        http_code: HTTP_ERR_FORBIDDEN,
        err_code: FIRST_ERROR_CODE + 1,
    },
    DB_HIS_NO_ACTION: {
        message: "his action not found",
        http_code: HTTP_ERR_FORBIDDEN,
        err_code: FIRST_ERROR_CODE + 2,
    },
    ELECTRONIC_MEDICAL_RECORD_INVALID_DATA: {
        message: "Invalid data",
        http_code: HTTP_ERR_FORBIDDEN,
        err_code: FIRST_ERROR_CODE + 40,
    },
    ELECTRONIC_MEDICAL_RECORD_PATIENT_NOT_EXIST: {
        message: "patient not exist",
        http_code: HTTP_ERR_FORBIDDEN,
        err_code: FIRST_ERROR_CODE + 41,
    },
    ELECTRONIC_MEDICAL_RECORD_NO_PERMISSION: {
        message: "You dont have permission",
        http_code: HTTP_ERR_FORBIDDEN,
        err_code: FIRST_ERROR_CODE + 42,
    },
};