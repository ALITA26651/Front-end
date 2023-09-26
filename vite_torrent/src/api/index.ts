// 首页模块接口
import axios from "../utils/axios"


export const reqAllTorrent=(currentPage:number,pageSize:number,classify?:string,keyword?:string)=>{
    if(!keyword){
        return axios.get(`http://127.0.0.1:9000/torrent?classify=${classify}&currentPage=${currentPage}&pageSize=${pageSize}`)
    }else{
        return axios.get(`http://127.0.0.1:9000/torrent?classify=${classify}&currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`)
    }

}