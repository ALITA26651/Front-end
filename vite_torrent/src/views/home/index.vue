<template>
    <homeTop></homeTop>
    <div class="homeContent">
        <div class="box">
            <router-view v-slot="{ Component }">
                <component :is="Component"></component>
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.homeContent {
    display: flex;
    justify-content: center;

    .box {
        width: 1100px;
        margin: 0 auto;
        background-color: rgba(245, 245, 245, 0.7);
        border: 2px solid rgb(255, 255, 255, 0.5);
        box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
        border-radius: 10px;
        padding: 10px;
        margin-top: 75px;
        margin-bottom: 45px;
        min-height: 100vh;
        
    }

    &::after {
        opacity: 0.7;
        content: "";
        background-image: url(../../assets/image/bh3.jpg);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }
}
</style>