import request from '@/api/request'
import querystring from 'querystring'

const text = {
  // 新增通知配置方式

  addNotice (params) {
    return request.post('/notice/addNotice', params)
  },

  // 删除通知配置
  deleteNotice (params) {
    return request.delete(
      '/notice/deleteNotice?' + querystring.stringify({ id: params })
    )
  },
  // 修改通知配置
  updateNotice (params) {
    return request.put('/notice/updateNotice?' + querystring.stringify(params))
  },

  // 条件巡查通知配置
  selectNotice (params) {
    return request.get('/notice/selectNotice', { params })
  },
  // 查询所有机构
  getdeptlist (params) {
    return request.get('/sysdept/getdeptlist', { params })
  },
  // 根据机构id查询处理人
  getPeople (params) {
    return request.get('/user/list', { params })
  },
  // 根据机构Id查询园区列表
  getArea (params) {
    return request.get('/maintenanceManage/selectParkByDeptId', { params })
  },
  //  查询通知配置类别
  getTypeList (params) {
    return request.get('/notice/noticeTypeList', params)
  },
  // 根据用户id获取用户信息
  getUserName (params) {
    return request.get('/sysuser/getuserbyid', params)
  },
  // 根据机构id查询机构
  getDeptName (params) {
    return request.get('/sysdept/getdeptbyid', params)
  }
}
export default text
