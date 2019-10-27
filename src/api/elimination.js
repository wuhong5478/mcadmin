import request from '@/api/request'
import QS from 'qs'


const fireRoom = {
  // 根据园区ID和消控室名称条件查询消控室信息
  queryfireRoom (params) {
    return request.post('/fireRoom/selectByFireRoomName', QS.stringify(params))
  },
  queryfireRRoom (params) {
    return request.post('/property/FireRoomById', QS.stringify(params))
  },
  // 根据消控室ID查询消控室信息
  changefireRoomInfo (params) {
    return request.post('/fireRoom/selectById', QS.stringify(params))    
  },

  // 根据园区ID查询消控室列表  
  queryfireRoomList (params) {        
    return request.post('/fireRoom/selectByParkId', QS.stringify(params))
  } 

}
export default fireRoom;