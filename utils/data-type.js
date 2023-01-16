const ROLES = ["ADMIN", "DOCTOR", "PATIENT"];
const STATES = ["INACTIVE", "VERIFIED", "ACTIVE", "SUSPENDED"];
const UserRoles = {
    ADMIN: "ADMIN",
    DOCTOR: "DOCTOR",
    PATIENT: "PATIENT",
    NURSE: "NURSE"
}

const AccountStatus = {
    CREATED_NEW: "CREATED_NEW",
    CHANGE_INFO: "CHANGE_INFO",
    ACTIVED: "ACTIVED",
    CHILD_ACCOUNT: "CHILD_ACCOUNT",
    SUSPENDED: "SUSPENDED"
}
const PlatformUsing = {
    MOBILE: "MOBILE",
    WEBSITE: "WEBSITE",
}
module.exports = { ROLES, STATES, UserRoles, AccountStatus, PlatformUsing };