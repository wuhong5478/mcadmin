import request from '@/api/request'
import querystring from 'querystring'

const fireinfo = {
  // 获取所有的火情分析
  getAllFireInfo(params) {
    return request.get('/fireWarn/list', { params })
  },
  // 获取火灾流水
  fireorder(params) {
    return request.get('/fireProcess/fireorder', { params })
  },
  // 一键处理
  dealFireFalse(params, id) {
    return request.post(
      '/fireProcess/dealFireFalse?' +
        querystring.stringify({ fireIds: params, userId: id })
    )
  },
  // 设备名字
  devNameList() {
    return request.get('/fireWarn/devNameList')
  },
  // ID查询单个火警
  findbyid(params) {
    return request.get('/fireWarn/findbyid', { params })
  },
  // 火灾报告统计
  fireReport(params) {
    return request.get('/fireWarn/fireReport', { params })
  }
}
export default fireinfo
