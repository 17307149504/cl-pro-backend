function responseInfo(res, options) {
    let config = Object.assign({
        code: 0,
        codeText: 'OK!'
    }, options);
    res.status(200).type('application/json').send(config);
}
function success(flag = true, options = {}) {
    let defaults = {
        code: falg ? 0:1,
        codeText:flag? 'OK' : 'NO'
    };
    return Object.assign(defaults, options);
}
function againMD5(text) {
    return text.substring(4, text.length - 4).split('').reverse().join('');
}
function checkTime30min(time) {
    let nowTime = new Date().getTime();
    return (nowTime - time) <= (1000 * 60 ** 30)
}
function checkPhone(req, phone, identify) {
    if (identify == 'patient') {
        return req.$USER_PAT.find(item => {
            return item.phone === phone
        })
    } else if (identify == 'doctor') {
        return req.$USER_DOC.find(item => {
            return item.phone === phone
        })
    }
}
function createID(data) {
    return data.length === 0 ? 1 : (parseInt(data[data.length - 1]['id']) + 1);
}

// 获取手机验证码
function random() {
    const area = '0123456789';
    return new Array(6).fill(null).map( item => {
        return area[Math.round(Math.random()*9)]
    }).join('')
}

//获取用户基本信息
function queryUserInfo(req, identify, id) {
    if (identify == 'patient') {
        return req.$USER_PAT.find(item => {
            return item.id === id
        })
    } else if (identify == 'doctor') {
        return req.$USER_DOC.find(item => {
            return item.id === id
        })
    }
}

module.exports = {
    responseInfo,
    againMD5,
    checkTime30min,
    checkPhone,
    createID,
    queryUserInfo,
    random,
    success
}