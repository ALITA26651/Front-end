/* jwt失败处理中间件 */
const jwtErr=(err,req,res,next)=>{
    console.log(err.status);
    if(err.name==="UnauthorizedError") {
        return res.status(401).json({ status:401,message:"无效token" })
    }
    res.status(500).json({status:500,message:"未知错误"})
}

module.exports=jwtErr