import request from '@/api/request'

const garden = {
  // 是否篡改
  deviceTroudEquals (params) {
    return request.post('/deviceAsyncProcess/deviceTroudEquals', params)
  },
  // 区块链上链
  deviceTroudGet (params) {
    return request.post('/deviceAsyncProcess/deviceTroudGet', params)
  },
  // 根据任务名称搜索
  getDeviceTrountState (params) {
    return request.get('/deviceRounting/getDeviceTrountState', { params })
  },
  // 今日完成任务统计
  tadayFinishTask (params) {
    return request.get('/deviceRounting/tadayFinishTask', { params })
  },
  // 今日任务统计
  todayTask (params) {
    return request.get('/deviceRounting/todayTask', { params })
  },
  // 巡检人员数量
  personNumber (params) {
    return request.get('/deviceRounting/peopleSum', { params })
  },
  // 超时任务统计
  outingTask (params) {
    return request.get('/deviceRounting/overTimeTask', { params })
  },
  // 查询巡检分页
  queryDeviceRoutingfoList (params) {
    return request.get('/deviceRounting/getDeviceRoutingfoList', { params })
  },
  // 条件查询
  getDeviceRoutingfoList (params) {
    return request.get('/deviceRounting/getDeviceRoutingfoList', { params })
  },
  // 条件查询 根据巡检任务名称模糊搜索
  // queryTask(params) {
  //     return request.get('/deviceRounting/getDeviceTrountState', { params })
  // },
  /// 根据巡检ID获取信息
  queryTaskId (params) {
    return request.post('/deviceRounting/deleteDeviceRounting', params)
  },
  /// 新增巡检任务
  addTask (params) {
    return request.post('/taskrecord/insertDeviceRounting', params)
  },
  // 查看任务
  DeviceRountingForQcode (params) {
    return request.post('/deviceRounting/DeviceRountingForQcode', params)
  }
}
export default garden
