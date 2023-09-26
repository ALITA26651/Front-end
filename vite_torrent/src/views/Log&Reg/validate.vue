<template>
    <div class="check">
        <p>{{ msg }}</p>
    </div>
</template>

<script setup lang="ts">

defineProps({
    msg:{
        type:String,
        default:""
    }
})
</script>

<style scoped lang="scss">
.check {
    /* background-color: bisque; */
    height: 12px;
    width: 100px;
    margin-left: 3px;
    font-size: 10px;
    color: rgb(255, 103, 103);
}

</style>