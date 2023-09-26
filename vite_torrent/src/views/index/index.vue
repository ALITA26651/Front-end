<!-- 首页 -->
<template>
    <div class="index">
    </div>
    <div class="indexBox">
        <div class="box">
            <div class="avatar" :style="{ backgroundImage: `url(data:image/png;base64,${avatar})`, backgroundSize: 'cover' }">
            </div>
            <div class="nickname">{{ $store.userData.data.nickname }}</div>
            <div class="content">
                
            </div>
            <div class="button" @click="goBlog">
                <p>进入博客</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router"
import useArticleStore from "@/store/article"
const $store = useArticleStore()
const $router=useRouter()

let avatar = ref()


const goBlog=()=>{
    $router.push({
        path:"/home/blog"
    })
}

onMounted(() => {
    avatar.value = $store.userData.data.avatar
})

</script>

<style lang="scss" scoped>
.index {
    &::after {
        z-index: -1;
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.6;
        background-image: url(../../assets/image/light.jpg);
    }

}

.indexBox {
    display: flex;
    justify-content: center;
    transform: translateY(50%);

    .box {
        width: 290px;
        min-height: 450px;
        border-radius: 10px;
        backdrop-filter: blur(4px);
        box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
        background-color: rgba(90, 90, 90, 0.6);

        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
            width: 180px;
            height: 180px;
            margin-top: 30px;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            border: 3px solid rgba(164, 164, 164, 0.7);
            box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.3);

            animation-iteration-count: infinite;
            animation-name: rotateimg;
            animation-duration: 60s;
            animation-timing-function: linear;

        }
        @keyframes rotateimg {
            from {

            }
            to {
                transform: rotateZ(360deg);
            }
        }
        .nickname {
            margin-top: 10px;
            padding: 15px;
            font-size: 25px;
            color: rgb(213, 213, 213);
        }
        .content {
            width: 180px;
            height: 110px;
        }
        .button {
            width: 200px;
            height: 30px;
            border-radius: 6px;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 30px 10px rgba(56, 56, 56, 0.3);
            transition-property: all;
            transition-duration: 0.2s;
            color: rgb(130, 130, 130);
            &:hover {
                cursor: pointer;
                transform: scale(1.05);
                color: white;
                background-color: rgba(255, 255, 255,0);
                border: 2px solid rgb(255, 255, 255,0.7);
            }
            p {
                font-size: 16px;
                
                font-weight: 600;
                
            }
            
        }
    }
}
</style>