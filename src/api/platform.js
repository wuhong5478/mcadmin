import request from '@/api/request'
// import QS from 'qs'

const platform = {
  // 根据任务模糊查询
  getDeviceTrountName (params) {
    return request.get('/deviceRounting/getDeviceTrountName', { params })
  },
  // 根据ID物业
  PropertyById (params) {
    return request.post('/property/PropertyById', params)
  },
  // 根据机构ID 询查消控室
  selectFireRoomByDeptId (params) {
    return request.post('/miniFireStation/selectFireRoomByDeptId', params)
  },
  // 根据机构查询微型消防站
  selectByDeptId (params) {
    return request.post('/miniFireStation/selectByDeptId', params)
  },

  // 获取物业公司信息
  //    根据id查询园区信息

  ParkById (params) {
    return request.post('/property/ParkById', params)
  },

  // 获取物业公司信息
  queryPlatform2 (params) {
    return request.post('/property/PropertyById', params)
  },
  // 查询所有物业公司信息
  queryAllPlatform (params) {
    return request.post('/property/selectproperty', params)
  },
  // 查询物业 真
  getdeptlist1 (params) {
    return request.get('/sysdept/getdeptlist', { params })
  },

  // 人员查询带分页
  getuserinfolist (params) {
    return request.get('/sysuser/getuserinfolist', { params })
  },
  // 人员删除
  deleteUseInfo (params) {
    return request.delete(`/sysuser/deletesysuser/${params}`)
  },
  // 人员新增
  addUseInfo (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/sysuser/addsysuser', params, config)
  },
  // 人员编辑
  updatedUseInfo (params) {
    return request.put('/sysuser/updatesysuser', params)
  },
  // 根据物业信息查询
  queryMainManageList (
    params = { propertyId: 'EB1600B4445443C18843442FCDE564DE' }
  ) {
    return request.post('/maintenanceManage/selectByProperty', params)
  },
  // 根据维保ID查询维保信息
  selectById (params) {
    return request.post('/maintenanceManage/selectById', params)
  },
  // 修改物业基本信息
  changePlatformInfo (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return request.post('/property/updatePropertyById', params)
  },
  // 修改管辖园区
  changeParkOproperty (params) {
    return request.post('/property/updateParkOproperty', params)
  },
  // 获取消控室信息
  queryFireRoom (params) {
    return request.post('/property/FireRoomById', params)
  },
  // 获取微消站信息
  queryMiniFireStation (params) {
    return request.post('/property/MiniFireStationById', params)
  },
  // 设备隐患占比
  queryEquipmentTrouble (params) {
    return request.get('/taskWarning/device/ratio', params)
  },

  // 设备隐患数量
  queryTroubleNumber (params) {
    return request.get('/taskWarning/group/statistics', params)
  },

  deleteuserfireroomfirestation (params) {
    return request.delete(`/sysuser/deleteuserfireroomfirestation?${params}`)
  }
}
export default platform
