const express = require('express'),
    route = express.Router();
const { responseInfo, againMD5, checkTime30min, checkPhone, createID, queryUserInfo, random, success} = require('../lib/utils');
const fsPromise = require('../lib/myFs');
const { writeFile } = require('../lib/myFs');
const { query } = require('express');


route.use(async (req, res, next) => {
    req.$USER_PAT = await fsPromise.readFile('./mock/user_patient.json', 'utf8');
    req.$USER_DOC = await fsPromise.readFile('./mock/user_doctor.json', 'utf8');
    req.$CODE = await fsPromise.readFile('./mock/code.json', 'utf8');
    req.$USER_PAT = JSON.parse(req.$USER_PAT);
    req.$USER_DOC = JSON.parse(req.$USER_DOC);
    req.$CODE = JSON.parse(req.$CODE);
    next();
})

// 登录处理
route.post('/login', (req, res) => {
    let {
        account,
        password,
        type = 1,
        identify
    } = req.body;
    password = againMD5(password);

    let data;
    // 账号密码登录
    if (type == 1) {
        if (identify == 'patient') {
            data = req.$USER_PAT.find(item => {
                return (item.name == account || item.phone == account) && item.pass == password
            })
        } else if (identify == 'doctor') {
            data = req.$USER_DOC.find(item => {
                return (item.name == account || item.phone == account) && item.pass == password
            })
        }
    }
    // 短信验证码登录
    if (type == 2) {
        data = req.$CODE.find(item => {
            return item.phone === account && item.code === password && checkTime30min(item.time)
        })
        if (data) {
            if (identify == 'patient') {
                data = req.$USER_PAT.find(item => {
                    return item.phone === data.phone
                })
            } else if (identify == 'doctor') {
                data = req.$USER_DOC.find(item => {
                    return item.phone === data.phone
                })
            }
        }
    }
    if (!data) {
        responseInfo(res, {
            code: 0,
            codeText: "账号密码不匹配，或者手机号与验证码不匹配"
        });
        return;
    }

    // 如果登录成功，需要服务器端记录登录态
    req.session.userId = parseInt(data.id);
    responseInfo(res, {
        data: {
            id: data.id,
            name: data.name,
            phone: data.phone,
        }
    })
})

//校验是否登录
route.get('/login', (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
        responseInfo(res, {
            code: 1,
            codeText: '未登录'
        })
        return;
    }
    responseInfo(res);
})


// 退出登录
route.get('/signout', (req,res) => {
    req.session.userId = null;
})

// 用户注册
route.post('/register', (req, res) => {
    req.body = req.body || {};
    const flag = checkPhone(req, req.body.phone, req.body.identify);
    if(flag) {
        responseInfo(res, {
            code: 0,
            codeText: "手机号已被注册"
        });
        return;
    }
    //注册信息
    let userDATA, passDATA;
    if(identify == 'patient'){
        userDATA = req.$USER_PAT;
        passDATA = Object.assign({
            id: createID(userDATA),
            name: '',
            pass: '',
            cardNumber: '',
            hospital: '',
            department: '',
            phone: '',
        }, req.body);
        passDATA.pass = againMD5(passDATA.pass);
        userDATA.push(passDATA);
        writeFile('./mock/user_patient.json', userDATA).then(() => {
            res.send(success(true))
            // responseInfo(res, {
            //     code: 1,
            //     codeText: '未登录'
            // })
        }).catch(() => { 
            responseInfo(res, {
                code: 1,
                codeText: '手机号已被注册'
            })
        })
    } else if(identify == 'doctor') {
        userDATA = req.$USER_DOC;
        passDATA = Object.assign({
            id: createID(userDATA),
            name: '',
            pass: '',
            jobNumber: '',
            hospital: '',
            department: '',
            phone: '',
        }, req.body);
        passDATA.pass = againMD5(passDATA.pass);
        userDATA.push(passDATA);
        writeFile('./mock/user_doctor.json', userDATA).then(() => {
            res.send(success(true));
            // responseInfo(res, {})
        }).catch(() => {
            responseInfo(res, {
                code: 0,
                codeText: "error"
            });
        })
    } 
})

// 获取用户信息
route.get('/info', (req,res) => {
    const userId = req.query.id || req.session.userId;
    const identify = req.query.identify;
    const data = queryUserInfo(req, identify, userId);
    if(data) {
        if(identify =='patient') {
            responseInfo(res, {
                data: {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    cardNumber: data.cardNumber,
                    hospital: data.hospital,
                    department: data.department
                }
            })
        } else if(identify=='doctor') {
            responseInfo(res, {
                data: {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    jobNumber: data.jobNumber,
                    hospital: data.hospital,
                    department: data.department
                }
            })
        }
        return;
    }
    res.send(success(false));
    // responseInfo(res,{
    //     code: 1,
    //     codeText: '失败'
    // })
})

// 发送短信验证码
const md5 = require('blueimp-md5');
route.post('/code', (req,res) => {
    req.body = req.body ||{};
    const phone = req.body.phone,ran = random(),code = againMD5(md5(ran));
    if(!phone) {
        res.send(success(false));
        // responseInfo(res, {
        //     code: 1,
        //     codeText: '失败'
        // })
        return;
    }
    console.log(`生成的短信验证码：${phone} ===> ${ran}`);
    let codeDATA = req.$CODE;
    codeDATA.push({
        id: createID(codeDATA),
        phone: phone,
        code: code,
        time: new Date().getTime()
    });
    writeFile('./mock/code.json', codeDATA).then(() => {
        res.send(success(true));
        // responseInfo(res, {
        //      code: 0,
        //      codeText: ''
        // })
    }).catch(() => {
        res.send(success(false));
        // responseInfo(res, {
        //     code: 1,
        //     codeText: '失败'
        // })
    })
})

route.post9('/checkCode', (req,res) => {
    let {
        phone, code
    } = (req.body || {});
    code = againMD5(code);
    const flag = req.$CODE.find(item => {
        let nowT = new Date().getTime(),
        spanT = nowT - parseInt(item.time);
        return item.phone === phone && item.code === code && spanT <= (30*60*1000);
    });
    if(flag) {
        res.send(success(true));
        return;
    }
    res.send(success(false));
})
module.exports = route;