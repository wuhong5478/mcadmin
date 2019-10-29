import request from '@/api/request'

const permission = {
  deleteInfo (params) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post(`/syspermission/deletepermission?id=${params}`, config)
  },
  addInfo (params) {
    return request.post('/syspermission/addpermission', params)
  },
  updateInfo (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/syspermission/updatepermission', { params }, config)
  },
  getInfolist (params) {
    return request.get(`/syspermission/getpermissionlist?${params}`)
  }
}
export default permission
