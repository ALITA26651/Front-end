<template>
    <div>
        <div class="search">
            <search></search>
        </div>
        <div class="homeBox">
            <div class="blogLeft" @click="goIndex">
                <p>Milena's Blog</p>
            </div>
            <div class="blogRight">
                <div class="svg" @click="goIndex">
                    <svg t="1693987084782" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3339" width="20" height="20">
                        <path
                            d="M768 790.56l-128-0.032v-118.944a128.224 128.224 0 0 0-128-128.192c-70.592 0-128 57.504-128 128.192v118.88l-128-0.032V364.992l255.68-167.52L768 365.376v425.184z m-192-0.032l-128-0.032v-118.912c0-35.392 28.704-64.192 64-64.192s64 28.8 64 64.192v118.944z m304.896-427.68L800 309.856V207.168a32 32 0 1 0-64 0v60.768l-206.464-135.296A31.296 31.296 0 0 0 511.424 128a31.168 31.168 0 0 0-17.6 4.64l-351.36 230.208a32 32 0 0 0 35.072 53.536L192 406.912v393.056c0 30.08 27.2 54.592 60.576 54.592h518.848c33.408 0 60.576-24.512 60.576-54.592v-392.64l13.856 9.056a31.968 31.968 0 0 0 35.04-53.536z"
                            fill="#231815" p-id="3340"></path>
                    </svg>
                    <p>首页</p>
                </div>
                <div class="svg" @click="goBlog">
                    <svg t="1693987626789" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3734" width="20" height="20">
                        <path
                            d="M224 831.936V192.096L223.744 192 800 192.096 800.256 832 224 831.936zM800.256 128H223.744A64 64 0 0 0 160 192.096v639.84A64 64 0 0 0 223.744 896h576.512A64 64 0 0 0 864 831.936V192.096A64 64 0 0 0 800.256 128z"
                            fill="#3E3A39" p-id="3735"></path>
                        <path
                            d="M640 416h-256a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64M640 576h-256a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64"
                            fill="#3E3A39" p-id="3736"></path>
                    </svg>
                    <p>博客</p>
                </div>
                <div class="svg">
                    <svg t="1693987667816" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3906" width="20" height="20">
                        <path
                            d="M796.992 497.696l-333.376 333.44h-0.128L191.904 559.68l333.44-333.44C533.472 225.408 553.6 224 601.28 224c82.24 0 191.68 4 193.824 5.12 4.16 111.296 5.824 236.896 1.92 268.576m62.08-269.76c0-35.2-28.64-63.84-62.656-63.84h-0.064C795.296 164.064 684.704 160 601.28 160c-96.16 0-104.8 4.64-115.2 15.04L146.656 514.464c-24.96 24.96-24.896 65.6 0.16 90.656l271.232 271.232c12.16 12.128 28.256 18.784 45.44 18.784 17.152 0 33.184-6.624 45.184-18.624l339.424-339.424c11.2-11.2 21.76-21.76 10.976-309.152"
                            fill="#3D3A39" p-id="3907"></path>
                        <path
                            d="M609.376 440.288c-26.464 0-48-21.536-48-48s21.536-48 48-48 48 21.536 48 48-21.536 48-48 48m0-160c-61.76 0-112 50.24-112 112s50.24 112 112 112 112-50.24 112-112-50.24-112-112-112"
                            fill="#3D3A39" p-id="3908"></path>
                    </svg>
                    <!-- <p>归档</p> -->
                    <file></file>
                </div>
                <div class="svg" @click="goAbout">
                    <svg t="1693987772685" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4390" width="20" height="20">
                        <path
                            d="M512 832a318.432 318.432 0 0 1-215.648-84.256C351.264 729.984 443.008 704 509.952 704c68.064 0 162.048 26.976 216.608 44.704A318.24 318.24 0 0 1 512 832m0-224c-52.928 0-96-43.104-96-96.064v-95.872A96.16 96.16 0 0 1 512 320c52.928 0 96 43.104 96 96.064v95.872A96.16 96.16 0 0 1 512 608m0-416c176.448 0 320 143.552 320 320a318.016 318.016 0 0 1-59.136 184.704c-34.432-12-106.944-35.52-178.656-48.16C640.608 620.48 672 570.016 672 511.936v-95.872A160.224 160.224 0 0 0 512 256c-88.224 0-160 71.808-160 160.064v95.872c0 57.664 30.944 107.904 76.832 136.064-70.656 12.16-142.464 35.104-178.528 47.584A317.952 317.952 0 0 1 192 512c0-176.448 143.552-320 320-320m0-64C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128"
                            fill="#3E3A39" p-id="4391"></path>
                    </svg>
                    <p>关于</p>
                </div>
                <div class="svg" @click="goLogin" v-if="false">
                    <svg t="1693987966152" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4561" width="20" height="20">
                        <path
                            d="M800 835.328l-574.496 0.032A2.464 2.464 0 0 1 224 834.656v-118.656c0-5.856 5.92-14.944 12.096-17.44 1.056-0.448 69.408-30.272 149.952-50.464 41.248-10.336 85.632-18.208 125.952-18.208 36.64 0 76.736 6.496 114.816 15.456a1061.6 1061.6 0 0 1 161.856 53.536c5.312 2.176 11.328 11.296 11.328 17.12v119.36zM400.992 326.88A103.136 103.136 0 0 1 504.16 224a103.168 103.168 0 0 1 103.2 102.88v123.104a103.168 103.168 0 0 1-103.2 102.88 103.136 103.136 0 0 1-103.168-102.88v-123.104zM813.728 640c-3.904-1.728-58.56-25.6-129.312-45.76a883.616 883.616 0 0 0-72.608-17.6c36.096-30.592 59.552-75.68 59.552-126.656v-123.104A167.168 167.168 0 0 0 504.192 160c-92.16 0-167.2 74.72-167.2 166.88v123.104c0 52.352 24.768 98.624 62.72 129.28-25.472 5.376-50.112 11.872-72.8 18.656a1098.656 1098.656 0 0 0-115.648 41.664C182.016 651.328 160 684.192 160 716v131.68l1.696 4.992c9.504 27.936 35.136 46.72 63.808 46.72h572.992a65.536 65.536 0 0 0 64.96-56.96l0.544-126.4c0-31.616-21.952-64.416-50.272-76.032z"
                            fill="#3E3A39" p-id="4562"></path>
                    </svg>
                    <p>登录</p>
                </div>
                <div class="submit" @click="submit">
                    <svg t="1694006007371" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6543" width="24" height="24">
                        <path
                            d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32"
                            fill="#ffffff" p-id="6544"></path>
                    </svg>
                    <p>投稿</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import search from "@/components/search/search.vue"
import file from "@/components/top/file.vue"
import { useRouter } from "vue-router"
const router = useRouter()

const goIndex = () => {
    router.push({
        path: "/index"
    })
}
const goLogin = () => {
    router.push({
        path: "/login"
    })
}
const goBlog = () => {
    router.push({
        path: "/home/blog"
    })
}
const submit = () => {
    router.push({
        path: "/home/submit"
    })
}
const goAbout=()=>{
    router.push({
        path: "/home/about"
    })
}
</script>

<style lang="scss" scoped>
.search {
    position: fixed;
    z-index: 1000;
    left: 50%;
    transform: translate(-50%);
    margin-top: 6px;
}

.homeBox {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    position: fixed;
    width: 100vw;
    height: 63px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 2px 2px 5px rgb(142, 142, 142);
    z-index: 999;

    .blogLeft {
        margin-top: 15px;
        padding-left: 100px;
        font-size: 30px;
        font-weight: 200;

        &:hover {
            cursor: pointer;
        }
    }

    .blogRight {
        display: flex;
        padding-right: 100px;
        align-items: center;

        .svg {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            margin: 0px 10px;
            .icon {
                margin-top: 4px;
            }
            p {
                margin-left: 3px;
                margin-top: 2px;
            }

            &:hover {
                cursor: pointer;
                color: dodgerblue;
            }
        }

        .submit {
            width: 90px;
            height: 35px;
            background-color: #ff79a5;
            display: flex;
            align-items: center;
            border-radius: 8px;
            color: white;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-left: 20px;
            padding-left: 10px;
            box-shadow: 1px 1px 6px rgb(167, 167, 167);
            transition-property: all;
            transition-duration: 0.6s;

            &:hover {
                transform: scale(1.02);
                cursor: pointer;
                background-color: #ffa3c2;
            }

            P {
                margin-right: 16px;
            }
        }

    }
}</style>