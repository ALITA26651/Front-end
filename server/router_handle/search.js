const connection=require("../db/index")

const search=(req,res)=>{
    const { keyword,currentPage,pageSize }=req.query
    if(!keyword) return res.json({msg:"请输入关键词",status:0})
    
    const sql="select count(*) from article where title REGEXP ? "
    connection.query(sql,[keyword],(err,results)=>{
        // 文章总数
        let total=results[0]["count(*)"]
        if(err) return res.err()
        if(results.length<1) return res.json({msg:"搜索失败",status:0})

        const sql="select * from article where title REGEXP ? limit ? offset ?"
        connection.query(sql,[keyword,Number(pageSize),Number((currentPage-1)*pageSize)],(err,results)=>{
            if(err) return res.err()
            if(results.length<1 || results===undefined ) res.json({msg:"搜索失败",status:0})
            res.json({msg:"搜索成功",status:1,data:results,total})
        })
        
    })
}

const classify=(req,res)=>{
    let { keyword }=req.query
    const sql="select * from article where classification=?"
    connection.query(sql,keyword,(err,results)=>{
        if(err) return res.err(err)
        if(results.length<1) return res.json({status:0,msg:`${keyword}类文章不存在`})
        res.json({msg:"hello",status:1,data:results})
    })
}

module.exports={
    search,
    classify
}