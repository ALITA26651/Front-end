<template>
    <div class="box">
        <div class="content">
            <div class="img">
            </div>
            <div class="input">
                <div class="p">
                    <p class="p_">REGISTER</p>
                </div>
                <div class="input_">
                    <!-- <input type="text" placeholder="请输入昵称" v-model="account" @blur="checkInput">
                    <div class="check">
                        <validate v-show="accountStatus" :msg="accountMsg"></validate>
                    </div>
                    <input type="email" placeholder="请输入邮箱" v-model="email" @blur="checkInput">
                    <div class="check">
                        <validate v-show="emailStatus" :msg="emailMsg"></validate>
                    </div>
                    <input type="password" placeholder="请输入密码" v-model="password" @blur="checkInput">
                    <div class="check">
                        <validate v-show="passwordStatus" :msg="passwordMsg"></validate>
                    </div>
                    <input type="password" placeholder="请再次输入密码" v-model="confirmPw" @blur="checkInput">
                    <div class="check">
                        <validate v-show="confirmPwStatus" :msg="confirmPwMsg"></validate>
                    </div>
                    <input type="date" v-model="birthday" @blur="checkInput">
                    <div class="check">
                        <validate v-show="birthdayStatus" :msg="birthdayMsg"></validate>
                    </div> -->
                </div>

                <ul class="input_">
                    <li v-for="item in check" :key="item.id">
                        <input 
                        :type="item.type" 
                        v-model="item.data" 
                        :placeholder="item.tip"
                        @blur="item.func(item.id,item.name)"
                        @click=""
                        >
                        <div class="check">
                            <validate v-show="item.show" :msg="item.msg"></validate>
                        </div>
                    </li>
                </ul>


                <div class="register" @click="register">注册</div>
                <div class="bottom">
                    <p @click="goLog">已有账号？点击登录</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from "vue"
import { useRouter } from "vue-router"
import axios from '@/utils/axios';
import $bus from "@/utils/bus"
import validate from "@/views/Log&Reg/validate.vue"


const router = useRouter()

let account = ref<string>("")
let password = ref<string>("")
let email = ref<string>("")
let confirmPw = ref<string>("")
let birthday = ref()


// 注册数据参数
let accountStatus = ref(0)
let accountMsg = ref("")
let emailStatus = ref(0)
let emailMsg = ref("")
let passwordStatus = ref(0)
let passwordMsg = ref("")
let confirmPwStatus = ref(0)
let confirmPwMsg = ref("")
let birthdayStatus = ref(0)
let birthdayMsg = ref("")

// 检查注册数据
const checkInput = (index:any,name:any) => {
    /* console.log(check[index].data);
    console.log(name); */
    if (check[index].data == "") {
        if(name === "account"){
            accountStatus.value = 1
            accountMsg.value = "用户名不能为空"
        }else if(name==="email"){
            emailStatus.value = 1
            emailMsg.value = "邮箱不能为空"
        }else if(name==="password"){
            passwordStatus.value = 1
            passwordMsg.value = "密码不能为空"
        }else if(name==="confirmPw"){
            confirmPwStatus.value = 1
            confirmPwMsg.value = "密码不能为空"
        }else if(name==="birthday"){
            birthdayStatus.value = 1
            birthdayMsg.value = "生日不能为空"
        }
    } else if(check[index].data !== "") {
        if(name==="email"){
            console.log(email.value.search(/[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}\.com$/));
            
            if(email.value.search(/[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}\.com$/) === -1){
                emailStatus.value = 1
                emailMsg.value = "邮箱格式错误"
            }else{
                emailStatus.value = 0
            }
        }else if(name === "account"){
            accountStatus.value = 0
        }else if(name==="password"){
            passwordStatus.value = 0
        }else if(name==="confirmPw"){
            if(confirmPw.value!==password.value){
                confirmPwStatus.value = 1
                confirmPwMsg.value = "前后密码不一致"
            }else{
                confirmPwStatus.value = 0
            }
        }else if(name==="birthday"){
            birthdayStatus.value = 0
        }
    }
}

const check=reactive([
    {
        id:0,
        name:"account",
        data:account,
        type:"text",
        tip:"请输入账号",
        show:accountStatus,
        msg:accountMsg,
        func:checkInput
    },
    {
        id:1,
        name:"email",
        data:email,
        type:"email",
        tip:"请输入邮箱",
        show:emailStatus,
        msg:emailMsg,
        func:checkInput
    },
    {
        id:2,
        name:"password",
        data:password,
        type:"password",
        tip:"请输入密码",
        show:passwordStatus,
        msg:passwordMsg,
        func:checkInput
    },
    {
        id:3,
        name:"confirmPw",
        data:confirmPw,
        type:"password",
        tip:"请再次输入密码",
        show:confirmPwStatus,
        msg:confirmPwMsg,
        func:checkInput
    },
    {
        id:4,
        name:"birthday",
        data:birthday,
        type:"date",
        show:birthdayStatus,
        msg:birthdayMsg,
        func:checkInput
    }
    
])


// 提示状态
let mask = ref(0)
// 登录前检测
const register = async () => {
    let state = ref()

    if (account.value == "") {
        mask.value = 1
        $bus.emit("change", { mask: mask.value, msg: "昵称不能为空" })
        return
    } else if (email.value == "") {
        mask.value = 1
        $bus.emit("change", { mask: mask.value, msg: "邮箱不能为空" })
        return
    } else if (email.value) {
        let str = email.value as string
        console.log(str.search(/@[a-zA-Z0-9]{1,}\.com$/));
        if (str.search(/[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}\.com$/) === -1) {
            mask.value = 1
            $bus.emit("change", { mask: mask.value, msg: "邮箱格式错误" })
            return
        } else if (password.value == "") {
            mask.value = 1
            $bus.emit("change", { mask: mask.value, msg: "密码不能为空" })
            return
        } else if (confirmPw.value == "") {
            mask.value = 1
            $bus.emit("change", { mask: mask.value, msg: "请再次输入密码" })
            return
        } else if (birthday.value == "") {
            mask.value = 1
            $bus.emit("change", { mask: mask.value, msg: "生日不能为空" })
            return
        }
    }

    await axios.post("http://127.0.0.1:9000/api/register",
        {
            account: account.value,
            password: password.value,
            email: email.value,
            birthday: birthday.value
        }).then((result) => {
            let { data } = result
            state.value = data
        }, (err) => {
            return Promise.reject(err)
        })
    mask.value = 1
    // 通过全局事件总线发送数据
    if (state.value.state == "1") {
        return $bus.emit("change", { mask: mask.value, msg: "用户名已被注册，请重新输入" })
    } else if (state.value.state == "2") {
        return $bus.emit("change", { mask: mask.value, msg: "邮箱已被注册，请重新输入" })
    }
    $bus.emit("change", { mask: mask.value, msg: "注册成功！请重新登录" })
    router.push({ path: "/login" })
}

const goLog = () => {
    router.push({ path: "/login" })
}

</script>

<style lang="scss" scoped>
.box {
    height: 480px;
    width: 760px;
    margin-top: 180px;
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
            width: 320px;
            border-radius: 10px 0px 0px 10px;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url(../../assets/image/mei.jpg);
            opacity: 0.8;
        }

        .input {
            background-color: rgba(255, 255, 255, 0.6);
            height: 100%;
            width: 440px;
            border-radius: 0px 10px 10px 0px;
            padding-top: 20px;

            .p {
                display: flex;
                justify-content: center;

                .p_ {
                    margin-top: 30px;
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
                    margin-top: 6px;
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

                .check {
                    margin-top: 5px;
                    height: 12px;
                    width: 105px;
                }
            }

            .register {
                margin-top: 10px;
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
</style>@/utils/axios