import request from '@/api/request'
// import QS from 'qs'
import querystring from 'querystring'

const acScore = {
  // 获取所有的隐患信息
  getList(params) {
    return request.get(
      '/ruleScore/list?' + querystring.stringify(params)
    )
  },

}

export default acScore
