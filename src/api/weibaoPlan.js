import request from '@/api/request'
import querystring from 'querystring'
const maintenance = {
  // 新增维保计划
  addPlan(params) {
    return request.post(
      '/maintenancerountingplan/insertMaintenanceRountingPlan?' +
        querystring.stringify(params)
    )
  },
  // 删除巡检计划
  deleteInfo(params) {
    return request.post(
      '/maintenancerountingplan/deleteMaintenanceRountingPlan',
      params
    )
  },
  // 根据新增对话框中的巡检类型实现单条件查询
  getAddType(params) {
    return request.get(
      '/deviceTrountQrcode/getDeviceTrountQrcodefootherOption',
      params
    )
  },
  // 根据新增对话框的巡检名称实现筛选功能
  getTypeName(params) {
    return request.get(
      '/deviceTrountQrcode/getDeviceTrountQrcodefoName',
      params
    )
  },
  // 根据巡检计划id获取巡查对象配置
  getPlanInfo(params) {
    return request.post(
      '/maintenancerountingplan/selectMaintenanceRountingPlan',
      params
    )
  },
  // 根据id修改巡检任务
  amendPlanInfo(params) {
    return request.post(
      '/maintenancerountingplan/updateMaintenanceRountingPlan',
      params
    )
  },
  //根据园区id查询园区回显
  getAreaName(params) {
    return request.post('/area/selectAreaById', params)
  },
  getReport(params) {
    return request.get(
      '/deviceReport/getDeviceReport?' + querystring.stringify(params)
    )
  }
}
export default maintenance
