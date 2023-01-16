const { Sequelize, Model } = require("sequelize");

class Patient extends Model {
	static init(sequelize) {
		return super.init(
			{
				/**fields */
				patient_code_id: {
					type: Sequelize.INTEGER,
					unique: true,
					allowNull: false,
					primaryKey: true,
					autoIncrement: true,
				},
				patient_code: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING,
				},
				dateofbirth: {
					type: Sequelize.DATEONLY,
				},
				gender: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				address: {
					type: Sequelize.STRING,
				},
				phone_number: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING,
				},
				created_time: {
					type: Sequelize.DATE,
				},
				updated_time: {
					type: Sequelize.DATE,
				},
			}, {
			indexes: [
				{
					type: "FULLTEXT",
					fields: ["name"],
				},
			],
			sequelize: sequelize,
			tableName: "patient",
		});
	}

	static associate(models) {

		this.hasMany(models.MedicalRecord, { as: "records", foreignKey: "patient_code_id" });
	}
	/**other function/field */
}
module.exports = Patient;
