<template>
    <div class="box">
        <!-- @select:菜单激活回调 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">ALL</el-menu-item>
            <el-menu-item index="2">MOVIES</el-menu-item>
            <el-menu-item index="3">XXX</el-menu-item>
            <el-menu-item index="4">TV</el-menu-item>
            <el-menu-item index="5" disabled>MILENA</el-menu-item>
            <el-sub-menu index="6">
                <template #title>WORKSPACE</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>

        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
/* 页面加载时默认激活菜单的 index */
const activeIndex = ref('1')

const emit = defineEmits(["getClass"])
const handleSelect = (index: string) => {
    switch (index) {
        case "1":
            emit("getClass", "all")
            break
        case "2":
            emit("getClass", "movies")
            break
        case "3":
            emit("getClass", "xxx")
            break
        case "4":
            emit("getClass", "tv")
            break
    }
}
</script>

<style scoped lang="scss">
.box {
    ::v-deep(.el-menu--horizontal) {
        background-color: rgba(255, 255, 255, 0.5);
    }
}

</style>
