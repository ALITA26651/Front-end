const connection=require("../db/index")

// 投稿路由函数
const article=(req,res)=>{
    let data=req.body
    console.log(req.body);
    let userdata=req.auth
    const sql="INSERT INTO article (email,article,title,time,label,img,classification) VALUES (?,?,?,?,?,?,?)"
    connection.query(sql,[userdata.email,
        data.textData.article,
        data.textData.title,
        data.textData.time,
        data.textData.label,
        data.textData.img,
        data.textData.file
    ],(err,results)=>{
            if(err) res.err(err)
            if(results){
                if(results.affectedRows==0) return res.json({status:0,msg:"投稿失败"})
                res.json({status:1,msg:"投稿成功"})
            }
    })
}

// 获取文章路由函数
const getArticle=(req,res)=>{
    let { pageSize,currentPage }=req.query
    const sql="select count(*) from article"
    connection.query(sql,(err,results)=>{
        if(err) res.err(err)
        if(results.length<=0) return res.json({status:0,msg:"查询失败"})
        // 查询到的文章总数据
        let number=results[0]["count(*)"]
        if(number%pageSize===0){
            // 计算分页数
            pageNum=number/pageSize
        }else {
            pageNum=Math.trunc(number/pageSize)+1
        }

        const sql="select * from article limit ? offset ?"
        connection.query(sql,[Number(pageSize),(currentPage-1)*pageSize],(err,results)=>{
            if(err) res.err(err)
            if(results.length<=0) return res.json({status:0,msg:"查询失败"})
            res.json({status:1,msg:"查询成功",data:results,number:number,pageNum})
        })
    })
}

const newText=(req,res)=>{
    let { limit }=req.query
    const sql="select * from article order by id desc limit ?"
    connection.query(sql,Number(limit),(err,results)=>{
        if(err) res.err(err)
        if(results.length==0) res.json({status:0,msg:"查询失败"})
        res.json({status:1,msg:"查询成功",data:results})
    })
}

module.exports={
    article,
    getArticle,
    newText
}