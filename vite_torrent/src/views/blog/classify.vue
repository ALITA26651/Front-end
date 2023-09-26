<template>
    <div class="classify">
        <div>
            <div class="title">
                <p>归档{{ classification?.classification }}的文章</p>
            </div>
            <div class="content">
                <p class="p_">共计 XXX 文章，当前为第 XXX 篇文章</p>
                <div class="article-box">
                    <div class="article" v-for="item in classification" @click="goArticle(item)">
                        <p>{{ item.title }}</p>
                        <p>{{ item.time.split("T")[0] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUpdated, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from "vue-router"
import { classify } from '@/api/article';
const $route = useRoute()
const $router = useRouter()

let classification = ref()

const goArticle = (item: any) => {

    $router.push({
        path: "/home/article",
        state: item
    })
}

onMounted(() => {
    classify($route.query.item as string).then((result) => {
        classification.value = result.data.data


    })
    // 监听路由的参数变化并发送请求
    watchEffect(() => {
        classify($route.query.item as string).then((result) => {
            classification.value = result.data.data
        })
    })

})

onUpdated(() => {
    /* classify($route.query.item as string).then((result)=>{
        classification.value=result.data.data
        
    })
    console.log(classification.value); */
})
</script>

<style scoped lang="scss">
.classify {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 250px;
        padding: 10px 20px;
        background-color: white;
        box-shadow: 0 0 5px 2px rgba(128, 128, 128, 0.3);
        border-radius: 10px;
        display: flex;
        align-items: center;
        border: 2px solid salmon;
        border-radius: 10px;

        p {
            font-size: 20px;
        }
    }

    .content {
        margin-top: 20px;
        padding: 10px 20px;
        width: 900px;
        background-color: white;
        box-shadow: 0 0 5px 2px rgba(128, 128, 128, 0.3);
        border-radius: 10px;
        font-size: 20px;
        border: 2px solid rgb(235, 235, 235, 0.6);

        .p_ {
            margin: 10px 0px;
        }

        .article-box {
            margin-top: 20px;

            .article {
                padding: 10px;
                margin: 10px;
                display: flex;
                font-size: 18px;
                justify-content: space-between;
                transition-property: all;
                transition-duration: 0.2s;
                color: rgb(112, 112, 112);

                &:hover {
                    background-color: bisque;
                    cursor: pointer;
                    border-radius: 10px;
                    color: rgb(150, 157, 165);
                }
            }
        }

    }
}</style>