import request from '@/api/request'
// 微型消防站管理接口请求

const equipment = {
  // 查询消防站物资信息
  queryMaterialInfo (params = { miniFireStationId: 1 }) {
    return request.post('/miniFireStation/selectMaterialByType', params)
  },
  // 新增修改微型消防站 /miniFireStation/addAndUpdateMiniFireStation
  addAndUpdateMiniFireStation (params) {
    return request.post('/miniFireStation/addAndUpdateMiniFireStation', params)
  },
  // 根据微消站ID删除微消站 /miniFireStation/deleteMiniFireStation
  removeMaterial (params) {
    return request.post('/miniFireStation/deleteMiniFireStation', params)
  },
  // 根据微消站ID 查询微消站信息
  queryMaterialID (params) {
    return request.post('/miniFireStation/selectId', params)
  },
  // 根据微消站ID 查询微消站人员信息
  queryMaterialUser (params) {
    return request.get('/sysuser/getuserinfolist', { params })
  },
  // 根据园区ID查询微消站列表
  queryFireStationList (params) {
    return request.post('/miniFireStation/selectByParkId', params)
  },
  // 根据消防站id巡查消防物资列表
  selectMaterialByType (params) {
    return request.post('/miniFireStation/selectMaterialByType', params)
  }
}
export default equipment
