"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const XLSX = require('xlsx');
const axios = require("axios");
const https = require("https");
const qs = require('qs');
const download = require('download');
const fs = require("fs");
const FormData = require('form-data');

const API_CONFIG = require("../config/his.cfg.js")[process.env.NODE_ENV === "production" ? "production" : "dev"];
const MEDIA_CONFIG = require("../config/media.cfg")[process.env.NODE_ENV === "production" ? "production" : "dev"];

const API_LIST = require("../config/data.cfg").API_LIST;
module.exports = {
	name: "hmuh-his",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		login: {
			params: {},
			async handler(ctx) {
				return this.login();
			}
		},
		/**Special Function */
		refreshToUpdatePatientCodeNew: {
			params: {
				patient_code: {
					type: "string",
					trim: true,
					optional: true,
				},
				phoneNumber: {
					type: "string",
					trim: true,
					optional: true,
				}
			},
			async handler(ctx) {
				return this.refreshToUpdatePatientCodeNew(ctx.params.phoneNumber, ctx.params.patient_code);
			}
		},

		getDetailMedicalRecordFromHisById: {
			params: {
				record_id: {
					type: "string",
					trim: true,
				}
			},
			async handler(ctx) {
				return this.getDetailMedicalRecordFromHisById(ctx.params.record_id);
				/* return {
					"id": 3967520,
					"active": true,
					"createdAt": "2022-04-15T04:26:25.628+07:00",
					"updatedAt": "2022-04-15T04:26:25.628+07:00",
					"createdBy": 1001126,
					"updatedBy": 1001126,
					"ngayDangKy": "2022-04-15T04:26:25+07:00",
					"ngayVaoVien": "2022-04-15T04:26:25+07:00",
					"maHoSo": "2204150904",
					"maNb": "2204022706",
					"maBenhAn": null,
					"tenNb": "TRẦN NGỌC ANH",
					"ngaySinh": "1998-10-14",
					"chiNamSinh": false,
					"tuoi": 24,
					"gioiTinh": 1,
					"noiTru": false,
					"phongId": null,
					"giuongId": null,
					"soTheBaoHiem": null,
					"diaChi": null,
					"xaPhuongId": null,
					"quanHuyenId": null,
					"tinhThanhPhoId": null,
					"quocGiaId": null,
					"soNha": null,
					"soDienThoai": "0972 454 882",
					"soCanCuoc": null,
					"tenNguoiBaoLanh": null,
					"sdtNguoiBaoLanh": null,
					"soCanCuocNguoiBaoLanh": null,
					"email": null,
					"ngheNghiepId": null,
					"danTocId": null,
					"quocTichId": null,
					"anhDaiDien": null,
					"anhCanCuocTruoc": null,
					"anhCanCuocSau": null,
					"nhomMau": null,
					"capCuu": false,
					"uuTien": false,
					"doiTuong": 1,
					"chieuCao": null,
					"canNang": null,
					"donThuoc": [],
					"cdha": [{
						"id": 58687970,
						"active": true,
						"createdAt": "2022-04-29T15:13:26.456+07:00",
						"updatedAt": "2022-04-29T15:50:36.124+07:00",
						"createdBy": 1000520,
						"updatedBy": 1000768,
						"recordId": 7680953,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Nội soi mũi hoặc vòm hoặc họng có sinh thiết [*]",
						"cdBanDau": "Khám sức khỏe",
						"banLuan": null,
						"ketLuan": null,
						"ketQua": null,
						"tomTatKetQua": null,
						"luocDoPttt": null,
						"cachThucPttt": null,
						"hopDong": false,
						"ngoaiHopDong": true,
						"soPhieu": 9311637,
						"trangThai": "Đã có kết quả"
					}],
					"pttt": [],
					"xn": [],
					"kham": [{
						"id": 57722036,
						"active": true,
						"createdAt": "2022-04-15T04:26:26.793+07:00",
						"updatedAt": "2022-04-24T10:47:06.498+07:00",
						"createdBy": 1001126,
						"updatedBy": 1000522,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Khám Da liễu [PK]",
						"stt": null,
						"phong": "Khám Da liễu 316",
						"diaDiem": null,
						"khoa": "TT YHGĐ & CSSK cộng đồng",
						"bacSi": "Trần Thị Huyền ",
						"loiDan": null,
						"ghiChu": null,
						"chiTiet": null,
						"tienSu": null,
						"kham": null,
						"cdBanDau": "Khám sức khỏe",
						"cdChinh": "",
						"cdChiTiet": null,
						"cdKhac": "",
						"hopDong": true,
						"ngoaiHopDong": false
					}, {
						"id": 57722048,
						"active": true,
						"createdAt": "2022-04-15T04:26:32.378+07:00",
						"updatedAt": "2022-04-24T10:47:06.475+07:00",
						"createdBy": 1001126,
						"updatedBy": 1000522,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Khám Ngoại [PK]",
						"stt": null,
						"phong": "Phòng khám ngoại 325",
						"diaDiem": "Phòng khám 325, Tầng 3",
						"khoa": "TT YHGĐ & CSSK cộng đồng",
						"bacSi": "Kiều Hữu Thạo",
						"loiDan": null,
						"ghiChu": null,
						"chiTiet": null,
						"tienSu": null,
						"kham": null,
						"cdBanDau": "Khám sức khỏe",
						"cdChinh": "",
						"cdChiTiet": null,
						"cdKhac": "",
						"hopDong": true,
						"ngoaiHopDong": false
					}, {
						"id": 57722035,
						"active": true,
						"createdAt": "2022-04-15T04:26:25.923+07:00",
						"updatedAt": "2022-04-24T10:47:06.452+07:00",
						"createdBy": 1001126,
						"updatedBy": 1000522,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Khám Nội [PK]",
						"stt": null,
						"phong": "Phòng khám nội 320",
						"diaDiem": "Trung Tâm ĐT&CSSKCĐ, Tầng 3, Phòng 320, Nhà A5",
						"khoa": "TT YHGĐ & CSSK cộng đồng",
						"bacSi": "Nguyễn Thị Phương Thảo",
						"loiDan": null,
						"ghiChu": null,
						"chiTiet": null,
						"tienSu": null,
						"kham": null,
						"cdBanDau": "Khám sức khỏe",
						"cdChinh": "",
						"cdChiTiet": null,
						"cdKhac": "",
						"hopDong": true,
						"ngoaiHopDong": false
					}, {
						"id": 57722057,
						"active": true,
						"createdAt": "2022-04-15T04:26:36.836+07:00",
						"updatedAt": "2022-04-24T10:03:37.716+07:00",
						"createdBy": 1001126,
						"updatedBy": 1000283,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Khám Mắt [PK]",
						"stt": null,
						"phong": "Phòng khám Mắt 318",
						"diaDiem": "Trung Tâm ĐT&CSSKCĐ, Tầng 3, Phòng 318, Nhà A5",
						"khoa": "TT YHGĐ & CSSK cộng đồng",
						"bacSi": "Bùi Thị Hương Giang",
						"loiDan": null,
						"ghiChu": null,
						"chiTiet": null,
						"tienSu": null,
						"kham": null,
						"cdBanDau": "Khám sức khỏe",
						"cdChinh": "",
						"cdChiTiet": null,
						"cdKhac": "",
						"hopDong": true,
						"ngoaiHopDong": false
					}, {
						"id": 57722042,
						"active": true,
						"createdAt": "2022-04-15T04:26:29.573+07:00",
						"updatedAt": "2022-04-24T09:37:20.509+07:00",
						"createdBy": 1001126,
						"updatedBy": 1001458,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Khám Răng hàm mặt [PK]",
						"stt": null,
						"phong": "Phòng khám răng hàm mặt 319",
						"diaDiem": "Phòng 319, Tầng 3, Trung Tâm ĐT&CSSKCĐ, Nhà A5",
						"khoa": "TT YHGĐ & CSSK cộng đồng",
						"bacSi": "Nguyễn Thị Thu Hương",
						"loiDan": null,
						"ghiChu": null,
						"chiTiet": null,
						"tienSu": null,
						"kham": null,
						"cdBanDau": "Khám sức khỏe",
						"cdChinh": "",
						"cdChiTiet": null,
						"cdKhac": "",
						"hopDong": true,
						"ngoaiHopDong": false
					}, {
						"id": 57722056,
						"active": true,
						"createdAt": "2022-04-15T04:26:36.345+07:00",
						"updatedAt": "2022-04-24T08:40:52.543+07:00",
						"createdBy": 1001126,
						"updatedBy": 1000389,
						"nbDotDieuTriId": 3967520,
						"tenDichVu": "Nội soi tai mũi họng [PK]",
						"stt": null,
						"phong": "Phòng Nội Soi Tai Mũi Họng 317 (KSK)",
						"diaDiem": "Tầng 3, Phòng 317, Trung Tâm ĐT&CSSKCĐ, Nhà A5",
						"khoa": "TT YHGĐ & CSSK cộng đồng",
						"bacSi": "Từ Thị Minh Thu",
						"loiDan": null,
						"ghiChu": null,
						"chiTiet": null,
						"tienSu": null,
						"kham": null,
						"cdBanDau": "Khám sức khỏe",
						"cdChinh": "",
						"cdChiTiet": null,
						"cdKhac": "",
						"hopDong": true,
						"ngoaiHopDong": false
					}],
					"khamSucKhoeHopDong": true,
					"chanDoanVaoVien": "",
					"chanDoanRaVien": "",
					"chanDoanRaVienKhac": "",
					"chanDoanRaVienChiTiet": null,
					"loiDanBacSi": null,
					"trangThaiNb": null,
					"phuongPhapDieuTri": null,
					"huongDieuTri": null,
					"ketQuaDieuTri": null,
					"hinhThucRaVien": null,
					"thoiGianTuVong": null,
					"diaDiemTuVong": null,
					"lyDoTuVong": null,
					"trangThaiMo": null,
					"quaTrinhBenhLyDbCls": null,
					"tomTatKqCls": null,
					"kskHopDong": []
				} */
			},
		},
		getPdfOfHisMedicalRecordByCode: {
			params: {
				record_id: {
					type: "string",
					trim: true,
				}
			},
			async handler(ctx) {
				return this.getPdfOfHisMedicalRecordByCode(ctx.params.record_id);
			}
		},
		getReExaminationInfoOfMedicalRecord: {
			params: {
				record_id: {
					type: "string",
					trim: true,
				}
			},
			async handler(ctx) {
				return this.getReExaminationInfoOfMedicalRecord(ctx.params.record_id);
			}
		}
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {
		//login method
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
		//get data by patient_code
		async getDetailMedicalRecordFromHisById(recordId) {
			if (!this.authenTokenHis) {
				this.authenTokenHis = await this.login();
			}
			if (!this.authenTokenHis) return null;
			else {
				let dataReturn = null;
				try {
					//call API
					let path = ("http://118.70.109.84:89" + API_LIST.get_detail_record).replace("{{id}}", recordId.trim());
					//let path = API_CONFIG.api.get_detail_record.replace("{{id}}", "2909405");//test
					this.logger.error("getDetailMedicalRecordFromHisById- call API path: ", path);
					let dataResponse = await axios.get(path, {
						params: {},
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + this.authenTokenHis
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false
						})
					});
					dataReturn = dataResponse.data.data;
					//if (dataReturn && dataReturn.noiTru) dataReturn = null;
				} catch (error) {
					this.logger.error("login-error: ", error.response.data);
					//if error === token expiried/invalid => recall
					if (error.response.data.code === 401) {
						this.authenTokenHis = null;
						dataReturn = await this.getDetailMedicalRecordFromHisById(recordId);
					} else
						dataReturn = null;
				} finally {
					return dataReturn;
				}
			}
		},
		async refreshToUpdatePatientCodeNew(phoneNumber, patientCode) {
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
                console.log("else case");
				let dataReturn = [];
				try {
					//call API
					let param = { page: 0 };
					if (phoneNumber) param.soDienThoai = phoneNumber.trim().replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
					if (patientCode) param.maNb = patientCode.trim();
					this.logger.error("refreshToUpdatePatientCodeNew- call API ", param);
                    console.log("refreshToUpdatePatientCodeNew- call API ", param);
					let dataResponse = await axios.get("http://118.70.109.84:89" + API_LIST.get_patient_info, {
						params: param,
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + this.authenTokenHis
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false
						})
					});
					dataReturn = dataResponse.data.data;
                    console.log("data return: ", dataReturn);
					/* if (dataReturn && dataReturn.length > 0) {
						dataReturn = dataReturn.filter(e => e.noiTru === false);
					} */
				} catch (error) {
					this.logger.error("login-error: ", error.response.data);
                    console.log("login-error: ", error.response.data);
					//if error === token expiried/invalid => recall
					if (error.response.data.code === 401) {
						this.authenTokenHis = null;
						dataReturn = await this.refreshToUpdatePatientCodeNew(phoneNumber, patientCode);
					} else
						dataReturn = [];
				} finally {
					return dataReturn;
				}
			}
		},


		async getPdfOfHisMedicalRecordByCode(recordId) {
			if (!this.authenTokenHis) {
				this.authenTokenHis = await this.login();
			}
			if (!this.authenTokenHis) return null;
			else {
				let dataReturn = [];
				try {
					//call API
					this.logger.error("getPdfOfHisMedicalRecordByCode - call API " + API_LIST.get_pdf_conclude.from_isofh.api);
					let currentRecord = await this.getDetailMedicalRecordFromHisById(recordId);
					//F01: Chỉ định F02: Kết quả F04: Đơn thuốc
					let formList = ["F01", "F02", "F04"];
					if (!currentRecord || currentRecord.noiTru) return dataReturn;

					let dataResponseFromIsofh = await axios.get("http://118.70.109.84:89" + API_LIST.get_pdf_conclude.from_isofh.api, {
						params: {
							page: 0,
							sort: "createdAt,desc",
							phieuMoiNhat: true,
							dsLoaiKy: "0,1",
							//maLoaiBieuMau: formList[i],
							nbDotDieuTriId: recordId
						},
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + this.authenTokenHis
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false
						})
					});
					dataReturn = dataReturn.concat(dataResponseFromIsofh.data.data.map(e => {
						return { id: e.id, name: e.tenBieuMau, url: "http://118.70.109.84:89" + API_LIST.get_pdf_conclude.from_isofh.display_file + e.fileSauKy }
					}));

					let dataResponseFromOther = await axios.get("http://118.70.109.84:89" + API_LIST.get_pdf_conclude.from_other_provider.api, {
						params: {
							page: 0,
							sort: "createdAt,desc",
							phieuMoiNhat: true,
							dsLoaiKy: "0,1",
							manHinhHienThi: 20,
							//maLoaiBieuMau: formList[i],
							nbDotDieuTriId: recordId
						},
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + this.authenTokenHis
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false
						})
					});
					dataReturn = dataReturn.concat(dataResponseFromOther.data.data.map(e => {
						return { id: e.id, name: e.tenBieuMau, url: "http://118.70.109.84:89" + API_LIST.get_pdf_conclude.from_other_provider.display_file + e.duongDan }
					}));
					//return dataReturn;
					let dirName = "examination_pdf/" + recordId;
					let currentTimeMs = new Date().getTime();
					if (fs.existsSync(dirName))
						fs.rmSync(dirName, { recursive: true });
					for (let i = 0; i < dataReturn.length; i++) {
						let fileName = dataReturn[i].id + "_" + currentTimeMs + ".pdf";
						await download(dataReturn[i].url, dirName, { filename: fileName });
						//dataReturn[i].local_url = __dirname + "/" + dirName + "/" + fileName;
						//send to media node, get link
						const formData = new FormData();
						formData.append("record_id", recordId);
						formData.append('pdf_file', fs.createReadStream(dirName + "/" + fileName));
						let res = await axios.post(MEDIA_CONFIG.local_server + "/api/v0/uploads/medical_examination/import/pdf", formData, {
							headers: formData.getHeaders()
						});
						dataReturn[i].url = res.data.data.path;
					}
					return dataReturn;
				} catch (error) {
					this.logger.error("login-error: ", error.response.data);
					//if error === token expiried/invalid => recall
					if (error.response.data.code === 401) {
						this.authenTokenHis = null;
						dataReturn = await this.getPdfOfHisMedicalRecordByCode(recordId);
					} else
						dataReturn = [];
				} finally {
					return dataReturn;
				}
			}
		},

		async getReExaminationInfoOfMedicalRecord(recordId) {
			if (!this.authenTokenHis) {
				this.authenTokenHis = await this.login();
			}
			if (!this.authenTokenHis) return [];
			else {
				let dataReturn;
				try {
					//call API
					this.logger.error("getReExaminationInfoOfMedicalRecord- call API ", API_LIST.get_re_examination_info);
					let dataResponse = await axios.get("http://118.70.109.84:89" + API_LIST.get_re_examination_info, {
						params: {
							page: 0,
							nbDotDieuTriId: recordId
						},
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + this.authenTokenHis
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false
						})
					});
					dataReturn = dataResponse.data.data;
				} catch (error) {
					this.logger.error("login-error: ", error.response.data);
					//if error === token expiried/invalid => recall
					if (error.response.data.code === 401) {
						this.authenTokenHis = null;
						dataReturn = await this.getReExaminationInfoOfMedicalRecord(recordId);
					} else
						dataReturn = [];
				} finally {
					return dataReturn;
				}
			}
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		this.authenTokenHis = null;
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.authenTokenHis = null;
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() { },
};
