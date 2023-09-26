import instance from "@/utils/axios";


// 提交文章
export const subArticle=(email:string,textData:any)=>{
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"post",
        url: 'http://127.0.0.1:9000/blog/submit',
        headers:{"Authorization" : token },
        data:{
            email,
            textData,
        }
    })
}

// 获取文章
export const getArticle=(pageSize?:number,currentPage?:number)=>{
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"get",
        url: `http://127.0.0.1:9000/blog/article?pageSize=${pageSize}&currentPage=${currentPage}`,
        headers:{"Authorization" : token }
    })
}

// 获取最新发布文章
export const getNewText=(limit:number)=>{
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"get",
        url: `http://127.0.0.1:9000/blog/newtext?limit=${limit}`,
        headers:{"Authorization" : token }
    })
}

// 提交修改的头像
export const postAvatar=(data:any)=>{
    
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"post",
        url: `http://127.0.0.1:9000/myself/avatar`,
        headers:{"Authorization" : token },
        data:{
            imgData:data
        }
    })
}
// 获取用户信息
export const getUserdata=()=>{
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"get",
        url: `http://127.0.0.1:9000/myself/userdata`,
        headers:{"Authorization" : token }
    })
}
// 修改昵称
export const postName=(data:any)=>{
    
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"post",
        url: `http://127.0.0.1:9000/myself/nickname`,
        headers:{"Authorization" : token },
        data:{
            nickname:data
        }
    })
}

export const searchArticle=(keyword:string | number | null,currentPage:number,pageSize:number)=>{
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"GET",
        url: `http://127.0.0.1:9000/blog/search?keyword=${keyword}&pageSize=${pageSize}&currentPage=${currentPage}`,
        headers:{"Authorization" : token },
    })
}

// 获取归档文章
export const classify=(keyword:string | number | null,currentPage?:number,pageSize?:number)=>{
    let token=`Bearer ${localStorage.getItem("token")}`
    return instance({
        method:"GET",
        url: `http://127.0.0.1:9000/blog/classify?keyword=${keyword}&pageSize=${pageSize}&currentPage=${currentPage}`,
        headers:{"Authorization" : token },
    })
}