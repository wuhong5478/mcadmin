import axios from 'axios'
import QS from 'qs'

import { Message, Loading } from 'element-ui'
const URLLIST = ['/sysuser/addsysuser']
let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
// 创建axios实例 // 请求超时时间
var instance = axios.create({
    timeout: 1000 * 12,
    withCredentials: true,
    baseURL: '/api',
    
})

// 环境的切换
// instance.defaults.baseURL = utils.API

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//   'multipart/form-data application/json' m,  application/json application/x-www-form-urlencoded
instance.defaults.responseType = 'application/json'

// instance.defaults.responseType = 'arraybuffer'
// 请求拦截器
instance.interceptors.request.use(
        config => {
            showFullScreenLoading()
                // 拦截每个请求添加参数
            if (config.method == 'post') {
                config.data = {
                    ...config.data,
                    // propertyId: '2',
                }
            } else if (config.method == 'get') {
                config.params = {
                    ...config.params
                }
            }
            (config.method === "post" && !URLLIST.includes(config.url)) ? config.data = QS.stringify(config.data): ''
                // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
                // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
                // const token = store.state.token; 
                // token && (config.headers.Authorization = token); 
            return config;
        },
        error => {
            console.log(error)
            return Promise.error(error);
        })
    // 响应拦截器
instance.interceptors.response.use(
    // 请求成功 200
    // res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
    res => {
        if (res.status === 200) {
            tryHideFullScreenLoading()
            return Promise.resolve(res.data)
        } else {
            tryHideFullScreenLoading()
            return Promise.reject(res.data)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    break
                case 403:
                    break
                    // 404请求不存在
                case 404:
                    break
                    // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.message,
                        type: 'error',
                        duration: 5 * 1000
                    })
            }
            tryHideFullScreenLoading()
            return Promise.reject(error.response)
        }
    }
)
export default instance