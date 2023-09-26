<!-- 简单版提示 -->
<template>
    <transition name="tip-style">
        <div class="simTip" v-if="status">
            <div class="tip-bg">
                <p>{{ tipMsg }}</p>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import $bus from '@/utils/bus';
import { onMounted } from 'vue';
import { ref } from "vue"
let status=ref<number>(0)
let tipMsg=ref("")

onMounted(()=>{
    // 向总线上绑定change事件，由其他组件触发该事件
    $bus.on("change",(data:any)=>{
        let allData=data
        status.value=allData.mask
        tipMsg.value=allData.msg
        setTimeout(()=>{
            status.value=0
        },2000)
    })
})

</script>

<style lang="scss" scoped>
.simTip {
    z-index: 9999;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    display: flex;justify-content: center;align-items: center;
    margin-top: 100px;
    .tip-bg {
        top: 10%;
        left: 50%;
        min-width: 100px;
        padding: 10px;
        min-height: 50px;
        background: rgb(119, 217, 119);
        border-radius: 5px;
        opacity: 0.8;
        color: rgb(35, 35, 35);
        display: flex;justify-content: center;align-items: center;
        box-shadow: 1px 1px 5px rgb(126, 126, 126);
    }
}
.tip-style-enter-active,.tip-style-leave-active {
    transition: 0.5s all ease-out;
}
.tip-style-enter-from {
    opacity: 0;
}
.tip-style-leave-to {
    opacity: 0;
}
</style>