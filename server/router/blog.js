const express=require("express")
const router=express.Router()
const bodyParser = require("body-parser")
const jsonParser=bodyParser.json()
const jwt=require("jsonwebtoken")
const secretKey=require("../secretKey/secretKey")

const submitFunc=require("../router_handle/article")
const searchFun=require("../router_handle/search")

// 获取文章的路由
router.get("/article",submitFunc.getArticle)

// 获取最新文章的路由
router.get("/newtext",submitFunc.newText)

// 获取归档文章的路由
router.get("/classify",searchFun.classify)

// 提交文章的路由
router.post("/submit",jsonParser,submitFunc.article)

// 搜索文章的路由
router.get("/search",searchFun.search)

module.exports=router