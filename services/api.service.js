"use strict";

const _ = require("lodash");
const ApiGateway = require("moleculer-web");
const { UnAuthorizedError } = ApiGateway.Errors;
const CONFIG = require("../config");


module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: CONFIG.port|| 8080,

		routes: [{
			path: "/api",

			//authorization: false,

			aliases: {
				//Patient
				"GET /patient/info": "patient.info",
				"POST /patient/followPatient": "patient.followPatient",
				"POST /patient/unFollow" : "patient.unFollow",
				"POST /patient/updatePatient" : "patient.updatePatient"
			},

			// Disable to call not-mapped actions
			mappingPolicy: "restrict",

			// Set CORS headers
			cors: true,

			// Parse body content
			bodyParsers: {
				json: {
					strict: true
				},
				urlencoded: {
					extended: false
				}
			}
		}],

		assets: {
			folder: "./public"
		},

		onError(req, res, err) {
			// Return with the error as JSON object
			res.setHeader("Content-type", "application/json; charset=utf-8");
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				let o = {};
				err.data.forEach(e => {
					let field = e.field.split(".").pop();
					o[field] = e.message;
				});

				res.end(JSON.stringify({ errors: o }, null, 2));				
			} else {
				const errObj = _.pick(err, ["name", "message", "code", "type", "data"]);
				res.end(JSON.stringify(errObj, null, 2));
			}
			this.logResponse(req, res, err? err.ctx : null);
		}

	},

	methods: {
	},

	created() {
	
	}


};
