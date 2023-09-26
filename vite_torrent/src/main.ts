import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
// 通过@ts-ignore忽略ts的校验
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import "./style/reset.scss"
// 引入全局事件总线
import mitt from 'mitt'

import top from "./components/top.vue"
import homeTop from "@/components/homeTop.vue"
import tip from "@/components/tip.vue"
import simpleTip from "@/components/simpleTip.vue"
import router from "./router/index"
import store from "@/store/index"


const app=createApp(App)


// 全局挂载mitt
const Mitt=mitt()
// 如果遇到declare module 'vue'语句，则该声明被用作 vue 模块的声明。其中的接口ComponentCustomProperties会合并
declare module "vue" {
    export interface ComponentCustomProperties {
        // 获取mitt的全部类型，告诉ts挂载的全局属性$bus的类型是Mitt的，让这个库可以顺利通过类型检查
        $Bus:typeof Mitt
    }
}
app.config.globalProperties.$Bus=Mitt



app.use(router)
app.use(store)


app.use(ElementPlus,{locale:zhCn})
app.component("top",top)
app.component("homeTop",homeTop)
app.component("tip",tip)
app.component("simpleTip",simpleTip)

app.mount('#app')
