<template>
    <div class="select-box" @mouseenter="change" @mouseleave="change" ref="select">
        <div class="select">
            <div class="">归档</div>
        </div>
        <div class="option" v-if="state">
            <ul class="ul">
                <li v-for="item of file" @click="goLabel(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive,ref,onUpdated } from 'vue';
import { useRouter } from 'vue-router';
const $router=useRouter()

const select=ref<HTMLDivElement>()
const state = ref(false)

const file=reactive(["技术","项目记录","资源","生活记录",])

const change = () => {
    state.value = !state.value
}
const goLabel=(item:string)=>{
    
    $router.push({
        path:"/home/classify",
        query:{item}
    })
}

onUpdated(()=>{
    /* console.log(select.value?.getBoundingClientRect().width); */
    
})
</script>

<style scoped lang="scss">
.select-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .select {
        padding: 20px 0;
        margin-top: 2px;
        margin-left: 2px;
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
    .option {
        position: absolute;
        margin-top: 50px;
        .ul {
            background-color: rgba(255, 255, 255,0.9);
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: 1px 1px 2px rgb(164, 164, 164);
            li {
                margin: 5px 0px;
                padding: 5px 10px;
                color: black;
                &:hover {
                    cursor: pointer;
                    background-color: rgb(156, 186, 241);
                    border-radius: 5px;
                }
            }
        }
    }
}

</style>