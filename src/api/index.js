// api模块接口
// import deviceInfo from '@/api/deviceInfo'
// import platform from '@/api/platform'

// export default {
//   deviceInfo,
//   platform
// }
const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js' || key === './request.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
export default modules
