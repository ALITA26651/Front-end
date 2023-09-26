<template>
    <div class="bottom_box">
        <div class="bottom label">
            <div class="addLabel">
                <p>添加标签</p>
                <div class="inputLabel">
                    <input type="text" @keydown.enter="addLabel" v-model="label"><span>按回车Enter创建标签</span>
                </div>
            </div>
            <div class="labelBox">
                <ul class="showLabel" v-if="labelArr.length">
                    <li v-for="(item, index) in labelArr" :key="index">{{ item }}
                        <div class="li-button" @click="removeLabel(index)">
                            <svg t="1694601318708" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3224" width="15" height="15">
                                <path
                                    d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z"
                                    fill="#515151" p-id="3225"></path>
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cover">
            <div>
                <p class="p_">添加封面</p>
                <coverImage @getImg="getImg"></coverImage>
            </div>
            <div class="select">
                <p class="_p">归档：</p>
                <classify @getFile="getFile"></classify>
            </div>
        </div>
        <div class="bottom  button">
            <div class="submit but" @click="submit">提交文章</div>
            <div class="save but">存草稿</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import coverImage from '@/views/blog/submit/coverImage.vue';
import classify from "@/views/blog/submit/classify.vue"

import { ref, reactive } from "vue"
import { subArticle } from "@/api/article"
import { getCurrentTime } from "@/utils/time"
import $bus from "@/utils/bus"

const $router=useRouter()

let label = ref()
// 标签数组
let labelArr = reactive<Array<string>>([])

// Base64图片
let img=ref()
// 归档字符串
let file=ref()

const props = defineProps({
    article: {},
    title: {
        type: String
    }
})

// 添加标签
const addLabel = () => {
    if (labelArr.indexOf(label.value) !== -1) {
        return $bus.emit("change", { mask: 1, msg: "标签不能重复！请重新输入" })
    }
    labelArr.push(label.value)
    
    label.value=""
}

// 删除标签
const removeLabel = (item: number) => {
    labelArr.splice(item, 1)
}

// 获取Base64字符串
const getImg=(item:any)=>{
    /* console.log(item); */
    img.value=item.replace(/.*;base64,/, '')
    /* console.log(img.value); */
}
// 获取归档分类
const getFile=(item:any)=>{
    file.value=item
}

// 提交文章
const submit = () => {
    // 解决toISOString()时区不准确的问题
    let time = new Date(+new Date() + 8 * 3600 * 1000)
    let currentTime = getCurrentTime(time)

    let allLabel = ref("")

    // 变换标签字符串数组成字符串
    // for (let item of labelArr) {

    //     if (item == labelArr[0]) {
    //         allLabel.value = item + "-"
    //     } else if (item == labelArr[labelArr.length - 1]) {
    //         allLabel.value = allLabel.value + item
    //         // 最终输出
    //         /* console.log(allLabel); */
    //     } else {
    //         allLabel.value = allLabel.value + item + "-"
    //     }
    // }
    allLabel.value=JSON.stringify(labelArr)
    
    // 判断标题和文章是否为空
    if (props.title == "") {
        $bus.emit("change", { mask: 1, msg: "标题不能为空，请输入标题！" })
        return
    } else if (props.article == "") {
        $bus.emit("change", { mask: 1, msg: "文章不能为空，请输入文章！" })
        return
    } else if( file.value=="" || file.value==null ){
        $bus.emit("change", { mask: 1, msg: "归档为空，请输入归档！" })
        return
    }

    subArticle("milena", {
        title: props.title,
        article: props.article,
        time: currentTime,
        label: allLabel.value,
        img:img.value,
        file:file.value
    })
    $bus.emit("change", { mask: 1, msg: "文章提交成功!" })
    $router.replace({
        path:"/home/blog"
    })
}
</script>

<style scoped lang="scss">
.bottom_box {
    width: 700px;
    background-color: white;
    padding: 5px 20px;
    border-radius: 9px;

    .label {
        padding: 10px 0px;

        .addLabel {
            display: flex;

            .inputLabel {
                margin-left: 20px;
                margin-top: 5px;

                input {
                    width: 100px;
                    border-radius: 35px;
                    padding: 5px 13px;
                    font-size: 12px;
                    border: #b1dae8 2px solid;
                }

                span {
                    margin-left: 15px;
                    color: rgb(64, 146, 146);
                }
            }

            p {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                padding: 6px;
                background-color: salmon;
                color: wheat;
                border-radius: 4px;
            }
        }

        .labelBox {
            display: flex;
            margin-top: 10px;
            flex-wrap: wrap;
            border-top: 2px solid rgba(228, 228, 228, 0.5);
            .showLabel {
                display: flex;
                flex-wrap: wrap;

                li {
                    display: flex;
                    align-items: center;
                    border-radius: 35px;
                    padding: 4px 10px;
                    font-size: 12px;
                    margin-right: 10px;
                    background-color: #40c5f1;
                    color: white;
                    margin-top: 10px;

                    .li-button {
                        margin-left: 8px;

                        &:hover {
                            border-radius: 50%;
                            cursor: pointer;
                        }
                    }
                }
            }

            .inputLabel {
                input {
                    width: 100px;
                    border-radius: 35px;
                    padding: 5px 13px;
                    font-size: 12px;
                    border: #b1dae8 2px solid;
                }

                span {
                    margin-left: 15px;
                    color: rgb(64, 146, 146);
                }
            }

        }
    }

    .button {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;

        .but {
            width: 140px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px #40c5f1 solid;
            border-radius: 25px;
            box-shadow: 1px 1px 5px rgb(196, 196, 196);
        }

        .submit {
            background-color: #40c5f1;
            color: white;

            &:hover {
                background-color: #71d7fa;
                cursor: pointer;
            }
        }

        .save {
            background-color: white;
            color: #40c5f1;

            &:hover {
                background-color: rgb(209, 247, 255);
                cursor: pointer;
            }
        }
    }

    .bottom {
        width: 660px;
        background-color: white;
        min-height: 100px;
    }
    .cover {
        display: flex;
        border-top: 2px solid rgba(200, 226, 233, 0.65);
        .p_ {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 17px;
        }
        .select {
            margin-top: 5px;
            margin-left: 80px;
            ._p {
                font-size: 17px;
                margin-top: 5px;
                margin-bottom: 8px;
            }
        }
    }


}
</style>