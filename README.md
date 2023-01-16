<p>#Cach su dung</p>
<p>	npm run can</p>
<p>#Cac file config</p>
<p>#index.js</p>
<p>module.exports = {</p>
<p>namespace: "dev",</p>
<p> port: 8080,</p>
<p> sequelize: {</p>
<p>        database: "canlv",</p>
<p>        username: "root",</p>
<p>        password: "canlv123"</p>
<p>    }</p>
<p>}</p>
<p></p>
<p>#API call</p>
<p>#Lay thong tin benh nhan tu benh vien</p>
<p>get localhost:8080/api/patient/info</p>
<p>#input : </p>
<p>{
<p>  "phoneNumber": ""</p>
<p>}</p>
<p>#Luu thong tin benh nhan vao database</p>
<p>post localhost:8080/api/patient/followPatient</p>
<p>#input :</p>
<p>{</p>
<p>  "patientCode": ""</p>
<p>}</p>
<p></p>
<p>#Xoa thong tin benh nhan khoi database</p>
<p>post localhost:8080/api/patient/unFollow</p>
<p>#input</p>
<p>{</p>
<p>  "patientCode": ""</p>
<p>}</p>
<p></p>
<p>#Cap nhat thong tin benh nhan trong database</p>
<p>post localhost:8080/api/patient/updatePatient</p>
<p>#input</p>
<p>{</p>
<p>  "patientCode": ""</p>
<p>}</p>
