"use strict";

const { HttpResponseError } = require("./custom-error");

// Common methods for request answer to different services
module.exports = {
    methods: {
        async requestSuccess(name, data, code = 200) {
            return {
                name: name,
                data: data,
                code: code,
            };
        },
        async requestError(Error, source = "requestError") {
            throw new HttpResponseError(Error, source);
        },
    },
};
