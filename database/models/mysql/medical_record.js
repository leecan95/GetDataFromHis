const { Sequelize, Model } = require("sequelize");

class MedicalRecord extends Model {
	static init(sequelize) {
		return super.init(
			{
				/**fields */
				medical_record_id: {
					type: Sequelize.INTEGER,
					unique: true,
					allowNull: false,
					primaryKey: true,
					autoIncrement: true,
				},
				patient_code_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				patient_code: { //maBn
					type: Sequelize.STRING,
					allowNull: false,
				},
				medical_record_code: { //maHoso
					type: Sequelize.STRING,
					allowNull: false,
				},
				medical_record_id: { //id cua lan kham benh (do his tra ve), mapping 1-1 medical_record_code 
					type: Sequelize.STRING,
					allowNull: false,
				},
				patient_name: {
					type: Sequelize.STRING,
				},
                date_in_hospital: {
					type: Sequelize.STRING,
				},
				date_out_hospital: {
					type: Sequelize.STRING,
				},
				created_time: {
					type: Sequelize.DATE,
				},
				updated_time: {
					type: Sequelize.DATE,
				}
			},
			{
				sequelize: sequelize,
				tableName: "medical_record",
			}
		);
	}

	/**other function/field */
	static associate(models) {
		this.belongsTo(models.Patient, { as: "patient_info", foreignKey: "patient_code_id" });
	}
}
module.exports = MedicalRecord;