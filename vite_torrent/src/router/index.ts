
import { createWebHashHistory,createRouter,RouteRecordRaw } from "vue-router"

const routes:Array<RouteRecordRaw>=[
    {
        path:"/torrent",
        name:"index",
        component:() => import("@/views/torrent/index.vue"),
    },
    {
        path:"/detail",
        component:()=>import("@/views/torrent/detail.vue")
    },
    {
        path:"/",
        component:()=>import("@/views/Log&Reg/Log&Reg.vue"),
        redirect:"/login",
        children:[
            {
                path:"login",
                component:()=>import("@/views/Log&Reg/login.vue"),
                meta:{
                    index:1
                }
            },
            {
                path:"register",
                component:()=>import("@/views/Log&Reg/register.vue"),
                meta:{
                    index:2
                }
            },
            {
                path:"forget",
                component:()=>import("@/views/Log&Reg/forget.vue"),
                meta:{
                    index:3
                }
            }
        ]
    },
    {
        path:"/home",
        component:()=>import("@/views/home/index.vue"),
        redirect:"/home/blog",
        // 路由元信息
        meta:{
            // // 只有经过身份验证的用户才能访问
            requiresAuth:true
        },
        children:[
            {
                path:"blog",
                component:()=>import("@/views/blog/blog.vue")
            },
            {
                path:"submit",
                component:()=>import("@/views/blog/submit/submit.vue")
            },
            {
                path:"article",
                component:()=>import("@/views/blog/content/article.vue")
            },
            {
                path:"about",
                component:()=>import("@/views/blog/about.vue")
            },
            {
                path:"classify",
                component:()=>import("@/views/blog/classify.vue")
            },
            {
                path:"search",
                component:()=>import("@/views/blog/Search.vue")
            }
        ]
    },
    {
        path:"/index",
        component:()=>import("@/views/index/index.vue")
    }

]

const router=createRouter({
    history: createWebHashHistory(),
    routes,
    // 滚动行为：控制滚动条的位置
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    }
})

// 设置全局路由守卫
router.beforeEach((to,_from,next)=>{
    // form，to 路由对象
    // console.log(from,to);
    // 判断该页面是否需要权限
    if(to.meta.requiresAuth){
        const token=localStorage.getItem("token")
        if(!token || token=="null"){
            next({path:"/login"})
        }else {
            next()
        }
    }else{
        // 无权限只能跳转其他不需要权限的页面
        next()
    }
    
})

export default router