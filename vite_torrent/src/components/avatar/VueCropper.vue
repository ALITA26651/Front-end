<template>
    <div style="width: 400px; height: 300px;">
        <VueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :canScale='option.canScale'
            :autoCrop='option.autoCrop'
            :autoCropWidth='option.autoCropWidth'
            :autoCropHeight='option.autoCropHeight'
            :canMoveBox='option.canMoveBox'
            :canMove='option.canMove'
            :centerBox='option.centerBox'
            :info='option.info'
            :fixedBox='option.fixedBox'
            @realTime='realTime'
        ></VueCropper>
    </div>
    <div class="crop-button">
        <div class="but" @click="getCropImg">点击裁剪头像</div>
    </div>
</template>

<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";
import { reactive,ref,onUpdated } from 'vue';

const props=defineProps(["imgFile"])
const emits=defineEmits(["getNewFile"])

const option=reactive({
    img: "", // 裁剪图片地址，这里可以本地图片或者链接，链接不用require
    outputSize: 1, // 裁剪生成图片质量
    outputType: 'jepg', // 裁剪生成图片格式
    canScale: true, // 图片是否允许滚轮播放
    autoCrop: true, // 是否默认生成截图框 false
    info: false, // 是否展示截图框信息
    autoCropWidth: 200, // 生成截图框的宽度
    autoCropHeight: 200, // 生成截图框的高度
    canMoveBox: true, // 截图框是否可以拖动
    fixedBox: true, // 固定截图框的大小
    canMove: true, // 上传图片是否可拖动
    centerBox: true, // 截图框限制在图片里面

    limitMinSize: [108, 108], // 裁剪框限制最小区域
    minCropBoxWidth: 108, // 设置最小裁切框宽度
    minCropBoxHeight: 108, // 设置最小裁切框高度
    enlarge: 1, // 图片根据截图框输出比例倍数
})


const cropper=ref()
// 获取裁剪后图片
const getCropImg=()=>{
    cropper.value.getCropData((data:any)=>{
        /* console.log(data); */
        emits("getNewFile",data)
    })
}

// 实时预览函数
const realTime=()=>{
    
}




onUpdated(()=>{
    option.img=props.imgFile
})
</script>

<style scoped lang="scss">
.crop-button {
    display: flex;
    justify-content: center;
    margin-top: 18px;
    .but {
        padding: 10px 20px;
        background-color: rgb(147, 192, 193);
        border-radius: 5px;
        color: white;
        box-shadow: 1px 1px 5px rgb(176, 176, 176);
        transition-property: all;
        transition-duration: 0.5s;
        &:hover {
            cursor: pointer;
            transform: scale(1.02);
            background-color: rgb(189, 219, 219);
        }
    }
}
</style>