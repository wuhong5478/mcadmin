import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './plugins/element.js'
import './components/index' //全局引入组件
import registryPopup from './views/platform/common/popup_index'
import 'echarts'
import echarts from './plugins/echarts'
// import echartss from 'echarts'
import axios from 'axios'
import Api from './api/request'
import Directives from './directives' //自定义指令
import * as utils from './utils/index' //全局方法
// 接口模块
import request from './api/index'
import htmlToPdf from './api/htmlToPdf'
Vue.use(htmlToPdf)
Vue.config.productionTip = false
Vue.use(Directives)
Vue.use(registryPopup)
Vue.prototype.$api = Api
Vue.prototype.$axios = axios
Vue.prototype.$request = request
Vue.prototype.$utils = utils // 全局方法
// Vue.prototype.$echartss = echartss
var instance = axios.create({
  withCredentials: true,
  baseURL: '/api',
  timeout: 5000,
  headers: { 'Content-Type': 'multipart/form-data' }
})
Vue.prototype.instance = instance
// 新增隐患的请求方法
var addDanger = axios.create({
  withCredentials: true,
  baseURL: '/api',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})
Vue.prototype.addDanger = addDanger
// 一键导出表格的方法
var exportForm = axios.create({
  baseURL: '/api',
  timeout: 50000,
  responseType: 'blob',
  headers: { 'Content-Type': 'application/ms-excel' }
})
Vue.prototype.exportForm = exportForm
// 导出用户手册
var down = axios.create({
  baseURL: '/api',
  timeout: 100000,
  responseType: 'blob',
  headers: {
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
})
Vue.prototype.down = down
// 下载二维码压缩包的方法
var zip = axios.create({
  baseURL: '/api',
  timeout: 100000,
  responseType: 'blob',
  headers: {
    'Content-Type': 'application/json; application/octet-stream'
  }
})
Vue.prototype.zip = zip

Vue.use(echarts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
