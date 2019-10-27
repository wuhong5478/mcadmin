import request from '@/api/request'
// import QS from 'qs'
import querystring from 'querystring'

const danger = {
  // 获取所有的隐患信息
  getDanger(params) {
    return request.get(
      '/taskwarn/gettaskwarnlist?' + querystring.stringify(params)
    )
  },
  // 新增隐患信息
  addDanger(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.post('/taskwarn/addtaskwarn', params, config)
  },
  // 删除隐患信息
  deleteDanger(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.delete(`/taskwarn/deletetaskwarn/${params}`, config)
  },
  // 更新隐患信息
  replaceDanger(params) {
    let config = {
      //添加请求头
      headers: { 'Content-Type': 'application/json' }
    }
    return request.put('/taskwarn/updatetaskwarn', params, config)
  },
  // 分派工单的方法
  assignWorder(params) {
    return request.post('/auto/updateAuto', params)
  },
  // 新增派单配置方法
  addOrder(params) {
    return request.post('/auto/insertAuto', params)
  },
  // 点击查看详情查看信息
  dangerDetail(params) {
    return request.get('/taskwarn/gettaskwarnbyid', params)
  },
  // 查询系统角色用在点击未派单对话框的下拉菜单
  getSystemName(params) {
    return request.get('/sysrole/getrolelist', params)
  },
  // 切换系统角色渲染所对应的的人员信息
  changeName(params) {
    return request.get('/sysuser/getuserbyid', params)
  },
  // 点击确认实现派单功能
  achieveOrder(params) {
    return request.put('/workorder/dispatchworkorder', params)
  },
  // 根据物业ID获取自动派单配置
  getDeploy(params) {
    return request.post('/auto/PropertyById', params)
  },
  // 统计各个隐患的数量
  getInfoNum(params) {
    return request.get('/taskwarn/warnstatistics', params)
  },
  // 查询所有自动派单配置
  getAllOrder(params) {
    return request.post('/auto/selectAutomaticDispatchConfiguration', params)
  },
  // 撤销工单的方法
  orderDelete(params) {
    return request.put('/workorder/revokeworkorder', params)
  },
  // 审核工单的方法
  examineworkorder(params) {
    return request.put('/workorder/examineworkorder', params)
  },
  // 完成工单的方法
  completeworkorder(params) {
    return request.put(
      '/workorder/completeworkorder?' + querystring.stringify(params)
      // '/workorder/examineworkorder',
      // params
    )
  },
  // 根据用户Id渲染对应的角色
  getrole(params) {
    return request.get('/sysuser/getuserbyid', params)
  },
  // 根据机构id获取园区
  getArea(params) {
    return request.get('/maintenanceManage/selectParkByDeptId', params)
  },
  //查询隐患统计分析模型
  getModelList(params) {
    return request.get(
      '/hiddendangeranalysismodel/getHiddenDangerAnalysisModellist',
      params
    )
  },
  // 根据园区获取建筑
  getBulid(params) {
    return request.post('/architecture/selectByAreaId', params)
  },
  // 删除隐患模型
  deleteModel(params) {
    return request.delete(`/hiddendangeranalysismodel/deletetaskwarn/${params}`)
  },
  // 新增隐患模型
  addModelInfo(params) {
    return request.post(
      '/hiddendangeranalysismodel/addHiddenDangerAnalysisModel',
      params
    )
  },
  // 获取隐患分析列表详情信息
  getAllInfo(params) {
    return request.get(
      '/hiddendangeranalysismodel/getTaskWarnAnalysisList',
      params
    )
  }
}

export default danger
