import request from '@/api/request'

const role = {

  // 分页条件查询
  getPolePager(params){
    return request.get('/sysrole/getrolelist',params)
  },
  // 添加
  addRole(params){
    return request.post('/sysrole/addsysrole',params)
  },
  // 根据id获取权限
  getRoleById(params){
    return request.get('/sysrole/getrolebyid',params)
  },
  // 添加权限
  addRolePermission(params){
    return request.post('/sysrole/addrolepermission',params)
  },
  // 修改
  updateRole(params){
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/sysrole/updatesysrole',params,config)
  },
  deleteRole(params) {
    return request.post('/sysrole/delete', params)
  },

}

export default role;