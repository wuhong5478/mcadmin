import request from '@/api/request'
// import QS from 'qs'

const map = {
  // 获取到所有的区域名称
  getAllArea(params) {
    return request.post('/architecture/selectAllArea', params)
  },
  // 根据去用户名称获取到建筑信息
  getBulid(params) {
    return request.post('/architecture/selectByAreaId', params)
  },
  // 上传图片
  upMap(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return request.post('/Drawing/insertAndUpdateDrawing', params, config)
  },
  // 根据园区id查询图纸信息
  inquireMap(params) {
    return request.post('/Drawing/selectDrawingByParkId', params)
  },
  // 删除图纸
  deleteMap(params) {
    return request.post('/Drawing/deleteDrawing', params)
  },
  // 根据物业id查询相关的园区信息
  areaInfo(params) {
    return request.post('/property/ParkById', params)
  },
  // 修改图纸的方法
  amendMap(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return request.post('/insertAndUpdateDrawing', params, config)
  },
  // 根据园区id和图纸名称模糊查询
  FuzzyQuery(params) {
    return request.post('/Drawing/selectByCriteria', params)
  },
  // 下载图片文件
  downloadMap(params) {
    return request.get('/getPicture', params)
  },
  // 根据园区id查询园区名称
  getAreaName(params) {
    return request.post('/area/selectAreaById', params)
  },
  // 根据建筑id查询建筑名称
  getBulidName(params) {
    return request.post('/architecture/selectById', params)
  }
}

export default map
