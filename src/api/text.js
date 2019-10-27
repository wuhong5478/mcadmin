import request from '@/api/request'


const text = {
  // 获取物业公司信息 
  queryPlatform (params) {
    return request.post('/property/PropertyById', params)
  },
  getPicture(params){
    return request.get('/getPicture', params)
  }
}
export default text;