import request from '@/api/request'

const dictionary = {
  deleteInfo (params) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    return request.delete(`/sysDictionary/deletesysdictionary/${params}`, config)
  },
  addInfo (params) {
    return request.post('/sysDictionary/addsysdictionary', params)
  },
  updateInfo (params) {
    const config = {
      // 添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.put('/sysDictionary/updatesysdictionary', params, config)
  },
  getInfolist (params) {
    return request.get(`/sysDictionary/getsysdictionarylist?${params}`)
  }
}
export default dictionary
