<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <template>
        <el-select
          class="area"
          @change="changeArea"
          v-model="areaValue"
          size="medium"
          placeholder="请选择园区"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.areaName"
            :value="item.areaName"
          ></el-option>
        </el-select>
      </template>
      <template>
        <el-select
          class="area"
          @change="changeOne"
          v-model="healthValue"
          size="medium"
          placeholder="请选择型号"
        >
          <el-option
            v-for="item in options10"
            :key="item.productName"
            :label="item.productName"
            :value="item.productName"
          ></el-option>
        </el-select>
      </template>
      <template>
        <el-select
          class="area"
          @change="changeTwo"
          v-model="statusValue"
          size="medium"
          placeholder="请选择设备类型"
        >
          <el-option
            v-for="item in options11"
            :key="item.categoryName"
            :label="item.categoryName"
            :value="item.categoryName"
          ></el-option>
        </el-select>
      </template>
      <el-input v-model="searchInputRoom" size="medium" class="searchInput" placeholder="请输入设备位置"></el-input>
      <el-button size="medium" @click="searchBtn" type="primary">查询</el-button>
    </div>
    <!-- 数据列表 -->
    <template>
      <el-table
        :header-cell-style="{background:'#FAFAFA'}"
        stripe
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="productName" label="设备型号"></el-table-column>
        <el-table-column prop="deviceName" label="所属编号"></el-table-column>
        <el-table-column prop="categoryName" label="设备类型"></el-table-column>
        <el-table-column prop="districtName" label="所属园区"></el-table-column>
        <el-table-column prop="address" label="设备位置"></el-table-column>
        <el-table-column prop label="通讯方式">
          <template v-slot="{row}">
            <span>{{row.netType || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="supplier" label="供应商"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="text-align: center">
        <el-pagination
          background
          layout="prev, pager, next,total"
          :total="total"
          :page-size="pagesize"
          :current-page.sync="currentPage"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  // 注册局部过滤器格式化时间
  filters: {
    dateFilter(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      options10: [{ productName: '全部型号', id: '1' }],
      options11: [{ categoryName: '全部类型', id: '1' }],
      searchInputRoom: '', // 筛选条件设备地址
      statusValue: '', // 筛选条件设备类型
      healthValue: '', // 筛选条件设备型号
      options: [], // 筛选条件园区选择
      areaValue: '', //
      tableData: '', // 数据列表
      pagesize: 10,
      currentPage: 1,
      total: 0,
      obj: {
        pageIndex: '',
        pageSize: '',
        productName: '',
        categoryName: '',
        districtName: '', // 园区名称
        address: '' // 设备地址
      }
    }
  },
  created() {
    this.getAllArea()
    this.getAllInfo()
    this.getAll()
    // this.dangerObj.maintenanceId = this.getCookie('dept_id')
    // this.dangerObj.institutionType = this.getCookie('dept_type')
    // if (this.dangerObj.institutionType === '1') {
    //   this.dangerObj.institutionType = '0'
    //   this.dangerObj.maintenanceId = ''
    // }
    // if (this.dangerObj.institutionType === '2') {
    //   this.dangerObj.institutionType = '2'
    // }
    // if (this.dangerObj.institutionType === '3') {
    //   this.dangerObj.institutionType = '1'
    // }
  },
  methods: {
    // 进入页面获取到用户的cookie
    getCookie(cookieName) {
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ')
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (cookieName == arr[0]) {
          return arr[1]
        }
      }
      return '无'
    },
    // 获取所有的园区
    async getAllArea() {
      const res = await this.$request.health.getAreaAll()
      // console.log(res)
      const obj = { areaName: '全部园区', areaId: '' }
      this.options.push(obj)
      res.data.forEach(v => {
        this.options.push(v)
      })
    },
    // 获取设备的型号和类型
    async getAll() {
      const res = await this.$request.health.getAll()
      // console.log(res)
      res.data.categoryName.forEach(v => {
        this.options11.push(v)
      })
      res.data.productName.forEach(v => {
        this.options10.push(v)
      })
    },
    //查询所有的设备信息
    async getAllInfo() {
      this.obj.pageIndex = this.currentPage
      this.obj.pageSize = this.pagesize
      const res = await this.$request.health.getAllInfo(this.obj)
      // console.log(res)
      this.tableData = res.list
      this.tableData.forEach(v => {
        // console.log(v.netType)
        if (v.netType === 0) {
          v.netType = 'lora'
        }
        if (v.netType === 1) {
          v.netType = 'GPRS'
        }
        if (v.netType === 2) {
          v.netType = 'NB_IOT'
        }
        if (v.netType === 3) {
          v.netType = 'WIFI'
        }
        if (v.netType === 4) {
          v.netType = 'ZIGBEE'
        }
        if (v.netType === 5) {
          v.netType = 'BT'
        }
        if (v.netType === 6) {
          v.netType = 'CELLULAR'
        }
        if (v.netType === 7) {
          v.netType = 'ET HERNET'
        }
      })
      this.total = res.total
    },
    // 根据园区进行筛选
    changeArea(value) {
      if (value === '全部园区') {
        value = ''
      }
      this.obj.districtName = value
      this.currentPage = '1'
      this.getAllInfo()
    },
    // 根据型号进行筛选
    changeOne(value) {
      // console.log(value)
      if (value === '全部型号') {
        value = ''
      }
      this.currentPage = '1'
      this.obj.productName = value
      this.getAllInfo()
    },
    // 根据类型进行筛选
    changeTwo(value) {
      // console.log(value)
      if (value === '全部类型') {
        value = ''
      }
      this.currentPage = '1'
      this.obj.categoryName = value
      this.getAllInfo()
    },
    // 根据设备位置进行筛选
    searchBtn() {
      this.currentPage = '1'
      this.obj.address = this.searchInputRoom
      this.getAllInfo()
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getAllInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 10px;
  .searchInput {
    width: 14%;
    margin-right: 10px;
  }
  .area {
    width: 16%;
    margin-right: 10px;
  }
}
/deep/.el-table th > .cell {
  text-align: left;
}
/deep/.el-table .cell {
  text-align: left;
  padding-left: 0px;
}
.searchSpan {
  color: #409eff;
  cursor: pointer;
}

.list {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  margin-top: 20px;
  margin-bottom: 10px;
}
.headerSpan {
  margin-left: 10px;
}
.searchInputDanger {
  width: 20%;
  margin: 0 10px;
}
</style>


