import request from '@/api/request'

const xwgl = {
  getInfolist (params){
    return request.get('/list', {params})
  },
  getInfo (params){
    return request.get('/detail', {params})
  },
  getTypes (){
    return request.get('/newsTypeList')
  },
  addInfo(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/create', params,config)
  },
  updateInfo(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.put('/update', params, config)
  },
  deleteInfo(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post(`/delete?id=${params}`, config)
  },
  deleteBatch(params) {
    return request.post('/deleteBatch', params)
  },
  uploadFile(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/uploadFile', params,config)
  },
  getTrainingList(params) {
    return request.get('/training/list', {params})
  },
  getNoticeList(params) {
    return request.get('/sendNotice/list', {params})
  }
}
export default xwgl
