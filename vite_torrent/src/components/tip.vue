<!-- 提示信息全局组件 -->
<template>
    <div>
        <div class="tip-box" v-if="mask">
            <div class="mask"></div>
            <div class="tip-content">
                <div class="top">
                    <div class="left">
                        提示信息
                    </div>
                    <div class="right" @click="close">
                        <svg t="1694050455171" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6951" width="20" height="20">
                            <path
                                d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z"
                                fill="#3E3A39" p-id="6952"></path>
                        </svg>
                    </div>
                </div>
                <div class="detail">
                    <p>{{ msg.msg }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,onUpdated } from "vue"
let mask=ref("0")
// 定义泛型限制接收数据的类型
interface Props {
    msg:{
        msg:string
    }
}
withDefaults(defineProps<Props>(),{})
const emit=defineEmits(["closeMask"])

const close=()=>{
    mask.value="0"
    emit("closeMask",0)
}
onUpdated(()=>{
})
</script>

<style lang="scss" scoped>
.tip-box {
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s;

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.2;
    }

    .tip-content {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        min-height: 250px;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: .5rem;
        outline: 0;
        box-shadow: 1px 1px 8px rgb(125, 125, 125);
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0.95;
        background-color: #fff;

        .top {
            width: 330px;
            height: 50px;
            border-bottom: 1px rgb(183, 183, 183) solid;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 5px;
            .right {
                transition-property: all;
                transition-duration: 0.2s;
                padding-top: 3px;
                padding-left: 3px;
                padding-right: 3px;
                border-radius: 50%;
                &:hover {
                    cursor: pointer;
                    background-color: antiquewhite;
                }
            }
        }
        .detail {
            margin-top: 40px;
            font-size: 16px;
        }
    }
}

</style>