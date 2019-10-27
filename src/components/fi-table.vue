<template>
  <div>
    <el-table
      v-scroll
      :data="listdata"
      :height="height"
      class="el_table tab_main"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      stripe
    >
      <!-- <el-table-column type="index" label='序号' :index="changeIndex" width="50">
      </el-table-column>-->
      <template v-for="colConfig in colConfigs">
        <slot v-if="colConfig.slot" :name="colConfig.slot" />
        <el-table-column v-bind="colConfig"></el-table-column>
      </template>
    </el-table>
    <!-- <el-table-column
        label="设备编号"
        prop="name">
      </el-table-column>
      <el-table-column
        label="设备名称"
        prop="shebei">
      </el-table-column>
      <el-table-column 
        label="设备位置"
        prop="born">
      </el-table-column>
      <el-table-column 
        label="所属园区"
        prop="born">
      </el-table-column>
      <el-table-column 
        label="信息状态"
        prop="status">
      </el-table-column>
      <div slot="append" style="text-align: center">
          加载更多
      </div>
    </el-table>-->
  </div>
</template>


<script>
export default {
  props: ["colConfigs", "listdata", "page", "pagesize", "height"],
  data() {
    return {
      list: [],
      loading: false,
      Heigth: "",
      path: ""
    };
  },
  watch: {
    // 使用监听的方式，监听数据的变化
    listdata(val) {
      if (val) {
        this.Heigth = 800;
      }
      this.loading = true;
      // const loading = this.$loading({
      //   lock: true,
      //   body:true,
      //   fullscreen:false,
      //   target:'.el_table',
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(255, 255, 255, 255.7)'
      // });
      if (val.length || val != this.list) {
        // eslint-disable-next-line no-console
        console.log("改变", val);
        setTimeout(() => {
          // loading.close();

          this.loading = false;
        }, 500);
        this.list = val;
      } else {
        this.list = [];
        this.loading = false;
      }
    }
  },
  methods: {
    changeIndex(index) {
      // eslint-disable-next-line no-console
      console.log(this.page, "他爸爸发巴萨撒多少啊但是啊", index);
      if (
        this.page === undefined ||
        this.page === 0 ||
        this.page === 1 ||
        this.page === ""
      ) {
        // eslint-disable-next-line no-console
        console.log("出来啊！");
        return index + 1;
      } else {
        // eslint-disable-next-line no-console
        console.log("你走的这里吗！");
        return this.page * this.pagesize - this.pagesize + index + 1;
      }
    },
    handleSelectionChange(val) {
      this.$emit("tableradio", val);
    },
    tableSortChange(sort) {
      this.$emit("selectShopName", sort);
      // eslint-disable-next-line no-console
      console.log(sort);
    }
  },
  created() {
    this.list = "";
    this.path = this.$route.path;
  },
  mounted() {
    console.log(this.dom, "dom");
    // eslint-disable-next-line no-console
    console.log(this.colConfigs);
    // eslint-disable-next-line no-console
    console.log(this.listdata);
  }
};
</script>
<style lang="scss" scoped>
.tab_main {
  margin: 0 auto;
}
</style>