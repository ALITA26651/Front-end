<template>
    <div :style="{boxShadow: history === true ? '1px 1px 5px rgb(142, 142, 142)': '',borderRadius:'5px'  }">
        <div class="search">
            <div class="content" :style="{ borderRadius: history === true ? '6px 6px 0px 0px' : '6px' }">
                <div class="left">
                    <input type="text" v-model="keyword" @click="change" placeholder="搜索用户和文章" @keyup.enter="goSearch">
                </div>
                <div class="right" @click="goSearch">
                    <img src="../../assets/ui/search.svg" alt="">
                </div>
            </div>
        </div>
        <searchHistory v-if="history" @keyword="getKeyword"></searchHistory>
    </div>
</template>

<script setup lang="ts">
import searchHistory from '@/components/search/searchHistory.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { searchArticle } from "@/api/article"

const router = useRouter()

let state = ref(false)
let keyword = ref("谢方圆")
let currentPage = ref(1)
let pageSize = ref(6)
// 点击搜索后关闭history
const emit = defineEmits(["close"])


defineProps({
    history: {
        type: Boolean
    }
})

const change = () => {
    state.value = true
}

const goSearch = async () => {
    emit("close", { bool: false, action: "click" })
    let { data } = await searchArticle(keyword.value, currentPage.value, pageSize.value)

    if (keyword.value) {


        if (!localStorage.getItem("history")) {
            let arr = []
            arr.push(keyword.value)
            localStorage.setItem("history", JSON.stringify(arr))
        } else {
            let arr: Array<string> = JSON.parse(localStorage.getItem("history") as string)
            let arrIndex = arr.findIndex((item: any) => item === keyword.value)

            if (arrIndex !== -1) {
                arr.splice(arrIndex, 1)
                arr.unshift(keyword.value)
                localStorage.setItem("history", JSON.stringify(arr))
            } else {
                arr.unshift(keyword.value)
                localStorage.setItem("history", JSON.stringify(arr))
            }
        }
    }

    router.push({
        path: "/home/search",
        query: {
            keyword: keyword.value,
        },
        state: data
    })
    keyword.value = ""
}

// 获取子组件的搜索词
const getKeyword=(item:string)=>{
    keyword.value=item
    
}

</script>

<style scoped lang="scss">
/* 搜索框组件加起来有448px宽 */
.search {
    display: flex;
    flex-direction: column;

    .content {
        display: flex;
        align-items: center;
        background-color: white;
        padding-left: 4px;

        .left {
            input {
                border: 0px;
                width: 400px;
                height: 34px;
                padding: 2px 10px;
                color: rgb(143, 157, 157);
                border-radius: 6px;
                background-color: rgb(248, 248, 248);

                &:focus {
                    color: rgb(0, 0, 0);
                    background-color: rgb(237, 237, 237);
                }
            }
        }


        .right {
            height: 40px;
            background-color: white;
            display: flex;
            align-items: center;
            padding: 0 6px;
            border-radius: 0 6px 6px 0;

            img {
                padding: 2px;

                &:hover {
                    background-color: rgb(232, 232, 232);
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }

    }
}
</style>