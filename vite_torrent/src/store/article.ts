import { defineStore } from "pinia"
import { getArticle } from "@/api/article"
import { getUserdata } from "@/api/article"


interface State {
    articleData:any,
    userData:any
}

const useArticleStore=defineStore("monika",{
    state:():State=>{
        return {
            // 文章详情的数据
            articleData:{},
            userData:''
        }
    },
    actions:{
        // 获取文章详细数据
        async getArticleData(pageSize:number,currentPage:number){
            
            let results= await getArticle(pageSize,currentPage)
            this.articleData=results.data
            

            // 处理标签数据将其变成数组
            for(let item of results.data.data){
                
                if(item.label!=="" && item.label!==null){
                    
                    let label=JSON.parse(item.label)
                    /* console.log(label); */
                    item.label=label
                }else {
                    
                }

            } 
            /* console.log(this.articleData); */
            
            
        },
        async getUserFile(){
            await getUserdata().then((results)=>{
                /* console.log(results.data); */
                this.userData=results.data
            })
        }
    },
    getters:{

    }
})

export default useArticleStore