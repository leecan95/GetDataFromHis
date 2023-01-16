#Cach su dung
	npm run can
#Cac file config
#index.js
module.exports = {
    namespace: "dev",
    port: 8080,
    sequelize: {
        database: "canlv",
        username: "root",
        password: "canlv123"
    }
}

#API call
#Lay thong tin benh nhan tu benh vien
get localhost:8080/api/patient/info
#input : 
{
  "phoneNumber": ""
}
#Luu thong tin benh nhan vao database
post localhost:8080/api/patient/followPatient
#input :
{
  "patientCode": ""
}

#Xoa thong tin benh nhan khoi database
post localhost:8080/api/patient/unFollow
#input
{
  "patientCode": ""
}

#Cap nhat thong tin benh nhan trong database
post localhost:8080/api/patient/updatePatient
#input
{
  "patientCode": ""
}
