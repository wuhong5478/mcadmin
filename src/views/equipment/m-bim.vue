<template>
  <div class="box">
    <iframe
      style
      frameborder="0"
      scrolling="no"
      ref="iframe"
      id="mobsf"
      src="http://121.40.88.73/yunqi/index.html"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifr: ''
    }
  },
  mounted() {
    this.ifr = this.$refs.iframe
    // this.getHeigth()
    var that = this
    function changeMobsfIframe() {
      // const mobsf = document.getElementById('mobsf')
      debugger
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      that.ifr.style.width = Number(deviceWidth) - 120 + 'px' //数字是页面布局宽度差值
      that.ifr.style.height = Number(deviceHeight) - 80 + 'px' //数字是页面布局高度差
    }
    changeMobsfIframe()
    window.onresize = function() {
      changeMobsfIframe()
    }
  },
  methods: {
    // getHeigth() {
    //   //根据ID获取iframe对象
    //   // debugger
    //   var that = this
    //   this.ifr.onload = function() {
    //     //解决打开高度太高的页面后再打开高度较小页面滚动条不收缩
    //     console.log(that.ifr)
    //     // debugger
    //     that.ifr.style.height = '0px'
    //     var iDoc = that.ifr.contentDocument || that.ifr.document
    //     var height = that.calcPageHeight(iDoc)
    //     if (height < 850) {
    //       height = 850
    //     }
    //     that.ifr.style.height = height + 'px'
    //   }
    // },
    // // 计算页面的实际高度，iframe自适应会用到
    // calcPageHeight(doc) {
    //   var cHeight = Math.max(
    //     doc.body.clientHeight,
    //     doc.documentElement.clientHeight
    //   )
    //   var sHeight = Math.max(
    //     doc.body.scrollHeight,
    //     doc.documentElement.scrollHeight
    //   )
    //   var height = Math.max(cHeight, sHeight)
    //   return height
    // }
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  // iframe {
  //   width: 100%;
  //   height: 500px;
  // }
}
</style>
