const express=require("express")
const router=express.Router()
const connection=require("../db/index")

const bodyParser = require("body-parser")
const jsonParser=bodyParser.json({limit: '50mb'})
const urlParser=bodyParser.urlencoded({extended:true,limit:"50mb"})

router.post("/avatar",urlParser,jsonParser,(req,res)=>{
    
    let { imgData }=req.body
    let { email }=req.auth
    const sql="update users set avatar=? where email=?"
    connection.query(sql,[imgData,email],(err,results)=>{
        if(err) res.err(err)
        if(results.affectedRows<1) res.json({status:0,msg:"更换头像失败"})
        res.json({status:0,msg:"success"})
    })
    
})
router.post("/nickname",urlParser,jsonParser,(req,res)=>{
    
    let { nickname }=req.body
    let { email }=req.auth
    if(nickname===undefined | null | "") return res.json({status:0,msg:"未填入信息"})
    const sql="update users set nickname=? where email=?"
    connection.query(sql,[nickname,email],(err,results)=>{
        if(err) res.err(err)
        if(results.affectedRows<1) res.json({status:0,msg:"更新昵称失败"})
        res.json({status:0,msg:"success"})
    })
    
})

router.get("/userdata",(req,res)=>{
    
    let { email }=req.auth
    const sql="select avatar,nickname,birthday,sign from users where email=?"
    connection.query(sql,email,(err,results)=>{
        if(err) res.err(err)
        if(results.lenght<1) res.json({status:0,msg:"查询头像失败"})
        /* console.log(results[0].avatar); */
        res.json({status:0,msg:"success",data:results[0]})
    })
})


module.exports=router