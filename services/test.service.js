"use strict";

const fs = require("fs");
const path = require("path");

const _ = require("lodash");

const { MoleculerServerError } = require("moleculer").Errors;

module.exports = {
	name: "auth",

	settings: {
		rest: "/"
	},

	actions: {
		login: {
			params: {
                login_name: "phone_number",
                password: {
                    type: "string",
                    trim: true
                },
                role: {
                    type: "enum",
                    values: ["test", "real"],
                },
                device_name: {
                    type: "string",
                    trim: true,
                },
                mac: {
                    type: "string",
                    trim: true
                },
                device_detail: {
                    type: "string",
                    trim: true,
                    optional: true
                },
                app_edition: {
                    type: "string",
                    trim: true,
                    optional: true
                },
                platform: {
                    type: "enum",
                    values: ["MOBILE", "WEBSITE"],
                    optional: true
                },
            },
            async handler(ctx) {
                return `Thong so ${ctx.params.login_name} + ${ctx.params.password}`
            }
		},

		greeter: {
			rest: "/greeter",
			params: {
				name: "string"
			},
			handler(ctx) {
				return `Hello ${ctx.params.name}`;
			}
		},

		
	}
};
