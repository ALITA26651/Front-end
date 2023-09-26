<template>
    <el-page-header :icon="ArrowLeft" @back="back">
    </el-page-header>
    <div class="content">
        <el-descriptions :title="torrentData.title" :column="3" border>
            <el-descriptions-item label="Username" label-align="right" align="center" label-class-name="my-label"
                class-name="my-content" width="150px">milenaangel</el-descriptions-item>
            <el-descriptions-item label="Added" label-align="right" align="center">{{ torrentData.dt }}</el-descriptions-item>
            <el-descriptions-item label="Size" label-align="right" align="center">{{ torrentData.size }}</el-descriptions-item>
            <el-descriptions-item label="Tag" label-align="right" align="center">
                <el-tag size="small">{{ torrentData.cat }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Torrent" label-align="right" align="center">magnet:?xt=urn:btih:{{ torrentData.hash }}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

let torrentData: any=route.query

onMounted(() => {
    console.log(torrentData);
})

const back = () => {
    router.back()
}
</script>

<style scoped lang="scss">
.content {
    margin-top: 20px;
}
</style>