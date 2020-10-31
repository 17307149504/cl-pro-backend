const express = require('express'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');
const fs = require('fs'),
    utils = require('./lib/utils'),
    config = require('./config');
const app = express();
app.listen(config.port, _ => {
    console.log('server is create' + config.port);
})

// 中间件的处理
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", config.cors.origin);
    res.header("Access-Control-Allow-Credentials", config.cors.credentials);
    res.header("Access-Control-Allow-Headers", config.cors.headers);
    res.header("Access-Control-Allow-Methods", config.cors.methods);
    /options/i.test(req.method) ? res.send('current services support cross domain requests.') : next();
})
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(expressSession(config.session))

// API接口的处理
// app.use('/user', require('./routes/user'));
app.use('/diagnosis', require('./routes/diagnosis'));
app.use((req, res) => {
    res.status(404).send({
        code: 1,
        codeText: '请求地址不存在'
    })
})
