const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const modelsDir = path.join(__dirname, "/models/mysql/");
const { sequelize } = require("./connector/sequelize-mysql.connector");

/**get list model */
const models = Object.assign(
	{},
	...fs
		.readdirSync(modelsDir)
		.filter((file) => {
			return (
				file.indexOf(".") !== 0 &&
				file !== basename &&
				file.slice(-3) === ".js"
			);
		})
		.map((file) => {
			const model = require(path.join(modelsDir + "/" + file));
			return {
				[model.name]: model.init(sequelize),
			};
		})
);

/**assign relationship between models */
for (const model of Object.keys(models)) {
	models[model].removeAttribute('id');
	if (typeof models[model].associate === "function") {
		models[model].associate(models);
	}
	if (model === "GroupDoctorRankingView") {
		models[model].sync = () => Promise.resolve();
	}
}

models.sequelize = sequelize;
module.exports = models;
