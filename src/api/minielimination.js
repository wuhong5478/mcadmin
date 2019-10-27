import request from '@/api/request'


const minielimination = {
  // 获取微消防站信息
  queryminiPlatform (params) {
    return request.post('/miniFireStation/selectId', params)
  }
}
export default minielimination;