<template>
    <div class="search" v-if="!keyword">
        <div class="top">
            <p>Milena's Blog</p>
            <p>搜索</p>
        </div>
        <searchBar></searchBar>
    </div>
    <div class="search-box" v-if="keyword">
        <div>
            <p class="p_">KEYWORD：{{ keyword }}</p>
            <ul class="boxBg">
                <li class="content" v-for="item in data.data" @click="goArticle(item)">
                    <div class="img"
                        :style="{ backgroundImage: `url(data:image/png;base64,${item.img})`, backgroundSize: 'cover' }"></div>
                    <div class="font">{{ item.title }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import searchBar from '@/views/blog/search/searchBar.vue';
import { onMounted, ref, onUpdated } from 'vue';
import { useRoute,useRouter } from "vue-router"
const $route = useRoute()
const $router = useRouter()

let keyword = ref()
let data = ref()

const goArticle=(item:any)=>{

    // item.label已经是数组
    $router.push({
        path:"/home/article",
        state: {
            title: item.title,
            article: item.article,
            time: item.time,
            label: item.label,
            classification: item.classification
        }
    })
}

onMounted(() => {
    keyword.value = $route.query.keyword
    data.value = history.state

})
onUpdated(() => {
    keyword.value = $route.query.keyword
    data.value = history.state
})
</script>

<style scoped lang="scss">
.search {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 190px;

    .top {
        display: flex;
        font-size: 50px;
        font-weight: 100;
        margin-bottom: 20px;
        color: rgb(102, 102, 102);

        p {
            margin: 0 10px;
        }
    }
}

.search-box {
    display: flex;
    justify-content: center;
    .p_ {
        margin-top: 25px;
        height: 40px;
        font-size: 25px;
        font-weight: 100;
    }
    .boxBg {
        width: 1000px;
        min-height: 500px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;

        .content {
            width: 260px;
            height: 200px;
            margin: 0 25px;
            border-radius: 10px;
            box-shadow: 1px 1px 5px rgb(161, 161, 161);
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.7);
            box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.3);
            transition-property: all;
            transition-duration: 0.5s;
            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }

            .img {
                width: 260px;
                height: 140px;
                border-radius: 5px 5px 0 0;
                background-color: rgb(229, 222, 208);
            }

            .font {
                font-weight: 100;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

}</style>