let arr_doc = [],arr_pat=[];
const random = function (n, m) {
    return Math.round(Math.random() * (m - n) + n);
}
const area1 = '0123456789';
const area2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const area3 = '0123456789abcdefghijklmnopqrstuvwxyz';
const hospitalArr = [
    "武汉大学中南医院",
    "武汉大学人民医院",
    "武汉同济医院",
    "武汉联合医院",
    "武汉中心医院",
    "湖北妇幼保健医院",
    "广州军区武汉总医院",
    "武汉大学口腔医院",
    "武汉第一医院",
    "湖北省中医院"
]
const departmentArr = [
    "内科", "外科", "神经内科", "妇产科", "儿科", "眼科", "老年病科", "耳鼻咽喉科", "口腔科", "皮肤科", "麻醉科", "肿瘤科", "消化内科", "心血管内科", "血液内科", "肾病内科", "内分泌科", "风湿免疫科"
]
const queryPhone = function () {
    return new Array(10).fill(null).map(item => {
        return area1[random(0, 9)]
    }).join('')
}
const queryName = function () {
    return new Array(10).fill(null).map(item => {
        return area2[random(0, 25)]
    }).join('')
}
const queryCardNumber = function () {
    return new Array(10).fill(null).map(item => {
        return area1[random(0, 9)]
    }).join('')
}
const queryHospital = function () {
    return hospitalArr[area1[random(0, 9)]]
}
const queryDepartment = function () {
    return departmentArr[random(0, departmentArr.length - 1)]
}
const queryPassword = function() {
    return new Array(20).fill(null).map(item => {
        return area3[random(0, area3.length)]
    }).join('')
}
for (let i = 2; i <= 93; i++) {
    arr_pat.push({
        id: i,
        name: queryName(),
        pass: queryPassword(),
        cardNumber: queryCardNumber(),
        hospital: queryHospital(),
        department: queryDepartment(),
        phone: `1${queryPhone()}`,
    });
    arr_doc.push({
        id: i,
        name: queryName(),
        pass: queryPassword(),
        jobNumber: queryCardNumber(),
        hospital: queryHospital(),
        department: queryDepartment(),
        phone: `1${queryPhone()}`,
    });
}
const fs = require('fs');
let USER_DATA_PAT = fs.readFileSync('./user_patient.json', 'utf8');
let USER_DATA_DOC = fs.readFileSync('./user_doctor.json', 'utf8');
USER_DATA_PAT = JSON.parse(USER_DATA_PAT);
USER_DATA_DOC = JSON.parse(USER_DATA_DOC);
USER_DATA_PAT = USER_DATA_PAT.concat(arr_pat);
USER_DATA_DOC = USER_DATA_DOC.concat(arr_doc);
fs.writeFileSync('./user_patient.json', JSON.stringify(USER_DATA_PAT));
fs.writeFileSync('./user_doctor.json', JSON.stringify(USER_DATA_DOC));