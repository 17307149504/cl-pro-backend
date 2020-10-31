const express = require('express'),
    route = express.Router();
const fsPromise = require('../lib/myFs');
const { responseInfo} = require('../lib/utils')
// var Jieba = require('node-jieba');
// var analyzer = Jieba({
//     debug: true
// });

route.use(async (req, res, next) => {
    next();
})
route.post('/startDiagnosis', (req, res) => {
    let text = req.body.text,
        type = req.body.type;
    // post body中加入type , type=1 表示是词语， type= 2 表示是一段文字
    // 判断是一些词语还是一段问答文字
    // 如果是词语的组合的话，直接搜索知识图谱，得到结果
    // 如果是一段文字的话，进行jieba分词，再进行知识图谱的搜索，得到结果，如果搜索不到，就在问答库中给出答案
    if(type == 2) {
        // 进行jieba分词
        // analyzer.cut('wcl is a fool', {
        //     mode: Jieba.mode.TERM,
        //     HMM: true,
        // }, (err,res) => {
        //     console.log("wcl");
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         console.log("Res", res);
        //         responseInfo(res, {
        //             data: {
        //                 ret:res
        //             }
        //         });
        //     }
        // });
        // responseInfo(res, {
        //     code: 0,
        //     codeText: "账号密码不匹配，或者手机号与验证码不匹配"
        // });
    }
})
module.exports = route;