<template>
    <div class="box">
        <!-- 提示信息 -->
        <tip :msg="loginMsg" v-if="mask" @closeMask="closeMask"></tip>
        <div class="content">
            <div class="img">
            </div>
            <div class="input">
                <div class="p">
                    <p class="p_">LOGIN</p>
                </div>
                <div class="input_">
                    <input type="text" placeholder="请输入账号" v-model="account">
                    <input type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="login" @click="login">登录</div>
                <div class="bottom">
                    <p @click="goReg">注册</p>
                    <p @click="goFor">忘记密码?</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from '@/utils/axios';
import useArticleStore from "@/store/article"
const $store = useArticleStore()

const router = useRouter()

let account = ref<string>("")
let password = ref<string>("")

let msg = ref()
let loginMsg: any = ref({})
let mask = ref(0)

// 登录
const login = async () => {
    // 输入密码的情况
    if (account.value == "") {
        loginMsg.value = {
            msg: "账号不能为空"
        }
        mask.value = 1
        return
    } else if (password.value == "") {
        loginMsg.value = {
            msg: "密码不能为空"
        }
        mask.value = 1
        return
    }

    await axios.post("http://127.0.0.1:9000/api/login",
        { account: account.value, password: password.value }).then((res) => {
            msg.value = res.data
        }, (err) => {
            return Promise.reject(err)
        })
    if (msg.value.status == "0") {
        if (msg.value.msg == "账号不存在") {
            loginMsg.value = {
                msg: "账号不存在，请重新输入"
            }
            mask.value = 1
        } else if (msg.value.msg == "密码错误") {
            loginMsg.value = {
                msg: "密码错误，请重新输入"
            }
            mask.value = 1
        }
    } else if (msg.value.status == "1") {
        console.log(msg.value.token);
        localStorage.setItem("token",msg.value.token)
        router.push({ path: "/index" })
        // 获取全部用户信息存入localStorage中
        $store.getUserFile()
    }
}

// 关闭提示信息
const closeMask = (num: number) => {
    console.log(num);
    mask.value = num
}


const goReg = () => {
    router.push({ path: "/register" })
}
const goFor = () => {
    router.push({ path: "/forget" })
}

</script>

<style lang="scss" scoped>
.box {
    height: 400px;
    width: 690px;
    margin-top: 220px;
    display: flex;
    justify-content: space-between;

    .content {
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        box-shadow: 1px 1px 5px rgb(152, 180, 187);

        .img {
            height: 100%;
            width: 250px;
            border-radius: 10px 0px 0px 10px;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url(../../assets/image/Ask.png);
            opacity: 0.75;
        }

        .input {
            background-color: rgba(255, 255, 255, 0.6);
            height: 100%;
            width: 440px;
            border-radius: 0px 10px 10px 0px;
            padding-top: 30px;

            .p {
                display: flex;
                justify-content: center;

                .p_ {
                    margin-top: 40px;
                    font-size: 40px;
                    letter-spacing: 10px;
                    font-weight: 100;
                }
            }

            .input_ {
                margin-top: 40px;
                margin-left: 95px;

                input {
                    display: block;
                    border: none;
                    margin: 25px 0px;
                    padding-bottom: 10px;
                    width: 250px;
                    height: 30px;
                    background-color: rgba(255, 255, 255, 0);
                    border-bottom: 2px solid rgba(132, 132, 132, 0.1);
                    font-size: 17px;
                    color: rgb(58, 116, 116);
                    transition-property: all;
                    transition-duration: 0.5s;

                    &:focus {
                        border-bottom: 2px solid rgb(81, 143, 108);
                    }
                }
            }

            .login {
                margin-top: 40px;
                height: 40px;
                width: 200px;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                margin-left: 120px;
                /* background: linear-gradient(to right, #ead6ee, #a0f1ea);  */
                background: linear-gradient(to right, rgb(169, 206, 223), rgb(113, 182, 179));
                color: rgb(133, 127, 117);
                border-radius: 5px;
                box-shadow: 2px 2px 5px rgb(192, 192, 192);
                transition-property: all;
                transition-duration: 0.5s;
                opacity: 0.8;

                &:hover {
                    transform: scale(1.02);
                    color: rgb(102, 96, 85);
                    cursor: pointer;
                    box-shadow: 2px 2px 15px rgb(192, 192, 192);
                }
            }

            .bottom {
                margin-left: 95px;
                margin-top: 30px;
                width: 250px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                padding: 5px;
                color: rgb(67, 129, 91);

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>@/utils/axios