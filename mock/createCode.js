const random = function (n, m) {
    return Math.round(Math.random() * (m - n) + n);
}
let arr = [];
const area1 = '0123456789';
const area3 = '0123456789abcdefghijklmnopqrstuvwxyz';
const queryPhone = function () {
    return new Array(10).fill(null).map(item => {
        return area1[random(0, 9)]
    }).join('')
}
const queryCode = function () {
    return new Array(20).fill(null).map(item => {
        return area3[random(0, area3.length-1)]
    }).join('')
}
const queryTime = function () {
    let str =  new Array(20).fill(null).map(item => {
        return area1[random(0, 9)]
    }).join('');
    return parseInt(str)
}
for (let i = 2; i <= 93; i++) {
    arr.push({
        id: i,
        phone: queryPhone(),
        code: queryCode(),
        time: queryTime(),
    });
}
const fs = require('fs');
let code_data = fs.readFileSync('./code.json', 'utf8');
code_data = JSON.parse(code_data);
code_data = code_data.concat(arr);
fs.writeFileSync('./code.json', JSON.stringify(code_data));