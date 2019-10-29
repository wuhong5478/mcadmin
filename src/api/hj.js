import request from '@/api/request'

const hj = {
  // 获取物业公司信息
  list (params) {
    return request.get('/fireWarn/list', { params })
  },
  // 新增二维码
  insertRountQrcode (params) {
    return request.post('/objectconfiguration/insertRountQrcode', params)
  }
}
export default hj
