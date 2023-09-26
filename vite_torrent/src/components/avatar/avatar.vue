<template>
    <div class="crop-mask">
        <div class="cropper">
            <div class="crop">
                <VueCropper :imgFile="uploadImg" @getNewFile="getNewFile"></VueCropper>
            </div>
            <div class="crop-button">
                <div class="close" @click="close">
                    <svg t="1694862307991" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3228" width="28" height="28">
                        <path
                            d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z"
                            fill="#3E3A39" p-id="3229"></path>
                    </svg>
                </div>
                <div class="avatar" :style="{ backgroundImage: 'url(' + imageFile + ')' }" style="background-size: cover;">
                </div>
                <div class="upload">
                    <el-upload :auto-upload="false" class="upload-demo" action="#" :limit="1" :on-change="getImage"
                        :on-remove="outImage">
                        <el-button type="warning" plain>上传图片</el-button>
                        <el-button type="warning" bg disabled>确认修改</el-button>
                    </el-upload>
                </div>
                <div class="emit">
                    <el-button type="success" text bg @click="confirm">确认修改</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VueCropper from '@/components/avatar/VueCropper.vue';
import { ref } from 'vue';

import type { UploadFile } from "element-plus"

import { postAvatar } from "@/api/article"
import $bus from "@/utils/bus"


const imageFile = ref()
const uploadImg = ref()
const endImg = ref()


const bool = ref(false)

// about的emits
const emits = defineEmits(["close"])

// 获取上传文件，回调函数有两个参数，包含添加上传的文件信息
const getImage = (uploadFile: UploadFile) => {

    let file = new FileReader()
    file.readAsDataURL(uploadFile.raw!)
    file.onload = (e) => {

        imageFile.value = e.target!.result
        uploadImg.value = e.target!.result
        /* console.log(typeof e.target?.result); */

        let img = new Image()
        img.src = e.target!.result as any

        let width = ref()
        let height = ref()
        let targetWidth = ref()
        let targetHeight = ref()

        img.onload = () => {
            width.value = img.width,
                height.value = img.height

            let data = ""

            const maxWidth = 400, maxHeight = 400
            if (width.value > maxWidth || height.value > maxHeight) {

                if (width.value / height.value > 1) {
                    targetWidth.value = maxWidth
                    targetHeight.value = Math.round(maxWidth * (height.value / width.value))
                } else {
                    targetHeight.value = maxHeight
                    targetWidth.value = Math.round(maxHeight * (width.value / height.value))
                }
            }

            let canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")
            canvas.width = targetWidth.value
            canvas.height = targetHeight.value
            context?.drawImage(img, 0, 0, targetWidth.value, targetHeight.value)
            data = canvas.toDataURL('image/jpeg')
            endImg.value = data
        }
    }


}


// 获取裁剪后头像，并进行图片质量降低处理
const getNewFile = (data: string) => {
    /* console.log(data); // 图片Base64字符串 */
    imageFile.value = data

    let image = new Image()
    image.src = data

    let targetWidth = ref()
    let targetHeight = ref()

    image.onload = () => {
        const maxWidth = 400, maxHeight = 400
        targetWidth.value = maxWidth
        targetHeight.value = maxHeight

        let canvas = document.createElement("canvas")
        let context = canvas.getContext("2d")
        canvas.width = targetWidth.value
        canvas.height = targetHeight.value
        context?.drawImage(image, 0, 0, targetWidth.value, targetHeight.value)
        data = canvas.toDataURL('image/jpeg')
        endImg.value = data
    }

}

// 文件被移除文件时执行
const outImage = () => {
    imageFile.value = ""
    uploadImg.value = ""
}




// 发送头像Base64给服务器，同时关闭avatar
const confirm = () => {
    /* console.log(imageFile.value); */
    postAvatar(endImg.value.replace(/.*;base64,/, ''))
    $bus.emit("change", { mask: 1, msg: "修改成功!" })


    emits("close", bool.value)
}

// 在about中通过bool关闭头像
const close = () => {
    emits("close", bool.value)

}
</script>

<style scoped lang="scss">
.crop-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;


    .cropper {
        width: 700px;
        height: 400px;
        background-color: white;
        display: flex;
        justify-content: space-around;
        border-radius: 10px;
        box-shadow: 1px 1px 5px rgb(207, 224, 201);

        .crop {
            margin-top: 25px;
            margin-left: 25px;
            width: 406px;
            height: 305px;
            border: 3px salmon solid;
        }

        .crop-button {
            width: 294px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .close {
                margin-top: 10px;
                margin-left: 210px;

                &:hover {
                    transform: scale(1.1);
                    cursor: pointer;
                }
            }

            .avatar {
                width: 180px;
                height: 180px;
                margin-top: 20px;
                background-color: rgb(170, 230, 192);
                border-radius: 50%;
                box-shadow: 1px 1px 8px rgb(192, 192, 192);
                border: 3px solid white;
                transition-property: all;
                transition-duration: 0.5s;

                &:hover {
                    transform: scale(1.05);
                }
            }

            .upload {
                margin-top: 30px;
            }

            .emit {
                position: absolute;
                margin-top: 350px;
            }
        }
    }
}
</style>