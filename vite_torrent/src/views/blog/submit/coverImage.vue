<template>
  <!-- el-upload 本质是一个组件-->
  <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1" id="file" :on-change="getFile">
    <el-icon>
      <Plus />
    </el-icon>
    <!-- 插槽接收子组件提供的file值 -->
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" />

        <span class="el-upload-list__item-actions">

          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>

          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <el-icon>
              <Download />
            </el-icon>
          </span>

          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon>
              <Delete />
            </el-icon>
          </span>

        </span>

      </div>
    </template>

  </el-upload>

  <el-dialog v-model="dialogVisible" width="50%">
    <img w-full :src="dialogImageUrl" alt="Preview Image" class="image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'

// 图片本地地址
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

// 存储压缩后Base64图片
let imgBase64=ref()

const emit=defineEmits(["getImg"])

// 添加图片执行的函数
const getFile = () => {
  const file: any = document.getElementById("file")!.querySelector("input")?.files![0]

  let reader = new FileReader()   //新建一个FileReader对象
  reader.readAsDataURL(file)   //将读取的文件转换成base64格式

  reader.onload = async (e: any) => {
    let image = new Image()     //新建一个img标签（不嵌入DOM节点，仅做canvas操作)
    image.src = e.target!.result    //让该标签加载base64格式的原图

    // 最大尺寸限制
    const maxWidth = 400, maxHeight = 400
    let width = ref()
    let height = ref()

    let targetWidth = ref()
    let targetHeight = ref()
    // 定义义加载图片后赋值
    image.onload = () => {
      width.value = image.width,
      height.value = image.height
      /* console.log("#", width.value,height.value); */

      // 等比例计算超过最大限制时缩放后的图片尺寸
      if (width.value > maxWidth || height.value > maxHeight) {

        if (width.value / height.value > 1) {
          targetWidth.value = maxWidth
          targetHeight.value = Math.round(maxWidth * (height.value / width.value))
        } else {
          targetHeight.value = maxHeight
          targetWidth.value = Math.round(maxHeight * (width.value / height.value))
        }
      }
      let canvas = document.createElement('canvas'), //创建一个canvas元素
      context = canvas.getContext('2d'),    //context相当于画笔，里面有各种可以进行绘图的API
      data = ''    //存储压缩后的图片
      canvas.width = targetWidth.value    //设置绘图的宽度
      canvas.height = targetWidth.value    //设置绘图的高度
      /* console.log(targetWidth.value,targetHeight.value); */
      
      //使用drawImage重新设置img标签中的图片大小，实现压缩。drawImage方法的参数可以自行查阅W3C
      context!.drawImage(image, 0, 0, targetWidth.value, targetHeight.value)
      //使用toDataURL将canvas上的图片转换为base64格式
      data = canvas.toDataURL('image/jpeg')
      imgBase64.value=data
      /* console.log(imgBase64.value); */
      emit("getImg",imgBase64.value)
    }
  }

}

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

onMounted(() => {
})
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
}
</style>