import request from '@/api/request'
import querystring from 'querystring'
const bgcolor = {
  //查询系统用户界面皮肤
  getColor(params) {
    return request.post('/SysSkin/selectSysSkin', params)
  },
  // 切换用户界面皮肤颜色
  changeColor(params) {
    return request.post('/SysSkin/updateSysSkin', params)
  }
}
export default bgcolor
