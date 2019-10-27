import request from '@/api/request'
import querystring from 'querystring'

// import QS from 'qs'

const health = {
  // 查询所有园区
  getAreaAll(params) {
    return request.get('/area/regions?', params)
  },
  // 查询所有的设备信息
  getAllInfo(params) {
    return request.get('/device/list?' + querystring.stringify(params))
  },
  // 查询设备属性
  getAttributeInfo(params) {
    return request.get('/device/detail?' + querystring.stringify(params))
  },
  // 查询设备类型和型号
  getAll(params) {
    return request.get('/device/findByProCateName', params)
  },
  // 下载用户手册
  downLoad(params) {
    return request.post('/SysSkin/downloadFile', params)
  },
  // 查询告警信息列表
  getInfoList(params) {
    return request.post(
      '/warn/selectWarnInfoList?' + querystring.stringify(params)
    )
  },
  // 查询火警流水
  getFireInfo(params) {
    return request.get(
      '/fireProcess/fireorder?' + querystring.stringify(params)
    )
  },
  // 根据隐患id获取到隐患信息
  getDangerInfo(params) {
    return request.get(
      '/taskwarn/gettaskwarnbyid?' + querystring.stringify(params)
    )
  },
  // 根据id查看工单信息的方法
  getOrderInfo(params) {
    return request.get(
      '/workorder/getworkoderbyid?' + querystring.stringify(params)
    )
  },
  // 查询工单流水
  getWaterInfo(params) {
    return request.get(
      '/workordertrack/gettaskwarnlist?' + querystring.stringify(params)
    )
  },
  // 根据设备信息查询隐患列表
  getDangerAllLIst(params) {
    return request.post(
      '/warn/selectTaskInfoListByDevice?' + querystring.stringify(params)
    )
  }
}

export default health
