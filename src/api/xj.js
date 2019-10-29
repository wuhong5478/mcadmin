import request from '@/api/request'
import querystring from 'querystring'

const xj = {
  // 巡查分页
  getDeviceTrountQrcodefoList (params) {
    return request.get('/deviceTrountQrcode/getDeviceTrountQrcodefoList', { params })
  },
  //  根据id删除二维码
  deleteDeviceTrountQrcodeById (params) {
    return request.post('/deviceTrountQrcode/deleteDeviceTrountQrcodeById', params)
  },
  // 新增对象二维码
  insertDeviceTrountQrcode (params) {
    return request.post('/deviceTrountQrcode/insertDeviceTrountQrcode', params)
  },
  // 更新二维码
  updateDeviceTrountQrcodeById (params) {
    return request.post('/deviceTrountQrcode/updateDeviceTrountQrcodeById', params)
  },
  // 根据对象名查询
  getDeviceTrountQrcodefoName (params) {
    return request.get('/deviceTrountQrcode/getDeviceTrountQrcodefoName', { params })
  },
  // 查询对象地址
  getDeviceTrountQrcodefoinstallAddress (params) {
    return request.get('/deviceTrountQrcode/getDeviceTrountQrcodefoinstallAddress', { params })
  },
  // 下载二维码
  // DownloadQcodeUrl(params){
  //   return request.post('/deviceTrountQrcode/DownloadQcodeUrl?'+ querystring.stringify({Id: params}))
  // },
  DownloadQcodeUrl (params) {
    return request.post('/deviceTrountQrcode/DownloadQcodeUrl?' + querystring.stringify({ Id: params }))
  }

}
export default xj
