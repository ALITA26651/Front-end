const connection=require("../db/index")

// 导入生成jwt字符串的包
const jwt=require("jsonwebtoken")
// 导入将客户端发送过来的jwt字符串解析成json对象的包
const expressJWT = require("express-jwt")
// 导入secretKey密钥
const secretKey=require("../secretKey/secretKey")

// 登录函数
const login=(req,res)=>{
    let user=req.body
    if(user.account==="" | user.account===null | user.account===undefined) return res.json({status:0,msg:"账号格式错误"})
    const sql="select * from users where nickname=? or email=?"
    connection.query(sql,[user.account,user.account],(err,results)=>{
        // console.log(results);
        if(err) return res.err(err)
        if(results.length<=0) return res.json({status:0,msg:"账号不存在"})
        /* console.log(results,secretKey); */
        if(results[0].password===user.password){
            let tokenMsg={
                username:results[0].nickname,
                birthday:results[0].birthday,
                email:results[0].email
            }
            res.json({
                status:1,msg:"登录成功",
                token:jwt.sign(tokenMsg,secretKey,{ expiresIn: '86400s' })
            })
        }else{
            res.json({status:0,msg:"密码错误"})
        }
    })
}


module.exports={
    login
}