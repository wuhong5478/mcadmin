import request from '@/api/request'
// 五设备信息接口请求

const build = {
  // 查询
  queryDeviceInfo (params) {
    return request.get('/device/category/list', params)
  },
  // 分页条件查询建筑信息
  selectArchitectureByCriteria (params) {
    return request.post('/architecture/selectArchitectureByCriteria', params)
  },
  // 添加建筑
  addAndUpdateArchitecture (params) {
    return request.post('/architecture/addAndUpdateArchitecture', params)
  },
  // 删除建筑
  deleteArchitecture (params) {
    return request.post('/architecture/deleteArchitecture', params)
  }

}

export default build
