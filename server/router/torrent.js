// torrent路由
const connection=require("../db/index")
const express=require("express")
const router=express.Router()

router.get("/torrent",(req,res)=>{
    // 当前页码
    let { currentPage }=req.query
    // 每页的展示的数量
    let { pageSize }=req.query
    let { classify }=req.query

    // 设置sql偏移量
    let size=Number(pageSize) // 当前的每页展示的数量，sql查询的数量
    let offset=(Number(currentPage)-1)*size // sql查询跳过数据的数量
    // 响应返回的数据和数据总长度
    let length=0
    let data

    // 判断搜索keyword是否存在
    let results=Reflect.has(req.query,"keyword")
    // console.log("keyword" in req.query);
   
    // 当不存在搜索词时
    if(!results){
        if(classify==="all"){
            const sql="select count(*) from items"
            connection.query(sql,(error,results)=>{
                if(error){
                    res.err(error)
                }
                if(results.length<=0) res.err("获取数据失败")
                length=results[0]
                const sql="select * from items limit ? offset ?"
                connection.query(sql,[size,offset],(error,results)=>{
                    if(error){
                        console.log(res);
                        res.err(error)
                    }
                    if(results.length<=0) res.err("获取数据失败")
                    res.send({status:0,message:"获取数据成功",torrent:{
                        Data:results,
                        Length:length["count(*)"]
                    }})
                })
            })
        }else{
            const sql="select count(*) from items where cat=?"
            console.log(classify);
            connection.query(sql,[classify],(err,results)=>{
                if(err){
                    res.err(err)
                }
                if(results.length<=0) res.err("获取数据失败")
                length=results[0]
                const sql="select * from items where cat=? limit ? offset ?"
                connection.query(sql,[classify,size,offset],(error,results)=>{
                    if(error){
                        console.log(res);
                        res.err(error)
                    }
                    // if(results.length<=0) res.err("获取数据失败")
                    res.send({status:0,message:"获取数据成功",torrent:{
                        Data:results,
                        Length:length["count(*)"]
                    }})
                })
            })
        }
    }else{
        // 当存在搜索词时
        let { keyword }=req.query
        let arr=keyword.split(" ")

        // 设置正则表达式
        let str=""
        arr.forEach((item,index)=>{
            if(index<arr.length-1){
                str=str+item+"."
            }else{
                str=str+item
            }
        })
        console.log(str);

        if(classify==="all"){
            // MySql正则表达式不区分大小写
            const sql="select count(*) from items where title REGEXP ?"
            connection.query(sql,[str],(err,results)=>{
                if(err){
                    res.err(err)
                }
                if(results.length<=0) res.err("获取数据失败")
                length=results[0]
                console.log(length);
                
                const sql="select * from items where title REGEXP ? limit ? offset ?"
                connection.query(sql,[str,size,offset],(err,results)=>{
                    if(err){
                        res.err(err)
                    }
                    if(results.length<=0) res.err("获取数据失败")
                    res.send({status:0,message:"获取数据成功",torrent:{
                        Data:results,
                        Length:length["count(*)"]
                    }})
                })
            })
        }else{
            const sql="select count(*) from items where title REGEXP ? and cat=?"
            connection.query(sql,[str,classify],(err,results)=>{
                if(err){
                    res.err(err)
                }
                if(results.length<=0) res.err("获取数据失败")
                length=results[0]
                console.log(length);
                
                const sql="select * from items where title REGEXP ? and cat=? limit ? offset ?"
                connection.query(sql,[str,classify,size,offset],(err,results)=>{
                    if(err){
                        res.err(err)
                    }
                    if(results.length<=0) res.err("获取数据失败")
                    res.send({status:0,message:"获取数据成功",torrent:{
                        Data:results,
                        Length:length["count(*)"]
                    }})
                })
            })
        }

    }

    
})


router.get("/index",(req,res)=>{
    res.send("milena")
})

module.exports=router