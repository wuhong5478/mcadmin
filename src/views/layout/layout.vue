<template>
  <el-container>
    <fi-menu></fi-menu>
    <el-container>
      <el-header height="130">
        <fi-header></fi-header>
      </el-header>
      <router-view class="main" v-loading="loading"></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  watch: {
    $route: function() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;

  .el-header {
    padding: 0;
    height: 130px;
    background: rgb(242, 242, 242);
    line-height: 60px;
  }
  .main {
    margin-top: 5px;
    padding: 0 20px;
    overflow: auto;
    font-size: 10pt;
  }
}
</style>