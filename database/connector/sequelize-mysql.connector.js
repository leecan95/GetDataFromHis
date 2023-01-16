const Sequelize = require("sequelize");
const config = require("../../config/index");

const sequelize = new Sequelize(
	config.sequelize.database,
	config.sequelize.username,
	config.sequelize.password,
	{
		host: 'localhost',
		dialect: 'mysql'
	}
);

module.exports.sequelize = sequelize;
