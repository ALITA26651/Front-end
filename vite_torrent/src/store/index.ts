import { createPinia,PiniaPluginContext } from "pinia"
import { toRaw } from "vue"


type Options={
    key?:string
}
const __piniaKey__="defaultKey"
// 定义存储函数
const setStorage=(key:string,value:any)=>{
    localStorage.setItem(key,JSON.stringify(value))
}
// 定义获取state函数
const getStorage=(key:string)=>{
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

// options localStorage的key值
const piniaPlugin=(options:Options)=>{
    

    return (context:PiniaPluginContext)=>{
        /* console.log(context); 包含了注册的pinia的实例 */

        const { store } = context
        const data=getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
        /* console.log(data); */
        
        // store值发生变化时就会执行，store就是definePinia的实例
        store.$subscribe(()=>{
            // toRaw 将响应式对象变为原始对象
            setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`,toRaw(store.$state))
        })
        /* console.log(store); store中有 $id:"monika" $state 和 pinia的方法等等 */
        
        // data解构出来，放到store上
        return {
            ...data
        }
    }
}

const pinia = createPinia()

// 安装插件时调用,将这个函数传给pinia
pinia.use(piniaPlugin({
    key:"pinia"
}))


export default pinia