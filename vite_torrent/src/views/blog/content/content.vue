<template>
    <div>
        <ul class="blog_left">
            <li v-for="item in (store.articleData.data)" @click="goArticle(item)">
                <div class="left" v-if="item?.img"
                    :style="{ backgroundImage: 'url(' + `data:image/png;base64,${item?.img}` + ')', backgroundSize: 'cover' }">
                    <!-- <img :src="`data:image/png;base64,${item?.img}`" alt=""> -->
                </div>
                <div class="right">
                    <p class="p">{{ item?.title }}</p>
                    <div class="bottom">
                        <div class="day">
                            <svg t="1695542504115" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="966" width="18" height="18">
                                <path
                                    d="M595.0464 228.6592h-184.32a23.04 23.04 0 0 1 0-46.08h184.32a23.04 23.04 0 0 1 0 46.08z"
                                    fill="#3449FD" p-id="967"></path>
                                <path
                                    d="M338.8928 290.1504a23.04 23.04 0 0 1-23.04-23.04v-122.88a23.04 23.04 0 0 1 46.08 0v122.88a23.04 23.04 0 0 1-23.04 23.04zM666.7776 290.1504a23.04 23.04 0 0 1-23.04-23.04v-122.88a23.04 23.04 0 0 1 46.08 0v122.88a23.04 23.04 0 0 1-23.04 23.04z"
                                    fill="#EB6100" p-id="968"></path>
                                <path
                                    d="M810.24 182.5792h-71.68a23.04 23.04 0 0 0 0 46.08h71.68a38.4512 38.4512 0 0 1 38.4 38.4512v69.1712H157.0304V267.1104a38.4512 38.4512 0 0 1 38.4-38.4512h71.68a23.04 23.04 0 1 0 0-46.08h-71.68a84.5824 84.5824 0 0 0-84.48 84.5312v553.3184a84.5824 84.5824 0 0 0 84.48 84.48h614.8096a84.5824 84.5824 0 0 0 84.48-84.48V267.1104a84.5824 84.5824 0 0 0-84.48-84.5312z m0 676.2496H195.4304a38.4 38.4 0 0 1-38.4-38.4V382.3616h691.6096v438.0672a38.4 38.4 0 0 1-38.4 38.4z"
                                    fill="#3449FD" p-id="969"></path>
                                <path
                                    d="M328.6528 515.584h-61.44a23.04 23.04 0 1 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM533.5552 515.584h-61.44a23.04 23.04 0 0 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM738.5088 515.584h-61.44a23.04 23.04 0 1 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM328.6528 638.5152h-61.44a23.04 23.04 0 1 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM533.5552 638.5152h-61.44a23.04 23.04 0 0 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM738.5088 638.5152h-61.44a23.04 23.04 0 1 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM328.6528 761.4976h-61.44a23.04 23.04 0 0 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08zM533.5552 761.4976h-61.44a23.04 23.04 0 0 1 0-46.08h61.44a23.04 23.04 0 1 1 0 46.08zM738.5088 761.4976h-61.44a23.04 23.04 0 1 1 0-46.08h61.44a23.04 23.04 0 0 1 0 46.08z"
                                    fill="#EB6100" p-id="970"></path>
                            </svg>
                            <span>{{ item.time }}</span>
                        </div>
                        <div class="label" v-if="!(item.label === '' || item.label === null)">
                            <div v-for="index in item.label" class="label-box">
                                <svg t="1695542088421" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1072" width="16" height="16">
                                    <path
                                        d="M237.34197 254.354498m31.857601 0l318.007122 0q31.857601 0 31.857601 31.857601l0 0q0 31.857601-31.857601 31.857601l-318.007122 0q-31.857601 0-31.857601-31.857601l0 0q0-31.857601 31.857601-31.857601Z"
                                        fill="#0A71EF" opacity=".48" p-id="1073"></path>
                                    <path
                                        d="M237.34197 485.834101m31.857601 0l318.007122 0q31.857601 0 31.857601 31.857601l0 0q0 31.857601-31.857601 31.857601l-318.007122 0q-31.857601 0-31.857601-31.857601l0 0q0-31.857601 31.857601-31.857601Z"
                                        fill="#0A71EF" opacity=".48" p-id="1074"></path>
                                    <path
                                        d="M224.086933 716.858595m31.857601 0l127.487291 0q31.857601 0 31.857601 31.857601l0 0q0 31.857601-31.857601 31.857601l-127.487291 0q-31.857601 0-31.857601-31.857601l0 0q0-31.857601 31.857601-31.857601Z"
                                        fill="#0A71EF" opacity=".48" p-id="1075"></path>
                                    <path
                                        d="M455.737201 1006.47832H183.070272A181.645213 181.645213 0 0 1 0.002844 826.767318V179.71669A181.645213 181.645213 0 0 1 183.070272 0.005689h512.566041a181.645213 181.645213 0 0 1 183.067428 179.711001v284.897973a36.636241 36.636241 0 0 1-73.215594 0V179.71669a108.998506 108.998506 0 0 0-109.851834-108.088288h-512.566041a108.998506 108.998506 0 0 0-109.851834 108.088288v647.050628a108.998506 108.998506 0 0 0 109.851834 108.088288h272.666929a35.953578 35.953578 0 1 1 0 71.907156z"
                                        fill="#0A71EF" p-id="1076"></path>
                                    <path
                                        d="M794.053544 553.872834a58.879673 58.879673 0 0 1 41.926878 17.351015l113.777146 113.777145a59.39167 59.39167 0 0 1 0 83.796868l-192.454042 192.454042a59.107227 59.107227 0 0 1-30.207832 16.213243l-140.173444 27.989178a59.221004 59.221004 0 0 1-69.859167-69.062727l26.566963-141.652547a58.765896 58.765896 0 0 1 16.383909-30.947383l192.283377-192.340265a58.765896 58.765896 0 0 1 41.756212-17.578569z m-7.452403 66.673407z m106.154077 106.154077l-98.701674-98.701674-182.55543 182.612319-23.096761 123.106872 121.627769-24.291421z"
                                        fill="#FF7733" p-id="1077"></path>
                                </svg>
                                <span>{{ index }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useArticleStore from "@/store/article"
import { onMounted } from 'vue';
const store = useArticleStore()

const router = useRouter()



const goArticle = (item: any) => {

    let label
    if (item.label !== "" && item.label !== null) {
        /* console.log(JSON.stringify(item.label)); */
        label = JSON.stringify(item.label)
    }
    router.push({
        path: "/home/article",
        // state不能传数组
        state: {
            title: item.title,
            article: item.article,
            time: item.time,
            label: label,
            classification: item.classification
        }
    })
}
onMounted(() => {
    /* console.log(store.articleData); */

})

</script>

<style lang="scss" scoped>
.blog_left {
    margin-right: 20px;

    li {
        width: 690px;
        min-height: 130px;
        margin-bottom: 30px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 1px 5px 1px rgb(156, 156, 156);
        transition-property: all;
        transition-duration: 0.3s;
        display: flex;

        &:hover {
            background-color: rgb(216, 224, 212);
            cursor: pointer;
        }

        .left {
            display: flex;
            align-items: center;

            border-radius: 10px 0px 0px 10px;
            width: 200px;
            height: 170px;
        }

        .right {
            padding: 15px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .bottom {
                .day {
                    display: flex;
                    align-items: center;
                    color: #8a8a8a;
                    font-size: 15px;

                    span {
                        margin-top: 1px;
                        margin-left: 4px;
                    }
                }

                .label {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    margin-left: 2px;

                    .label-box {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        margin-right: 10px;

                        span {
                            margin-left: 4px;
                        }
                    }
                }
            }

            .p {
                height: 25px;
                font-size: 25px;
                font-weight: 500;
                margin-bottom: 35px;
                margin-top: 5px;
            }
        }
    }

}</style>