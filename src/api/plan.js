import request from '@/api/request'
import querystring from 'querystring'
const plan = {
  addPlan(params) {
    return request.post(
      '/devicerountingplan/insertDeviceRountingPlan?' +
        querystring.stringify(params)
    )
  },
  // 删除巡检计划
  deleteInfo(params) {
    return request.post('/devicerountingplan/deleteDeviceRountingPlan', params)
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
    return request.get('/devicerountingplan/selectRountingPlan', params)
  },
  // 根据id修改巡检任务
  amendPlanInfo(params) {
    return request.post('/devicerountingplan/updateDeviceRountingPlan', params)
  }
}
export default plan
