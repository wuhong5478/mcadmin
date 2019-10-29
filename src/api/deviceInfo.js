import request from '@/api/request'
// 五设备信息接口请求

const deviceInfo = {
  // 查询
  queryDeviceInfo (params) {
    return request.get('/device/category/list', params)
  },
  // 查询设备详细列表信息
  queryListInfo (params) {
    return request.get('/device/list', { params })
  },
  // 查看详细信息
  queryItemInfo (params) {
    return request.get('/device/detail', { params })
  },

  // 查看 设备历史属性
  ItemInfo (params) {
    return request.get('/device/property/timeline', { params })
  },

  // 设备隐患占比
  queryEquipmentTrouble (params) {
    return request.get('/taskWarning/device/ratio', params)
  },

  // 每月设备隐患
  queryEveryTrouble (params) {
    return request.get('/taskWarning/countBySixMonths', params)
  },

  // 设备隐患数量
  queryTroubleNumber (params) {
    return request.get('/taskWarning/group/statistics', params)
  }

}

export default deviceInfo
