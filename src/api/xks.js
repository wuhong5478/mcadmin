import request from '@/api/request'


const xks = {
  // 获取物业公司信息 
  queryPlatform (params) {
    return request.post('/property/PropertyById', params)
  },
  // 根据园区ID和消控室名称条件查询消控室信息
  selectByFireRoomName(params){
    return request.post('/fireRoom/selectByFireRoomName',params)
  },
  // 新增或修改消控室
  addAndUpdateFireRoom(params){
    return request.post('/fireRoom/addAndUpdateFireRoom',params)
  },
  // 根据园区ID查询消控室
  selectByParkId(params){
    return request.post('/fireRoom/selectByParkId',params)
  },
  // 根据消控室ID删除消控室
  deleteFireRoom(params){
    return request.post('/fireRoom/deleteFireRoom',params)
  },
  // 請求用戶
  getuserinfolist(params){
    return request.get('/sysuser/getuserinfolist',{params})
  },
  // 删除用户
  deletesysuser(params){
    return request.delete(`/sysuser/deletesysuser/${params}`)
  },
  // 查询用户
 getuserbyid(params){
   return request.get('/sysuser/getuserbyid',{
     params
   })
 },
//  更新系统信息
updatesysuser(params){
   return request.put('/sysuser/updatesysuser',params)
 },
// 添加系统信息
  addsysuser(params){
    return request.post('/sysuser/addsysuser',params)
  },
// 根据id巡查消控室信息
  selectById(params){
    return request.post('/fireRoom/selectById',params)
  },
  // 批量增加id
  batchAdd(params){
    return request.put('/sysuser/batchAdd',params)
  },
  // 删除消控室人员
  deleteuserfireroomfirestation(params){
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.delete('/sysuser/deleteuserfireroomfirestation',{params})
  }
}
export default xks;