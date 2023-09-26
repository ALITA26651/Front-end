<template>
    <div class="blogPage">
        <content></content>
        <myself></myself>
    </div>
    <div class="blog_paper">
        <pager @getData="getData"></pager>
    </div>
</template>

<script setup lang="ts">
import content from "@/views/blog/content/content.vue"
import myself from "@/views/blog/content/myself.vue"
import pager from "@/views/blog/content/pager.vue";

import { onMounted } from "vue";
import { ref } from "vue";

// 获取仓库对象
import useArticleStore from "@/store/article"

let store = useArticleStore()

let pageData = ref()
let articleData=ref()

const getData=(data:any)=>{
    pageData.value=data
}

onMounted( async () => {
    await store.getArticleData(pageData.value.pagerSize,pageData.value.pageNow)
    articleData.value=store.articleData
})
</script>

<style lang="scss" scoped>
.blogPage {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.blog_paper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 30px;
}
</style>