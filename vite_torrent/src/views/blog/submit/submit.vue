<template>
    <div class="text-box">
        <div class="item">
            <p>博客投稿</p>
        </div>
        <div class="title">
            <input type="text" placeholder="请输入标题" v-model="title">
        </div>
        <!-- @input方法需要自己定义，不然父组件可能获取不到editor的值 -->
        <TEditor v-model="notificationForm.content" @input="data">
        </TEditor>
        <labelVue :title="title" :article="notificationForm.content"></labelVue>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import TEditor from '@/components/TEditor.vue';
import labelVue from '@/views/blog/submit/label.vue';



const title = ref("")
// 富文本编辑器内容
const notificationForm = reactive({
    content: '',
})


// defineEmits
const data = (val: any) => {
    // console.log(val);
    notificationForm.content = val
}

</script>

<style scoped lang="scss">
.text-box {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 40px;
    width: 830px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
        width: 700px;
        height: 56px;
        background-color: white;
        border-radius: 7px;
        border: 2px solid salmon;
        margin-bottom: 20px;
        box-shadow: 1px 1px 5px rgb(230, 230, 230);
        display: flex;
        align-items: center;

        p {
            margin-left: 15px;
            font-size: 20px;
            color: #ecf4f6;
            background-color: rgb(243, 172, 172);
            padding: 8px;
            border-radius: 5px;
            box-shadow: 1px 1px 5px rgb(230, 230, 230);
        }
    }

    .title {
        width: 700px;
        height: 70px;
        background-color: white;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 5px rgb(230, 230, 230);

        input {
            width: 670px;
            height: 32px;
            font-size: 26px;
            border: 0;
        }
    }

}
</style>