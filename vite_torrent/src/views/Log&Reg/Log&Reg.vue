<template>
    <div class="background">
        <top></top>
        <div class="box">
            <!-- Vue3中router-view，keepAlive，transition嵌套使用。 -->
            <router-view v-slot="{ Component }">
                <transition :name="transitionName">
                    <keep-alive>
                        <component :is="Component"></component>
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

let transitionName = ref();

// 全局前置守卫
router.beforeEach((to: any, from: any) => {
    // 根据路由标记判断触发哪个动画
    if (to.meta.index > from.meta.index) {
        // 从右往左动画
        transitionName.value = 'slide-right';
    } else if (to.meta.index < from.meta.index) {
        // 从左往右动画
        transitionName.value = 'slide-left';
    } else {
        transitionName.value = '';
    }
});


</script>

<style lang="scss" scoped>
.background {
    overflow: hidden;
    height: 100vh;

    .box {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    &::after {
        content: "";
        opacity: 0.9;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-image: url(../../assets/image/lin.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;

    }
}

// 动画曲线
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 1s ease-out;
}

/* from 起点 to 终点 */
.slide-right-enter-from {
    transform: translateX(200%);
}

.slide-right-enter-to {
    transform: translateX(-50%);
}

.slide-right-leave-from {
    transform: translateX(50%);
}

.slide-right-leave-to {
    transform: translateX(-200%);
}


.slide-left-enter-from {
    transform: translateX(-200%);
}

.slide-left-enter-to {
    transform: translateX(-50%);
}

.slide-left-leave-from {
    transform: translateX(50%);
}

.slide-left-leave-to {
    transform: translateX(200%);
}</style>