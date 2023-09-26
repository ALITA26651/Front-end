import axios from "axios";
// import { ElLoading } from 'element-plus'
import $bus from "@/utils/bus"

// const router=useRouter()

// let loading:any

// loading动画开始 方法
/* function startLoading() {  
    // element-ui loading 服务调用方式  
    loading = ElLoading.service({ 
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.5)'
    })
} */

// loading结束 方法
/* function endLoading() {  
    loading.close()
} */


const instance=axios.create({
    timeout: 5000,
})

instance.interceptors.request.use((config)=>{
    // 请求显示loading 效果
    /* startLoading(); */

    return config
},(error)=>{
    // endLoading();
    return Promise.reject(error)
})

instance.interceptors.response.use((response)=>{ 
    /* endLoading(); */
    return response
},(error)=>{
    /* endLoading(); */
    // token过期处理
    if(error.response.data.status && error.response.status === 401) {
        localStorage.removeItem("token")
        $bus.emit("change",{mask:1,msg:"登录时间已到，请重新登录"})
    }
    return Promise.reject(error)
})

export default instance