<template>
    <div>
        <div class="blog_right">
            <div class="blog_top">
                <p>个人信息</p>
                <div class="avatar" @click="about" :style="{ backgroundImage: `url(${imgStr})` }"
                    style="background-size: cover; background-repeat: no-repeat;">
                    <!-- <img src="../../../assets/image/bili.png" alt=""> -->
                </div>
                <p class="nickname">Milenaangel</p>
                <div class="classify">
                    <div class="classify_">
                        <p>文章</p>
                        <div class="num">20</div>
                    </div>
                    <div class="classify_">
                        <p>标签</p>
                        <div class="num">12</div>
                    </div>
                    <div class="classify_">
                        <p>归档</p>
                        <div class="num">21</div>
                    </div>
                </div>
                <div class="bot-icon">
                    <div class="left">
                        <svg t="1695134811720" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1090" width="32" height="32">
                            <path
                                d="M512.465 98.744c-236.05-2.401-429.41 187.034-431.998 423.242 0.894 183.912 120.176 346.283 295.332 402.018 21.6 3.93 29.451-9.04 29.451-20.436v-71.916c-120.17 25.545-145.7-56.59-145.7-56.59a112.364 112.364 0 0 0-47.914-62.089c-39.272-25.937 3.141-25.545 3.141-25.545a90.702 90.702 0 0 1 65.978 43.624c25.358 43.993 81.26 59.548 125.678 34.976a91.569 91.569 0 0 1 27.487-56.59c-95.825-10.615-196.36-46.768-196.36-209.067a163.13 163.13 0 0 1 43.591-114.358 148.652 148.652 0 0 1 4.32-111.609c15.896-35.223 36.525-11.397 117.815 43.229a419.24 419.24 0 0 1 216.002 0c82.471-54.626 117.82-43.229 117.82-43.229a148.657 148.657 0 0 1 4.32 111.61 163.145 163.145 0 0 1 45.945 113.57c0 162.695-101.321 198.458-196.36 209.067a98.273 98.273 0 0 1 29.452 78.594v115.933c0 13.752 7.856 24.756 29.457 20.43 174.63-56.071 293.466-218.106 294.545-401.622C941.878 285.778 748.52 96.343 512.465 98.744"
                                fill="#231F20" p-id="1091"></path>
                        </svg>
                    </div>
                    <div class="right">
                        <svg t="1695542853946" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1297" width="26" height="26">
                            <path
                                d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z"
                                fill="#2c2c2c" p-id="1298"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="blog_bottom">
                <p class="title">最新发布</p>
                <ul>
                    <li class="content" v-for="item in article" @click="goArticle(item)">
                        <div class="content-title">{{ item.title }}</div>
                        <div class="content-time">{{ item.time.split("T")[0] }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getNewText } from "@/api/article"
import { useRouter } from 'vue-router';
import useArticleStore from "@/store/article"
const $store = useArticleStore()

let index = ref(4)
let article = ref()
let imgStr = ref(`data:image/png;base64,${$store.userData.data?.avatar}`)

const $router = useRouter()

const goArticle = (item: any) => {
    let data = {
        title: item.title,
        label: item.label,
        time: item.time,
        article: item.article,
        classification: item.classification
    }

    $router.push({
        path: "/home/article",
        // state不能传数组
        state: data
    })
}

const about = () => {
    $router.push({
        path: "/home/about",
    })
}

onMounted(async () => {
    await getNewText(index.value).then((result) => {
        article.value = result.data.data

    })

})
</script>

<style lang="scss" scoped>
.blog_right {
    .blog_top {
        width: 250px;
        min-height: 390px;
        background-color: white;
        margin-bottom: 20px;
        border-radius: 10px;
        padding: 20px 10px;
        box-shadow: 1px 1px 5px 1px rgb(156, 156, 156);
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
            margin-top: 20px;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 1px 1px 5px rgb(133, 133, 133);
            transition-property: all;
            transition-duration: 0.5s;

            &:hover {
                transform: scale(1.05);
                cursor: pointer;
            }

        }

        .nickname {
            margin-top: 30px;
            font-size: 20px;
            font-weight: 200;
        }

        .classify {
            display: flex;
            margin-top: 20px;

            p {
                font-size: 18px;
                font-weight: 200;
                margin-bottom: 10px;
            }

            .num {
                font-weight: 500;
            }

            .classify_ {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 20px;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .bot-icon {
            margin-top: 16px;
            display: flex;
            align-items: center;
            width: 90px;
            justify-content: space-around;

            .left {
                &:hover {
                    cursor: pointer;
                }
            }

            .right {
                margin-top: 1px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .blog_bottom {
        width: 250px;
        height: 350px;
        background-color: white;
        border-radius: 10px;
        padding: 15px 15px;
        box-shadow: 1px 1px 5px 1px rgb(156, 156, 156);

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 10px;
            font-size: 18px;
            border-radius: 10px;
            background-color: blanchedalmond;
            margin-bottom: 15px;
        }

        .content {
            margin-top: 5px;
            height: 65px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &:hover {
                cursor: pointer;
                background-color: rgb(244, 239, 233);
                border-radius: 10px;
            }

            .content-title {
                font-size: 16px;
            }

            .content-time {
                font-size: 14px;
            }
        }
    }
}</style>