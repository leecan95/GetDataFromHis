/**
 * @file include all Macro of HTTP code
 */
// HTTP CODE success
module.exports.HTTP_OK = 200;
module.exports.HTTP_CREATED = 201;
module.exports.HTTP_ACCEPTED = 202;
module.exports.HTTP_NOCONTENT = 204;

// CLIENT ERROR
module.exports.HTTP_ERR_BAD_REQUEST = 400;
module.exports.HTTP_ERR_UNAUTHORIZED = 401;
module.exports.HTTP_ERR_PAYMENT_REQUIRED = 402;
module.exports.HTTP_ERR_FORBIDDEN = 403;
module.exports.HTTP_ERR_NOT_FOUND = 404;
module.exports.HTTP_ERR_NOT_ACCEPTEABLE = 406;

// SERVER ERROR
module.exports.HTTP_ERR_INTENAL_SERVER = 500; //A generic error message,
module.exports.HTTP_ERR_BAD_GATEWAY = 502; //The server was acting as a gateway or proxy and received an invalid response from the upstream server.
module.exports.HTTP_ERR_SERVICE_UNAVAILABLE = 503; //The server cannot handle the request (because it is overloaded or down for maintenance).
module.exports.HTTP_ERR_GATEWAY_TIMEOUT = 504;