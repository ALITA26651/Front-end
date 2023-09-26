<!-- 个人页 -->
<template>
    <div class="avatar-vue" v-if="bool">
        <avatar @close="close"></avatar>
    </div>
    <div class="submit">
        <div class="box">
            <div class="top">
                <div class="left">
                    <div class="avatar" @click="editAvatar" :style="{ backgroundImage: ' url(' + imgData + ')' }"
                        style="background-size: cover;">
                        <div v-if="!imgData">
                            <svg t="1694770361859" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3228" width="45" height="45">
                                <path
                                    d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32"
                                    fill="#ffffff" p-id="3229"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="name">
                        <div class="nickname">
                            <p class="p-name" v-if="!isShow">{{ $store.userData.data?.nickname }}</p>
                            <input type="text" v-if="isShow" v-model="nickname" placeholder="请输入昵称"
                                @keydown.enter="changeEnd" @blur="changeEnd" ref="input">
                            <div class="but-name" @click="changeName" v-if="!isShow">
                                <svg t="1695543477369" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1339" width="28" height="28">
                                    <path
                                        d="M38.4 883.2h947.2v102.4H38.4zM410.1376 820.9152H102.4V513.1776L602.7776 12.8l307.7376 307.7376-500.3776 500.3776z m192.64-663.3088L204.8 555.584v162.9312l162.9056-0.0128L765.696 320.5248 602.7776 157.6064z"
                                        fill="#4C4C4C" p-id="1340"></path>
                                    <path d="M615.3088 471.0144L452.3904 308.096 524.8 235.6992l162.9184 162.9184z"
                                        fill="#40A9FF" p-id="1341"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="sign">
                            <p>编辑个性签名</p><input type="text" v-if="0">
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div @click="exit" class="close">
                        <svg t="1695134186830" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7086" width="20" height="20">
                            <path
                                d="M639.6 685.9c-11.5 0-22.9-4.4-31.7-13.1L351.2 416c-17.5-17.5-17.5-45.9 0-63.4s45.9-17.5 63.4 0l256.7 256.7c17.5 17.5 17.5 45.9 0 63.4-8.8 8.8-20.3 13.2-31.7 13.2z"
                                fill="#ffffff" p-id="7087"></path>
                            <path
                                d="M382.8 685.9c-11.5 0-22.9-4.4-31.7-13.1-17.5-17.5-17.5-45.9 0-63.4l256.7-256.7c17.5-17.5 45.9-17.5 63.4 0s17.5 45.9 0 63.4L414.5 672.7c-8.7 8.8-20.2 13.2-31.7 13.2z"
                                fill="#ffffff" p-id="7088"></path>
                            <path
                                d="M511.2 960.7c-114.8 0-229.5-43.7-316.9-131.1-174.8-174.8-174.8-459.1 0-633.9C369 21 653.4 21 828.1 195.8c174.8 174.8 174.8 459.1 0 633.9-87.3 87.3-202.1 131-316.9 131z m0-806.4c-91.8 0-183.6 35-253.5 104.8-139.8 139.8-139.8 367.3 0 507.1s367.3 139.8 507.1 0 139.8-367.3 0-507.1C694.9 189.3 603 154.3 511.2 154.3z m285.3 643.6h0.2-0.2z"
                                fill="#ffffff" p-id="7089"></path>
                        </svg>
                        <div class="font">退出登录</div>
                    </div>
                </div>
            </div>
            <div class="basic">
                <p class="item">基本情况</p>
                <p class="content">生日：{{ $store.userData.data?.birthday }}</p>
                <p class="content">毕业于国内某普通一本大学，专业软件工程，正在努力学习前端中</p>
            </div>
            <div class="tech">
                <p>技术栈</p>
                <ol class="ol">
                    <li>HTML, CSS, JS (ES6), TS</li>
                    <li>LESS SCSS</li>
                    <li>Vue3</li>
                    <li>Nodejs 基本网络编程</li>
                    <li>打包工具: Vite, Webpack</li>
                    <li>MySql</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import avatar from '@/components/avatar/avatar.vue';
import { ref, onMounted, onUpdated, watchEffect } from 'vue';
/* import { getAvatar } from '@/api/article'; */
import useArticleStore from "@/store/article"
import { postName } from "@/api/article"

const $store = useArticleStore()

const router = useRouter()

let bool = ref(false)
let imgData = ref()
let isShow = ref(false)
let nickname = ref()

const input = ref<HTMLInputElement | null>(null)

// 退出登录
const exit = () => {
    localStorage.removeItem("token")
    // 清空state中的数据
    $store.$reset()
    router.push({
        path: "/login"
    })
}

const editAvatar = () => {
    bool.value = true
}

const close = (data: boolean) => {
    bool.value = data
    // 刷新页面
    /* location.reload() */
    watchEffect(async () => {
        if (bool.value == false) {

            await $store.getUserFile()
            let imgStr = `data:image/png;base64,${$store.userData.data.avatar}`
            imgData.value = imgStr
        } else {

        }
    })
}

// 编辑昵称
const changeName = () => {
    isShow.value = true
    watchEffect(() => {
        if (input.value) {
            input.value?.focus()
        } else {

        }
    })
}
const changeEnd = async () => {
    isShow.value = false
    postName(nickname.value)
    await $store.getUserFile()
}


onMounted(async () => {

    // getAvatar().then(result=>{
    //     let imgStr=`data:image/png;base64,${result.data.img}`
    //     imgData.value=imgStr
    //     /* console.log(imgStr); */
    // })
    let imgStr = `data:image/png;base64,${$store.userData.data.avatar}`
    imgData.value = imgStr
})


onUpdated(async () => {
    // 有问题
    /* await $store.getUserFile() */
    // watchEffect(async ()=>{
    //     console.log(nickname);

    //     if(nickname.value){
    //         await $store.getUserFile()
    //     }
    // })
    // let imgStr = `data:image/png;base64,${$store.userData.data.avatar}`
    // imgData.value = imgStr
})
</script>

<style scoped lang="scss">
.avatar-vue {
    position: fixed;
    z-index: 11;
}

.submit {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .box {
        width: 900px;
        min-height: 250px;
        background-color: white;
        padding: 0 20px;
        border-radius: 10px;
        box-shadow: 1px 1px 5px rgb(150, 150, 150);

        .top {
            height: 250px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;

            .left {
                display: flex;
                align-items: center;
                margin-top: 20px;

                .avatar {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120px;
                    height: 120px;
                    background-color: cadetblue;
                    border-radius: 50%;
                    box-shadow: 1px 1px 8px rgb(119, 119, 119);
                    transition-property: all;
                    transition-duration: 0.5s;
                    border: 3px solid white;

                    &:hover {
                        transform: scale(1.08);
                        cursor: pointer;
                    }
                }

                .name {
                    margin-left: 30px;

                    .nickname {
                        font-weight: 300;
                        font-size: 40px;
                        display: flex;
                        align-items: center;
                        margin-bottom: 40px;

                        input {
                            border: 0;
                            font-weight: 300;
                            font-size: 28px;
                            border-bottom: 1px solid rgba(148, 148, 148, 0.4);
                        }

                        .but-name {
                            margin-left: 10px;
                            margin-bottom: 3px;
                            transition-property: all;
                            transition-duration: 0.3s;

                            &:hover {
                                cursor: pointer;
                                transform: scale(1.1);
                            }
                        }
                    }

                    .sign {
                        margin-left: 3px;
                    }
                }
            }

            .right {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 115px;
                height: 40px;
                margin-top: 80px;
                margin-right: 20px;
                padding: 10px;
                background-color: rgb(104, 193, 163);
                color: rgb(255, 255, 255);
                border-radius: 10px;
                transition-property: all;
                transition-duration: 0.3s;
                font-weight: 100;
                box-shadow: 1px 1px 4px rgb(190, 190, 190);

                .close {
                    display: flex;
                    align-items: center;

                    .font {
                        margin-left: 5px;
                    }
                }

                &:hover {
                    cursor: pointer;
                    transform: scale(1.001);
                    background-color: rgb(219, 211, 196);

                }
            }
        }

        .basic {
            margin: 0 20px;
            margin-top: 20px;
            padding: 10px 0;
            font-size: 25px;
            font-weight: 300;

            .item {
                border-bottom: 1px solid rgba(190, 190, 190, 0.5);
                padding-bottom: 10px;
            }

            .content {
                margin-top: 20px;
                margin-left: 20px;
                font-size: 18px;
            }
        }

        .tech {
            margin: 0 20px;
            margin-top: 20px;
            padding: 10px 0;
            font-size: 25px;
            font-weight: 300;
            margin-bottom: 60px;

            p {
                border-bottom: 1px solid rgba(190, 190, 190, 0.5);
                padding-bottom: 10px;
            }

            .ol {
                padding: 20px 40px;
                font-size: 18px;
                list-style-type: decimal;

                li {
                    line-height: 25px;
                }
            }
        }


    }
}</style>