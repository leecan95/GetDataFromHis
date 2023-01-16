// middlewares/sequelize.js
"use strict";

const Sequelize = require("sequelize");
const Models = require("../database/index");

module.exports = function SequelizeDbMiddleware() {
	const models = {};
	return {
		name: "Sequelize",
		models: {},
		dependencies: ["dbconnector"],
		async created() {
			this.logger.debug("Sequelize middleware ready");
			await Models.sequelize.sync();
			for (const model of Object.keys(Models)) {
				models[Models[model].tableName] = Models[model];
				if (typeof Models[model].associateAfterSync === "function") {
					Models[model].associateAfterSync(Models);
				}
			}
			this.logger.info("Sequelize all models loaded!");
		},

		async stopping() {
			if (Models.sequelize) await Models.sequelize.close();
		},

		serviceCreating(service, schema) {
			if (!schema.name.startsWith("$")) {
				service.Sequelize = Models.sequelize;
				service.Sequelize.Op = Sequelize.Op;
				service.models = models;
			}
		},
	};
};
