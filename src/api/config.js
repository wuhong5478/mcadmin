import request from '@/api/request'
// 五设备信息接口请求

const config = {
  // 查询  
  queryDeviceInfo (params) {
    return request.get('/device/category/list',params)    
  },
 

}

export default config;