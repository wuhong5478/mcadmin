<template>
  <div class="box">
    <!-- <iframe src="http://cloudfire.citylink.hzcloudtown.com/screen/" frameborder="0"></iframe> -->
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    window.moveTo(0, 0)
    window.resizeTo(screen.availWidth, screen.availHeight)
  },
  methods: {}
}
</script>
<style lang="less" scoped>
</style>