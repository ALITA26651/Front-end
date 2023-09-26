<template>
    <div>
        <slot :model="model"></slot>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
let model=ref({
    name:"maxa",
    age:18
})
</script>

<style scoped lang="scss">
</style>