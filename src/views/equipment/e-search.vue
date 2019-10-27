<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <!-- 设备型号 -->
      <template>
        <el-select
          class="area"
          @change="changeOne"
          size="medium"
          v-model="value2"
          placeholder="请选择设备型号"
        >
          <el-option
            v-for="item in options10"
            :key="item.productName"
            :label="item.productName"
            :value="item.productName"
          ></el-option>
        </el-select>
      </template>
      <!-- 设备类型 -->
      <template>
        <el-select
          class="area"
          @change="changeTwo"
          size="medium"
          v-model="value3"
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
      <!-- 所属园区 -->
      <template>
        <el-select
          class="area"
          size="medium"
          @change="changeArea"
          v-model="value"
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
      <!-- 设备状态 -->
      <template>
        <el-select
          class="area"
          size="medium"
          @change="changeStatus"
          v-model="value1"
          placeholder="请选择设备状态"
        >
          <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </template>
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
        <el-table-column prop="deviceName" label="设备编号"></el-table-column>
        <el-table-column prop="categoryName" label="设备类型"></el-table-column>
        <el-table-column prop="districtName" label="所属园区"></el-table-column>
        <el-table-column prop="address" label="设备位置"></el-table-column>
        <el-table-column prop="status" label="设备状态"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <span @click="lookOver(row)" class="searchSpan">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- !-- 分页 -->
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
    <!-- 点击查看的对话框 -->
    <el-dialog title="设备运行状态" :visible.sync="dialogVisible" width="45%">
      <!-- <span>这是一段信息</span> -->
      <el-form v-show="!back">
        <el-form-item
          class="one"
          v-for="item in back"
          :key="item.fundId"
          :label="item.funName +':'"
        >{{item.fundId}}</el-form-item>
      </el-form>
      <p class="showTitle" v-show="back">暂无该设备运行状态</p>
    </el-dialog>
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
      dialogVisible: false,
      pagesize: 10,
      currentPage: 1,
      total: 0,
      value1: '', //设备状态双向绑定
      value2: '', //设备型号
      value3: '', //设备类型
      options1: [
        { label: '全部状态', id: '' },
        { label: '离线', id: '0' },
        { label: '在线', id: '1' },
        { label: '未激活', id: '3' }
      ], // 设备状态筛选条件
      value: '', // 园区双向绑定
      options: [], // 园区筛选条件
      obj: {
        pageIndex: '',
        pageSize: '',
        categoryName: '',
        productName: '',
        status: '', // 状态
        districtName: '' // 园区名称
      },
      tableData: [],
      // 回显设备信息所需数据
      backObj: {},
      back: []
    }
  },
  created() {
    this.getAll()
    this.getAllArea()
    this.getAllInfo()
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
    // 获取设备的型号和类型
    async getAll() {
      const res = await this.$request.health.getAll()
      console.log(res)
      // this.options11 = res.data.categoryName
      res.data.categoryName.forEach(v => {
        this.options11.push(v)
      })
      res.data.productName.forEach(v => {
        this.options10.push(v)
      })
      // this.options10 = res.data.productName
    },
    // 获取所有园区
    async getAllArea() {
      const res = await this.$request.health.getAreaAll()
      // console.log(res)
      const obj = { areaName: '全部园区', areaId: '' }
      this.options.push(obj)
      res.data.forEach(v => {
        this.options.push(v)
      })
    },
    //查询所有的设备信息
    async getAllInfo() {
      this.obj.pageIndex = this.currentPage
      this.obj.pageSize = this.pagesize
      const res = await this.$request.health.getAllInfo(this.obj)
      console.log(res)
      this.tableData = res.list
      this.tableData.forEach(v => {
        if (v.status === 0) {
          v.status = '离线'
        }
        if (v.status === 1) {
          v.status = '在线'
        }
        if (v.status === 3) {
          v.status = '未激活'
        }
      })
      this.total = res.total
    },
    // 根据园区进行筛选
    changeArea(value) {
      this.currentPage = '1'
      if (value === '全部园区') {
        value = ''
      }
      this.obj.districtName = value
      this.getAllInfo()
    },
    // 根据状态进行筛选
    changeStatus(value) {
      this.currentPage = '1'
      this.obj.status = value
      this.getAllInfo()
    },
    // 根据型号进行筛选
    changeOne(value) {
      console.log(value)
      if (value === '全部型号') {
        value = ''
      }
      this.currentPage = '1'
      this.obj.productName = value
      this.getAllInfo()
    },
    // 根据类型进行筛选
    changeTwo(value) {
      console.log(value)
      if (value === '全部类型') {
        value = ''
      }
      this.currentPage = '1'
      this.obj.categoryName = value
      this.getAllInfo()
    },
    // 点击查看弹出对话框进行信息回显
    async lookOver(row) {
      this.back = []
      console.log(row)
      this.dialogVisible = true
      const res = await this.$request.health.getAttributeInfo({
        // name: row.deviceName
        name: row.deviceName
      })
      // console.log(res.data.property)
      // console.log({} === true)
      this.back = res.data.property
      console.log(this.back)
      // res.data.property.forEach(v => {
      //   console.log(v)
      // })
    },
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
  .area {
    width: 16%;
    margin-right: 10px;
  }
}
.searchSpan {
  color: #409eff;
  cursor: pointer;
}
.one {
  width: 50%;
  float: left;
}
.el-form {
  overflow: hidden;
  border-top: 1px solid #e6e6e6;
}
.showTitle {
  border-top: 1px solid #e6e6e6;
  text-align: center;
  padding-top: 20px;
}
</style>

