<template>
    <div class="box">
        <div class="content">
            <div class="img">
            </div>
            <div class="input">
                <div class="p">
                    <p class="p_">重置密码</p>
                </div>
                <div class="input_">
                    <input type="email" placeholder="请输入注册邮箱" v-model="email">
                    <input type="text" placeholder="请输入账号" v-model="account">
                    <input type="password" placeholder="请输入密码" v-model="password">
                    <input type="password" placeholder="请再次输入密码" v-model="password">
                </div>
                <div class="register" @click="goLogin">点击重置</div>
                <div class="bottom">
                    <p @click="goLogin">已有账号？点击登录</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"

let account = ref<string>("")
let password = ref<string>("")
let email = ref<string>("")

const router=useRouter()
const goLogin=()=>{
    router.push({
        path:"/login"
    })
}

</script>

<style scoped lang="scss">
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
            background-color: dodgerblue;
            height: 100%;
            width: 250px;
            border-radius: 10px 0px 0px 10px;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url(../../assets/image/love.jpg);
            opacity: 0.8;
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
                    margin-top: 10px;
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
                    margin: 15px 0px;
                    padding-bottom: 5px;
                    width: 250px;
                    height: 30px;
                    background-color: rgba(255, 255, 255, 0);
                    border-bottom: 2px solid rgba(132, 132, 132, 0.1);
                    font-size: 15px;
                    color: rgb(58, 116, 116);
                    transition-property: all;
                    transition-duration: 0.5s;

                    &:focus {
                        border-bottom: 2px solid rgb(81, 143, 108);
                    }
                }
            }

            .register {
                margin-top: 30px;
                height: 30px;
                width: 150px;
                font-size: 16px;
                line-height: 30px;
                text-align: center;
                margin-left: 140px;
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
                margin-left: 270px;
                margin-top: 15px;
                width: 250px;
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
</style>