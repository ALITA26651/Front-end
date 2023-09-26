const express=require("express")
const cors=require("cors")
const torrentRouter=require("./router/torrent")
const loginRouter=require("./router/login")
const blogRouter=require("./router/blog")
const myselfRouter=require("./router/myself")

// 错误处理中间件
const jwtErr=require("./jwt/jwtErr")


// expressJWT是一个对象，expressjwt方法需要在express-jwt中将其解构出来再使用
const expressJWT=require("express-jwt")
const secretKey=require("../server/secretKey/secretKey")


const app=express()
app.use(cors())


// 优化res.send代码，封装一个res.err错误处理函数
app.use((req,res,next)=>{
    res.err=(err,status=1)=>{
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(expressJWT.expressjwt({secret: secretKey,algorithms:["HS256"]}).unless({path:[/^\/api\//]}))
app.use(torrentRouter)
app.use("/api",loginRouter)
app.use("/blog",blogRouter)
app.use("/myself",myselfRouter)



app.listen(9000,()=>{
    console.log("server running on http://127.0.0.1:9000");
})

// express请求内的错误处理
// 我们可以自定义一个错误处理中间件函数,它比普通的中间件函数多了一个err参数
  
// 监听当前程序的未捕获的所有异常事件，可以进行重复监听。
// nodejs的process是一个全局对象，可以通过process控制程序的健壮性
// process.on('uncaughtException', function(err) {
//     console.log('Caught exception: ' + err);
// });

// 捕获解析 JWT 失败后产生的错误
app.use(jwtErr)

// 监听当前程序的未捕获的所有异常事件，可以进行重复监听。
// nodejs的process是一个全局对象，可以通过process控制程序的健壮性
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});