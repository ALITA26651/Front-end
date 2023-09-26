<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%" @row-click="clicklog">
            <el-table-column prop="title" label="Title" width="700"/>
            <el-table-column prop="dt" label="Dt" width="180" />
            <el-table-column prop="cat" label="Cat" width="90" />
            <el-table-column prop="size" label="Size" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { useRouter} from "vue-router"
const router=useRouter()

defineProps<{
    tableData:any
}>()
/* row-click 当某一行被点击时会触发该事件 */
const clicklog=(row:any)=>{
    console.log(row);
    router.push({
        path:"/detail",
        query:row
    })
}
</script>
<script lang="ts">
export default {
    name:"card"
}
</script>

<style lang="scss" scoped>
</style>