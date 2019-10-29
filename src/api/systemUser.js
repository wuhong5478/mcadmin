import request from '@/api/request'

const systemUser = {
  // 查询系统用户
  demandUser (params) {
    return request.get('/sysuser/getuserinfolist', params)
  },
  // 删除用户信息
  deleteInfo (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.put(`/sysuser/deletesysuser/${params}`, config)
  },
  // 新增隐患信息
  addUserInfo (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.delete('/sysuser/addsysuser', params, config)
  },
  // 更新用户信息
  replaceUser (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.put('/sysuser/updatesysuser', params, config)
  },
  // 查询机构信息
  demandAgency (params) {
    return request.get('/sysdept/getdeptlist', params)
  },
  // 根据机构id进行筛选查询用户信息
  getUserName (params) {
    return request.get('/sysuser/getuserinfolist', params)
  },
  // 批量修改用户
  batchAdd (params) {
    return request.put('/sysuser/batchAdd', params)
  },
  // 查询系统用户带分页
  // /sysuser/getuserinfolist
  getuserinfolist (params) {
    return request.get('/sysuser/getuserinfolist', params)
  },
  // /sysuser/getuserinfolist查询系统用户带分页
  // 一键导出的接口
  exportForm (params) {
    return request.get('/sysuser/excleUser', params)
  }
}
export default systemUser
