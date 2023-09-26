<template>
    <div class="search" @click="clickEvent" ref="search">
        <searchIput :history="state" @close="close"></searchIput>
    </div>
</template>

<script setup lang="ts">
import searchIput from "@/components/search/searchInput.vue"
import { reactive,ref,onMounted } from "vue";
import $bus from "@/utils/bus"


let state=ref(false)
let result=ref()
const search=ref<HTMLDivElement>()
let action=ref()

// 元素坐标
let coordinate=reactive({
    top:0,
    bottom:0,
    left:0,
    right:0
})

const clickEvent=()=>{
    state.value=true
    result.value=search.value!.className

    /* console.log(search.value!.getBoundingClientRect()); */
    // 获取元素的坐标
    let { top,bottom,left,right }=search.value!.getBoundingClientRect()

    coordinate.top=top
    coordinate.bottom=bottom
    coordinate.left=left
    coordinate.right=right
    /* console.log(coordinate); */
    
}

// 点击搜索后关闭history 
interface Item {
    bool:boolean,
    action:string
}
const close=(item:Item)=>{
    state.value=item.bool
    action.value=item.action
    
}

onMounted(()=>{
    window.addEventListener("click",(e:MouseEvent)=>{
        /* console.log(e.clientX);
        console.log(e.clientY); */
        
        // 获取当前点击的坐标
        if( e.clientX>coordinate.right || 
            e.clientX<coordinate.left || 
            e.clientY>coordinate.bottom || 
            e.clientY<coordinate.top){
            
            state.value=false
            
        }else {
            // 点击搜索时，处理history显示问题
            if(action.value==="click"){
                state.value=false
                action.value=""
            }
            
        }
        
    })
    // 关闭history弹窗
    $bus.on("change",(param:any)=>{
        state.value=param
        
    })
})
</script>

<style scoped lang="scss">
.search {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>