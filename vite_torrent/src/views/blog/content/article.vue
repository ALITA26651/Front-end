<template>
    <div class="article_box">
        <div class="title">
            <p class="p_">{{ articleData.title }}</p>
            <div class="time">{{ articleData.time }} 发布</div>
            <div class="time" v-if="articleData.classification"><span>归档：{{ articleData.classification }}</span></div>
            <div class="label" v-if="articleData.label">
                <span>标签:</span>
                <div class="label-content" v-for="item in JSON.parse(articleData.label)">
                    <svg t="1695177238072" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1614" width="20" height="20">
                        <path
                            d="M353.408 389.12a59.4944 59.4944 0 1 0 34.4576-34.3296l-88.704-88.448a24.32 24.32 0 0 0-34.4576 34.3552z"
                            fill="#03030D" p-id="1615"></path>
                        <path
                            d="M805.9136 487.3472L535.04 217.1904a86.6304 86.6304 0 0 0-122.1376 0l-34.816 34.5856 0.256 0.256a22.6048 22.6048 0 0 0-5.6576 15.1296 22.8864 22.8864 0 0 0 22.8864 22.8096 23.168 23.168 0 0 0 15.1808-5.632l0.256 0.256L445.44 249.728a39.9872 39.9872 0 0 1 56.5504 0L773.12 519.9104a39.936 39.936 0 0 1 0 56.32L575.5648 773.12a39.9616 39.9616 0 0 1-56.576 0L248.0128 503.2448a39.8848 39.8848 0 0 1 0-56.32L282.7008 412.16l-0.256-0.256a22.3744 22.3744 0 0 0 5.6576-15.104 23.04 23.04 0 0 0-38.0416-17.1776l-0.256-0.256L215.04 414.0544a85.9648 85.9648 0 0 0 0 121.7536l271.0272 270.1568a86.6304 86.6304 0 0 0 122.1376 0l197.4528-196.864a85.7344 85.7344 0 0 0 0.256-121.7536z"
                            fill="#03030D" p-id="1616"></path>
                    </svg>
                    <p>{{ item }}</p>
                </div>
            </div>
        </div>
        <div class="article">
            <div v-html="articleData.article" class="articleData line-numbers">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Prism from "prismjs"//导入代码高亮插件的core（里面提供了其他官方插件及代码高亮样式主题，你只需要引入即可）
import "prismjs/themes/prism-tomorrow.min.css"//引入代码高亮主题（这个去node_modules的安装prismjs中找到想使用的主题即可）
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js"//行号插件
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css"//行号插件的样式

let articleData = ref()

articleData.value = history?.state


onMounted(() => {
    Prism.highlightAll()
})

</script>

<style lang="scss" scoped>
.article_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 880px;
        min-height: 130px;
        background-color: azure;
        border-radius: 10px;
        box-shadow: 1px 1px 8px rgb(159, 159, 159);
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        .p_ {
            margin-top: 5px;
            font-size: 32px;
            font-weight: 200;
            margin-bottom: 15px;
        }

        .time {
            margin-top: 12px;
            font-size: 15px;
            color: rgb(120, 131, 132);
        }

        .label {
            margin-top: 12px;
            display: flex;
            align-items: center;
            color: rgb(120, 131, 132);
            ;

            .label-content {
                display: flex;
                align-items: center;
                margin: 0 3px;

                p {
                    margin: 0 1px;
                }
            }

        }
    }

    .article {
        width: 880px;
        min-height: 160px;
        background-color: azure;
        border-radius: 10px;
        box-shadow: 1px 1px 8px rgb(159, 159, 159);
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px;

        .articleData {
            width: 780px;
            font-size: 12px;
        }
    }
}</style>