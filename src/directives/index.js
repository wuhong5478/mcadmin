import Vue from 'vue'
// 监听滚动事件
export default () => {
  Vue.directive('scroll', {
    bind (el, binding) {
      // 获取滚动页面DOM
      let SCROLL_DOM = el.querySelector('.el-table__body-wrapper')
      SCROLL_DOM.addEventListener('scroll', function () {
        console.log('scrll')
      })
    }
  })
}