import Vue from 'vue'
import Element from 'element-ui'
import ElTreeSelect from 'el-tree-select'
import 'element-ui/lib/theme-chalk/index.css'
// zujian
// Vue.prototype.$element = Element
Vue.prototype.$confirm = Element.MessageBox.confirm
Vue.prototype.$message = Element.Message

Vue.use(Element)
Vue.use(ElTreeSelect)
