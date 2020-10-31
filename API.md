/api/list get 返回用户列表
limit: 10
page: 1
{
    code: 0,
    codeText: ",
    page: 1,
    limit: 10,
    total: 100,
    pages: 10,
    data: [
        {}
    ]
}

/api/add post 新增用户 x-www-form-urlencoded
name=xxx&pass=xxx&jobNumber=xxx&hospital=xxx&department=xxx&type=doc
name=xxx&pass=xxx&cardNumber=xxx&hospital=xxx&department=xxx&type=pat
{
    code: 0,
    codeText: ""
}

个人中心：/user/xxx
1.登录
/login POST
@params
    account=xxx&passwprd=xxx&type=1&identify=patient
        account 用户名或者手机号
        password 密码或者手机校验码（MD5）
        type 默认1代表用户密码校验方式，2代表手机号和校验码验证方式
        identify 代表用户的身份，patient代表是患者，doctor代表是医生
@return
    {
        code: 0成功，1失败
        codeText: 状态描述,
        data: {
            id: 用户ID,
            name: 用户名
            phone：用户手机号
        }
    }