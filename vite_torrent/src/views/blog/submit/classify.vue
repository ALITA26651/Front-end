<template>
    <div class="select-box" @mouseenter="change" @mouseleave="change" ref="select">
        <div class="select">
            <!-- <div class="">归档:</div> -->
            <input type="text" name="" id="" v-model="classify" readonly placeholder="选择归档">
        </div>
        <div class="option" v-if="state">
            <ul class="ul">
                <li v-for="item of file" @click="selectFile(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive,ref,onUpdated } from 'vue';

const emit=defineEmits(["getFile"])

const select=ref<HTMLDivElement>()
const state = ref(false)

const file=reactive(["技术","项目记录","资源","生活记录",])
let classify=ref("")


const change = () => {
    state.value = !state.value
}
const selectFile=(item:string)=>{
    classify.value=item
    emit("getFile",classify.value)
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
    padding-bottom: 30px;
    font-size: 17px;
    .select {
        margin-left: 2px;
        display: flex;
        align-items: center;
        input {
            width: 110px;
            background-color: bisque;
            border-radius: 5px;
            border: 0;
            padding: 5px 10px ;
        }
        &:hover {
            cursor: pointer;
        }
    }
    .option {
        position: absolute;
        margin-top: 35px;
        .ul {
            
            background-color: rgba(255, 255, 255,0.9);
            padding: 1px 10px;
            border-radius: 5px;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, .3);
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