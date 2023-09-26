<!-- 分页器 -->
<template>
    <div class="blog_paper">
        <div class="paper">
            <ul>
                <div class="svg" @click="flip(0)">
                    <svg t="1695539068592" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3824" width="20" height="20">
                        <path
                            d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952"
                            fill="#3D3A39" p-id="3825"></path>
                    </svg>
                </div>
                <li v-for="(item, index) in store.articleData.pageNum" :key="index" @click="pager(item)"
                    :class="[item == pageNow ? 'onclick' : '']">{{ item }}</li>
                <div class="svg" @click="flip(1)">
                    <svg t="1695539091602" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4026" width="20" height="20">
                        <path
                            d="M693.792 498.24l-320-297.664a32 32 0 0 0-43.584 46.848l295.36 274.752-295.84 286.848a31.968 31.968 0 1 0 44.544 45.92l320-310.272a31.968 31.968 0 0 0-0.48-46.4"
                            fill="#3E3A39" p-id="4027"></path>
                    </svg>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import useArticleStore from "@/store/article"
const store = useArticleStore()

// 当前页码
const pageNow = ref(1)
// 页码大小
const pagerSize = ref(6)
const emit = defineEmits(["getData"])


const pager = async (item: number) => {
    pageNow.value = item
    // 翻页后获取文章
    await store.getArticleData(pagerSize.value, item)
    emit("getData", store.articleData)
    document.documentElement.scrollTop = 0;
}

// 翻页函数
const flip= async (item:number)=>{
    if(item===0){ // 向前翻页
        if(pageNow.value>1){
            pageNow.value=pageNow.value-1
            await store.getArticleData(pagerSize.value, pageNow.value)
            emit("getData", store.articleData)
            document.documentElement.scrollTop = 0;
            
        }else {
            document.documentElement.scrollTop = 0;
        }
    }else if(item===1){ // 向后翻页
        if(store.articleData.pageNum>pageNow.value){
            pageNow.value=pageNow.value+1
            await store.getArticleData(pagerSize.value, pageNow.value)
            emit("getData", store.articleData)
            document.documentElement.scrollTop = 0;
        }else{
            document.documentElement.scrollTop = 0;
        }
    }
    
}

onMounted(() => {
    emit("getData", { pageNow: pageNow.value, pagerSize: pagerSize.value })
})

</script>

<style scoped lang="scss">
.blog_paper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 30px;

    .paper {
        width: 960px;
        height: 64px;
        border-radius: 10px;
        background-color: white;
        box-shadow: 1px 1px 5px 1px rgb(156, 156, 156);
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
            width: 800px;
            display: flex;
            justify-content: center;
            align-items: center;

            li {
                width: 32px;
                height: 32px;

                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 3px;
                border-radius: 5px;

                &:hover {
                    background-color: antiquewhite;
                    cursor: pointer;
                }

            }
            .svg {
                margin: 0 10px;
                margin-top: 2px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
        // 点击之后的按键样式
        .onclick {
            background-color: antiquewhite;
        }
    }
}</style>