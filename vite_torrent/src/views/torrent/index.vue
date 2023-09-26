<template>
    <div class="box">
        <!-- 菜单 -->
        <sort @getClass="getClass"></sort>
        <div class="content">
            <!-- 搜索栏 -->
            <search @getKeyword="getKeyword"></search>
            <!-- 磁力展示 -->
            <card :tableData=tableData :classify=classify></card>
            <!-- 分页器 -->
            <div class="page">
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="torNumber"
                        @size-change="sizeChange" @current-change="currentChange" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqAllTorrent } from "@/api/index"
import card from "@/views/torrent/card.vue"
import sort from '@/views/torrent/sort.vue';
import search from "@/views/torrent/search.vue"

let tableData: any = ref([])
let torNumber: any = ref(0)
let pageSize = ref<number>(10)
let currentPage = ref<number>(1)
let classify = ref<string>("all")
let keyword = ref<string>()


onMounted(() => {
    getTorrent()
    // 组件挂着完毕通知，通知pinia仓库发请求获取医院详情的数据，存储于仓库中 
})
// 获取torrent数据（异步函数）
const getTorrent = async () => {
    await reqAllTorrent(currentPage.value, pageSize.value, classify.value, keyword.value)
        .then((res) => {
            tableData.value = res.data.torrent.Data
            torNumber.value = res.data.torrent.Length
            // 设置文件大小后缀
            let num: number
            for (let item of tableData.value) {
                num = Number(item.size)
                let torSize
                if (item.size.length < 4) {
                    torSize = num + "B"
                    item.size = torSize
                } else if (item.size.length > 4 && item.size.length < 7) {
                    torSize = Math.round(num / 1024) + "KB"
                    item.size = torSize
                } else if (item.size.length > 7 && item.size.length < 10) {
                    torSize = Math.round(num / (1024 * 1024)) + "MB"
                    item.size = torSize
                } else {
                    torSize = (num / (1024 * 1024 * 1024)).toFixed(2) + "GB"
                    item.size = torSize
                }
            }

        })

}
// 每页显示的页数
const sizeChange = () => {
    getTorrent()
}
// 分页器页码发生变化时
const currentChange = () => {
    getTorrent()
}

// 获取分类
const getClass = (name: string) => {
    classify.value = name
    getTorrent()
}

// 获取搜索词，并返回请求搜索结果
const getKeyword = (word: string) => {
    keyword.value = word
    getTorrent()
}

</script>

<style lang="scss" scoped>
.box {
    margin: 0 auto;
    margin-top: 80px;
    width: 1100px;
    .content {
        padding: 10px 20px;
        margin-top: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
    }

    .page {
        margin-top: 40px;
    }
}
</style>