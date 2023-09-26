<template>
    <div class="content">
        <el-autocomplete
            :fetch-suggestions="querySearch"
            v-model="keyword"
            clearable
            class="inline-input w-50"
            placeholder="Please Input"
            @select=""
            @keydown.enter="emitdata"
        />
        <el-button type="primary" :icon="Search" @click="emitdata"></el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Search } from '@element-plus/icons-vue'
let keyword=ref<string>("")

const emits=defineEmits(["getKeyword"])

const emitdata=()=>{
    emits("getKeyword",keyword.value)
}

// 自动补全输入框
interface RestaurantItem {
  value: string
  link: string
}
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

</script>

<style scoped lang="scss">
.content {
    height: 50px;
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 针对element-plus封装好的组件，需要使用深度选择器去实现 */
    ::v-deep(.el-input__wrapper) {
        width: 600px;
        margin-right: 20px;
    }
}
</style>