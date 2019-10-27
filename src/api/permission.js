import request from '@/api/request'

const permission = {
  deleteInfo(params) {
    let config = {
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post(`/syspermission/deletepermission?id=${params}`, config)
  },
  addInfo(params) {
    return request.post('/syspermission/addpermission', params)
  },
  updateInfo(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/syspermission/updatepermission', {params}, config)
  },
  getInfolist (params){
    return request.get(`/syspermission/getpermissionlist?${params}`)
  },
}
export default permission
