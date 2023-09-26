const express=require("express")
const router=express.Router()
const bodyParser=require("body-parser")

let urlParser=bodyParser.urlencoded({extended:true})
let jsonParser=bodyParser.json()

// 引入方法
const loginFunc=require("../router_handle/login")
const registerFunc=require("../router_handle/register")

// 登录路由
router.post("/login",urlParser,jsonParser,loginFunc.login)
// 注册路由
router.post("/register",urlParser,jsonParser,registerFunc.register)

router.get("/milena",(req,res)=>{
    res.json({hello:"hello"})
})

module.exports=router