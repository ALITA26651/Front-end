<template>
    <div class="history-box" ref="history">
        <div class="history">
            <div class="top">
                <p>搜索历史</p>
                <p class="p_" @click="remove">清空</p>
            </div>
            <ul class="history-label">
                <li class="li" v-for="item in arr"><p class="li-p" @click="search(item)">{{ item }}</p> 
                    <div class="svg" @click="removeSingle(item)"><svg t="1695304401963" class="icon"
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3228" width="14"
                            height="14">
                            <path
                                d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z"
                                fill="#515151" p-id="3229"></path>
                        </svg></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { searchArticle } from "@/api/article"
import { useRouter } from "vue-router"
import $bus from "@/utils/bus"

const $router=useRouter()

let arr=ref()

const history=ref(null)
const emit=defineEmits(["keyword"])

const remove=()=>{
    localStorage.removeItem("history")
    arr.value=JSON.parse(localStorage.getItem("history") as string)
}

const removeSingle=(item:string)=>{

    let recordArr:Array<string>=JSON.parse(localStorage.getItem("history") as string)
    recordArr.splice(recordArr.indexOf(item),1)
    localStorage.setItem("history",JSON.stringify(recordArr))

    // 删除后重新请求
    arr.value=JSON.parse(localStorage.getItem("history") as string)
    
}

// 点击搜索并跳转到指定页面
const search= async (item:string)=>{
    let { data }=await searchArticle(item,1,5)
    
    let result:Array<string>=JSON.parse(localStorage.getItem("history") as string)

    result.splice(result.indexOf(item),1)
    result.unshift(item)

    localStorage.setItem("history",JSON.stringify(result))

    $router.push({
        path:"/home/search",
        query:{
            keyword: item
        },
        state:data
    })
    arr.value=JSON.parse(localStorage.getItem("history") as string)
    $bus.emit("change",false)
    emit("keyword",item)
}

onMounted(()=>{
    arr.value=JSON.parse(localStorage.getItem("history") as string)
})

</script>

<style lang="scss" scoped>
.history-box {
    width: 448px;
    min-height: 130px;
    background-color: rgb(255, 255, 255);
    border-radius: 0px 0px 6px 6px;
    display: flex;
    justify-content: center;
    padding: 10px;

    .history {
        margin-top: 5px;
        width: 408px;

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .p_ {
                font-size: 12px;
                font-weight: 100;

                &:hover {
                    cursor: pointer;
                    color: #40c5f1;
                }
            }
        }

        .history-label {
            display: flex;
            justify-content: left;
            margin-top: 15px;
            flex-wrap: wrap;

            .li {
                margin-right: 8px;
                margin-bottom: 10px;
                font-size: 10px;
                padding: 8px;
                border-radius: 5px;
                background-color: rgb(244, 244, 244);
                display: flex;
                align-items: center;
                .li-p {
                    &:hover {
                        cursor: pointer;
                        color: #40c5f1;
                    }
                }
                .svg {
                    margin-left: 6px;
                    display: flex;
                    align-items: center;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>