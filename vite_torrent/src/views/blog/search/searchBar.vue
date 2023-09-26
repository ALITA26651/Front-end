<template>
    <div class="searchBar">
        <div class="content">
            <div class="svg">
                <svg t="1695297217664" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4371" width="28" height="28">
                    <path
                        d="M441.6 89.6c194.4 0 352 157.6 352 352 0 71.68-21.408 138.304-58.176 193.92l179.648 179.68a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-175.296-175.264A350.624 350.624 0 0 1 441.6 793.6c-194.4 0-352-157.6-352-352s157.6-352 352-352z m0 96a256 256 0 1 0 0 512 256 256 0 0 0 0-512z"
                        fill="#40c5f1" p-id="4372"></path>
                </svg>
            </div>
            <div class="input_">
                <input type="text" placeholder="输入关键词搜索">
            </div>
            <div class="button">
                <div>搜索</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(()=>{

})

</script>

<style scoped lang="scss">
.searchBar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 640px;
    height: 50px;
    background-color: white;
    border-radius: 5px;
    border: 2px solid #40c5f1;
    .content {
        display: flex;
        align-items: center;
        .svg {
            display: flex;
            align-items: center;
        }
        .input_ {
            input {
                width: 500px;
                height: 40px;
                border: 0;
                border-radius: 5px;
                padding: 10px;
                font-size: 16px;
            }
        }

        .button {
            width: 90px;
            height: 40px;
            background-color: #40c5f1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            border-radius: 5px;
            margin-left: 5px;
            font-size: 15px;
            &:hover {
                cursor: pointer;
                background-color: #81d9f6;
            }
        }
    }

}</style>