<template>
    <div>
        <div class="tinymce-box">
            <Editor v-model="content" :init="init" :disabled="disabled" />
        </div>
    </div>
</template>

<script setup lang="ts">

/* import api from '@/services/rootapi/api.js'
这里的api是我定义的接口文件(一般情况下你只需要引入你的接口配置文件就可以了) */

//引入node_modules里的tinymce相关文件文件
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入则不显示编辑器

//引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue' 
import "tinymce/icons/default/icons";
import 'tinymce/themes/silver'  //编辑器主题，不引入则报错
import "tinymce/models/dom/model"; // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示

// 引入编辑器插件（基本免费插件都在这儿了）
import 'tinymce/plugins/advlist'  //高级列表
import 'tinymce/plugins/anchor'  //锚点
import 'tinymce/plugins/autolink'  //自动链接
import 'tinymce/plugins/autosave'  //自动存稿
import 'tinymce/plugins/charmap'  //特殊字符
import 'tinymce/plugins/code'  //编辑源码
import 'tinymce/plugins/codesample'  //代码示例
import 'tinymce/plugins/directionality'  //文字方向
import 'tinymce/plugins/emoticons'  //表情

import 'tinymce/plugins/fullscreen'  //全屏
import 'tinymce/plugins/help'  //帮助
import 'tinymce/plugins/image'  //插入编辑图片
import 'tinymce/plugins/insertdatetime'  //插入日期时间
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/nonbreaking' //插入不间断空格

import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/quickbars'  //快速工具栏
import 'tinymce/plugins/save'  //保存
import 'tinymce/plugins/searchreplace'  //查找替换

import 'tinymce/plugins/table'  //表格
import 'tinymce/plugins/template'  //内容模板

import 'tinymce/plugins/visualblocks'  //显示元素范围
import 'tinymce/plugins/visualchars'  //显示不可见字符
import 'tinymce/plugins/wordcount'  //字数统计

import { computed, ref, onMounted, reactive, watch } from 'vue'

// import $bus from "@/utils/bus"

const props = defineProps({
    // 默认的富文本内容
    modelValue: {
        type: String,
        default: ''
    },
    // 是否禁用Editor组件
    disabled: {
        type: Boolean,
        default: false
    },
    // 插件
    plugins: {
        type: [String, Array],
        default: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount autosave '
    },
    // 工具栏
    toolbar: {
        type: [String, Array],
        default: 'fullscreen undo redo fontsize codesample | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                table image charmap hr pagebreak insertdatetime preview | code selectall searchreplace visualblocks | indent2em lineheight formatpainter axupimgs'
    },
})


// init变量来初始化我们的编辑器，后面在生命周期函数中通过tinymce.init({})进行初始化
const init = reactive({
    language_url: '/tinymce/langs/zh-Hans.js',  // 引入语言包文件
    language: 'zh-Hans',  // 语言类型

    skin_url: '/tinymce/skins/ui/oxide',  // 皮肤：浅色 手动引入
    // skin_url: '/tinymce/skins/ui/oxide-dark',// 皮肤：暗色
    content_css: '/tinymce/skins/content/default/content.css', // 手动引入

    plugins: props.plugins,  // 插件配置
    toolbar: props.toolbar,  // 工具栏配置，设为false则隐藏

    font_size_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px',  //字体大小
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',  //字体样式
    lineheight_formats: "0.5 0.8 1 1.2 1.5 1.75 2 2.5 3 4 5",  // 行高配置，也可配置成"12px 14px 16px 20px"这种形式

    // 注：引入autoresize插件时，此属性失效
    width: 700,
    height: 500,  

    placeholder: '在这里输入文字',
    branding: false,  // tiny技术支持信息是否显示
    resize: false,  // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    elementpath: false,  // 元素路径是否显示

    content_style: "img {max-width:100%;}",  // 直接自定义可编辑区域的css样式
    // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
    paste_data_images: true,  // 图片是否可粘贴

    // 图片上传方法（注意！！：要使用 promise 对象中的 resolve 返回图片路径，否则会报错）
    // images_upload_handler: (blobInfo: any) => new Promise((_resolve, _reject) => {
    //     let formData = new FormData();
    //     formData.append('file', blobInfo.blob(), blobInfo.filename());
    //     // axios.post(`/api/backend/upload`, formData, {
    //     //     headers: ({
    //     //         'Content-Type': 'multipart/form-data',
    //     //         'Authorization': "Bearer " + localStorage.getItem("token")
    //     //     })
    //     // }).then((res: any) => {
    //     //     if (res.data.code === 1) {
    //     //         resolve(`/image_manipulation${res.data.data.filePath}`)
    //     //     } else {
    //     //         console.log("###");

    //     //     }
    //     // }).catch((error: any) => {
    //     //         reject(error);
    //     //     }
    //     // )
    // })

})


const emit = defineEmits(['input']);
// 监视内容
const content = ref(); // 富文本内容
watch(content, (newValue) => {
    emit("input",newValue)
}, {
    deep: true,
})


// 初始化富文本内容
const initContent = computed(() => {
    return props.modelValue
});
watch(initContent, (newVal) => {
    content.value = newVal;
}, { deep: true, immediate: true });


onMounted(() => {
    // 初始化富文本
    tinymce.init({})
})

</script>

<style lang="scss" scoped>
.tinymce-box {
    margin: 0 auto;
}
</style>