import request from '@/api/request'

const fire = {
  // 获取物业公司信息
  fireAnalylist (params) {
    return request.get('/fireAdmin/fireAnalylist', params)
  }
}
export default fire
