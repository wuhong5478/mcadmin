import request from '@/api/request'
// 五设备信息接口请求

const yjwz = {
  // 修改或新增应急资源
  addEmergencySupplies (params) {
    return request.post('/resources/updateOrAddResources', params)
  },
  // 条件查询应急资源(分页)
  queryEmergencyInfo (params) {
    return request.post('/resources/selectByCriteria', params)
  },
  // 根据ID删除应急资源
  deleteEmergency (params) {
    return request.post('/resources/deleteById', params)
  },
  // 根据应急资源ID查询应急资源
  queryEmergencyID (params) {
    return request.post('/resources/selectById', params)
  }

}

export default yjwz
