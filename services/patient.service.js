"use strict";

const fs = require("fs");
const path = require("path");

const _ = require("lodash");


const axios = require("axios");
const https = require("https");
const qs = require('qs');
const download = require('download');
const FormData = require('form-data');
const Patient = require("../database/models/mysql/patient");
const Record = require("../database/models/mysql/medical_record");


const { MoleculerServerError } = require("moleculer").Errors;

const API_LIST = require("../config/data.cfg").API_LIST;
module.exports = {
	name: "patient",

	settings: {
		rest: "/"
	},

	actions: {
		info: {
			params: {
                phoneNumber: "phone_number",
            },
            async handler(ctx) {
                console.log("param info action " + ctx.params.phoneNumber)
                let result = await this.getListPatientInfo(ctx.params.phoneNumber, "")
                console.log("ket qua tra ve" + result)
                return result
            }
		},

        followPatient : {
            params : {
                patientCode: "string",
            },
            async handler(ctx) {
                console.log("follow patient action" + ctx.params.patientCode)
                let result = await this.getListPatientInfo("", ctx.params.patientCode)
                console.log("ket qua tra ve" + result)
                return result
            }
        },

        unFollow : {
            params : {
                patientCode: "string",
            },
            async handler(ctx) {
                console.log("follow patient action" + ctx.params.patientCode)
                this.unFollowPatient(ctx.params.patientCode)
            }
        },

        updatePatient : {
            params : {
                patientCode: "string",
            },            
            async handler(ctx) {
                console.log("update patient action")
                this.updateInfoPatient(ctx.params.patientCode)

            }
        }

		
	},

    methods: {
        async login() {
            const API_CONFIG = {
                authen_info : {
                    Username : "admin",
                    Password : "1A"
                },
            }
			let dataReturn = null;
			this.logger.error("login- call API: ", API_CONFIG);
            console.log("login- call API: ", API_CONFIG);
            await axios({
                method: "post",
                url: "http://118.70.109.84:89/api/TrueHope/Login",
                data: API_CONFIG.authen_info,
            })
                .then(function (response) {
                //handle success
                dataReturn = response.data.data.sid;
                console.log("dataReturn", dataReturn);
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                dataReturn = null;
                })
                .finally(function() {
                    console.log("finally");
                })

             return dataReturn;
               
		},

        async getListPatientInfo(phoneNumber, patientCode) {
			if (!this.authenTokenHis) {
                console.log("check auth token xem co ko");
			    this.authenTokenHis = await this.login();
                console.log("check authenToken" + this.authenTokenHis);
			}
			if (!this.authenTokenHis){
                console.log("sau khi goi ma van khong co");
                return null;
            } 
			else {
                console.log("else case in get patient info");
				let dataReturn = [];
                let param = {};
                param.data = {};
                   param.sid = this.authenTokenHis;
                   param.cmd = "HoSoKhamBenh.GetALL"; 
					if (phoneNumber) param.data.SoDienThoai = phoneNumber.trim();
                    if (patientCode) param.data.MaBenhNhan = patientCode.trim();
                    param.data.TenBenhNhan = "";
                    param.data.NamSinh = "";
                    console.log("refreshToUpdatePatientCodeNew- call API ", param);
                await axios({
                    method: "post",
                    url: "http://118.70.109.84:89/api/TrueHope/AppService",
                    data: param,
                })
                    .then(function (response) {
                    //handle success
                    dataReturn = response.data.data
                    console.log("datareturn ", dataReturn)
                    })
                    .catch(function (response) {
                    //handle error
                    console.log("error")
                    dataReturn = null
                    })
                    .finally(function() {
                        console.log("finally")
                    })
                    if(patientCode){
                        for(let i = 0; i < dataReturn.ThongTinBenhNhan.length; i++){
                            console.log("follow patient" + dataReturn.ThongTinBenhNhan[i].SoDienThoai)
                            let patient = new Patient({
                                patient_code: dataReturn.ThongTinBenhNhan[i].MaBenhNhan,
                                name: dataReturn.ThongTinBenhNhan[i].TenBenhNhan,
                                dateofbirth : dataReturn.ThongTinBenhNhan[i].NamSinh,
                                gender : dataReturn.ThongTinBenhNhan[i].TenGioiTinh,
                                phone_number : dataReturn.ThongTinBenhNhan[i].SoDienThoai,
                                address : dataReturn.ThongTinBenhNhan[i].DiaChiBenhNhan,
                            });
                            await patient.save();
                            console.log("save patient")   
                        }
                       for(let j = 0; j < dataReturn.HoSoKhamBenh.length; j++){
                           console.log("save record")
                           let id = await Patient.findOne({
                               where : {
                                   patient_code : dataReturn.HoSoKhamBenh[j].MaBenhNhan
                               }
                           })
                           console.log(id.dataValues.patient_code_id)
                           let record = new Record({
                                medical_record_id : j,
                                patient_code_id : id.dataValues.patient_code_id,
                                medical_record_code : dataReturn.HoSoKhamBenh[j].MaHoSo,
                                patient_code : dataReturn.HoSoKhamBenh[j].MaBenhNhan,
                                date_in_hospital : dataReturn.HoSoKhamBenh[j].NgayVaoKham,
                                date_out_hospital : dataReturn.HoSoKhamBenh[j].KetThucKham,
                           });
                           await record.save();
                           console.log("save record done")
                       }                      
                    }
                   
                    return dataReturn;
			}
            
		},
        async unFollowPatient(patientCode){
            
            Record.destroy({
                where : {
                    patient_code : patientCode,
                }                
            })

            Patient.destroy({
                where : {
                    patient_code : patientCode,
                }
            })
        },
        async updateInfoPatient(patientCode) {
			if (!this.authenTokenHis) {
                console.log("check auth token xem co ko");
			    this.authenTokenHis = await this.login();
                console.log("check authenToken" + this.authenTokenHis);
			}
			if (!this.authenTokenHis){
                console.log("sau khi goi ma van khong co");
                return null;
            } 
			else {
				let dataReturn = [];
                let param = {};
                param.data = {};
                   param.sid = this.authenTokenHis;
                   param.cmd = "HoSoKhamBenh.GetALL"; 
                    if (patientCode) param.data.MaBenhNhan = patientCode.trim();
                    param.data.TenBenhNhan = "";
                    param.data.NamSinh = "";
                    console.log("refreshToUpdatePatientCodeNew- call API ", param);
                await axios({
                    method: "post",
                    url: "http://118.70.109.84:89/api/TrueHope/AppService",
                    data: param,
                })
                    .then(function (response) {
                    //handle success
                    dataReturn = response.data.data
                    console.log("datareturn ", dataReturn)
                    })
                    .catch(function (response) {
                    //handle error
                    console.log("error update Patient")
                    dataReturn = null
                    })
                    .finally(function() {
                        console.log("finally update")
                    })
                    if(patientCode){
                        for(let i = 0; i < dataReturn.ThongTinBenhNhan.length; i++){
                            console.log("follow patient" + dataReturn.ThongTinBenhNhan[i].SoDienThoai)
                            let patient = await Patient.update({
                                name: dataReturn.ThongTinBenhNhan[i].TenBenhNhan,
                                dateofbirth : dataReturn.ThongTinBenhNhan[i].NamSinh,
                                gender : dataReturn.ThongTinBenhNhan[i].TenGioiTinh,
                                phone_number : dataReturn.ThongTinBenhNhan[i].SoDienThoai,
                                address : dataReturn.ThongTinBenhNhan[i].DiaChiBenhNhan,
                            }, {where : {patient_code : patientCode}});
                            console.log("update patient")   
                        }
                       for(let j = 0; j < dataReturn.HoSoKhamBenh.length; j++){
                           let id = await Patient.findOne({
                               where : {
                                   patient_code : dataReturn.HoSoKhamBenh[j].MaBenhNhan
                               }
                           })
                           console.log(id.dataValues.patient_code_id)
                           let record = await Record.update({
                                medical_record_id : j,
                                patient_code_id : id.dataValues.patient_code_id,
                                medical_record_code : dataReturn.HoSoKhamBenh[j].MaHoSo,
                                date_in_hospital : dataReturn.HoSoKhamBenh[j].NgayVaoKham,
                                date_out_hospital : dataReturn.HoSoKhamBenh[j].KetThucKham,
                           }, {where : {patient_code : patientCode}});
                       }                      
                    }
                   
                    return dataReturn;
			}            
        }
    }
};
