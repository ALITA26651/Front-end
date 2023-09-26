const connection=require("../db/index")

const register=(req,res)=>{
    let user=req.body
    const sql="select * from users where nickname=?"
    connection.query(sql,[user.account],(err,results)=>{
        // state表示登录的状态，1表示用户名已存在，2表示邮箱已存在，3表示注册成功
        if(err) return res.err(err)
        if(results.length>=1) return res.json({status:0,msg:"用户名已存在",state:"1"})
        const sql="select * from users where email=?"
        connection.query(sql,[user.email],(err,results)=>{
            // console.log(results);
            if(err) return res.err(err)
            if(results.length>=1) return res.json({status:0,msg:"邮箱已存在",state:"2"})
            const sql="INSERT INTO users (nickname,email,password,birthday) VALUES (?,?,?,?)"
            connection.query(sql,[user.account,user.email,user.password,user.birthday],(err,results)=>{
                // console.log("#",results);
                if(err) return res.err(err)
                if(results.affectedRows==0) return res.json({status:0,msg:"注册失败"})
                res.json({status:1,msg:"注册成功",state:"3"})
            })
            
        })
    })
}

module.exports={
    register
}