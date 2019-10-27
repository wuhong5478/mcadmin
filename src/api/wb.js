import request from '@/api/request'
import querystring from 'querystring'

const text = {
  // 维保超时任务统计
  overTimeTask(params) {
    return request.get('/maintenanceRounting/overTimeTask', { params })
  },
  // 维保巡检人员统计
  peopleSum(params) {
    return request.get('/maintenanceRounting/peopleSum', { params })
  },
  // 维保今日完成任务统计
  tadayFinishTask(params) {
    return request.get('/maintenanceRounting/tadayFinishTask', { params })
  },
  // 维保今日任务统计
  todayTask(params) {
    return request.get('/maintenanceRounting/todayTask', { params })
  },
  // 维保人员分页
  getMaintenanceRoutingState(params) {
    return request.get('/maintenanceRounting/getMaintenanceRoutingState', {
      params
    })
  },
  // 根据对象名查询维保任务
  getMaintenanceRoutingName(params) {
    return request.get('/maintenanceRounting/getMaintenanceRoutingName', {
      params
    })
  },
  // 根据维保任务ID巡查维保对象
  MaintenanceRoutingForQcode(params) {
    return request.post(
      '/maintenanceRounting/MaintenanceRoutingForQcode',
      params
    )
  },
  // 查询维保人员
  getMaintenanceTrountQrcodefoList(params) {
    return request.get(
      '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefoList',
      { params }
    )
  },
  // 对象名称查询
  getMaintenanceTrountQrcodefoName(params) {
    return request.get(
      '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefoName',
      { params }
    )
  },
  // 对象地址查询
  getMaintenanceTrountQrcodefoinstallAddress(params) {
    return request.get(
      '/maintenanceTrountQrcode/getMaintenanceTrountQrcodefoinstallAddress',
      { params }
    )
  },
  // 新增二维码对象
  insertMaintenanceTrountQrcode(params) {
    return request.post(
      '/maintenanceTrountQrcode/insertMaintenanceTrountQrcode',
      params
    )
  },
  // 根据ID删除维保对象
  deleteMaintenanceById(params) {
    return request.post(
      '/maintenanceTrountQrcode/deleteMaintenanceById',
      params
    )
  },
  // 新增维保二维码

  insertMaintenanceTrountQrcode(params) {
    return request.post(
      '/maintenanceTrountQrcode/insertMaintenanceTrountQrcode',
      params
    )
  },
  // 修改二维码
  updateMaintenanceTrountQrcodeById(params) {
    return request.post(
      '/maintenanceTrountQrcode/updateMaintenanceTrountQrcodeById',
      params
    )
  },
  // 根据任务名
  // 根据维保ID下载二维码
  DownloadQcodeUrl(params) {
    return request.post(
      '/maintenanceTrountQrcode/DownloadQcodeUrl?Id' +
        querystring.stringify(params)
    )
  },
  // 根据维保状态巡查维保对象
  getDByIdOrStatus(params) {
    return request.post('/maintenanceRounting/getDByIdOrStatus', params)
  }
}
export default text
