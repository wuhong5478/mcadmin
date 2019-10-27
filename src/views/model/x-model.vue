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
            :value="item.areaId"
          ></el-option>
        </el-select>
      </template>
      <!-- 新增 -->
      <el-button
        style="float: right;"
        @click="dialogVisible = true"
        type="primary"
        size="medium"
      >+新增</el-button>
    </div>
    <!-- 数据列表 -->
    <template>
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{background:'#FAFAFA'}"
        style="width: 100%"
      >
        <el-table-column prop="parkName" label="园区名称"></el-table-column>
        <el-table-column prop="analysisType" label="生成类型" :formatter="getType"></el-table-column>
        <el-table-column prop label="操作">
          <template v-slot="{row}">
            <span @click="deleteModel(row)" class="delete">删除/</span>
            <span @click="lookInfo(row)" class="lookOver">查看</span>
          </template>
        </el-table-column>
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
    <!-- 新增对话框 -->
    <el-dialog title="新增小镇区域隐患统计分析" :visible.sync="dialogVisible" width="45%">
      <el-form :model="addList">
        <el-form-item label="所属园区:">
          <template>
            <el-select v-model="addList.parkId" class="addArea" size="medium" placeholder="请选择园区">
              <el-option
                v-for="item in addAreaOptions"
                :key="item.value"
                :label="item.areaName"
                :value="item.areaId"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="生成类型">
          <template>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="1">月度</el-checkbox>
              <el-checkbox label="2">季度</el-checkbox>
              <el-checkbox label="3">年度</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1" width="70%">
      <!-- <span>这是一段信息</span> -->
      <el-form>
        <el-form-item label="生成时间:">
          <el-form-item>
            <el-date-picker
              size="medium"
              style="width:28%;"
              value-format="yyyy-MM-dd"
              v-model="value1"
              type="daterange"
              @change="changhTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="quaTime" label="统计时间"></el-table-column>
          <el-table-column prop label="生成时间">
            <template v-slot="{row}">
              <span>{{row.createTime | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="操作">
            <template v-slot="{row}">
              <!-- <span @click="deleteTwo(row)" class="delete">删除/</span> -->
              <span class="lookOver">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
      value1: '',
      areaValue: '',
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [],
      tableData1: [],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      options: [], // 筛选条件园区选择
      addAreaOptions: [],
      addAreaValue: '',
      checkList: [],
      obj: {
        pageSize: '',
        pageNo: '',
        analysisName: '小镇区域隐患统计分析',
        archName: '',
        areaId: '',
        industryId: ''
      },
      addList: {
        parkId: '',
        analysisType: '',
        analysisId: ''
      },
      lookObj: {
        analysisId: '',
        analysisType: '',
        areaId: '',
        archId: '',
        limit: '',
        page: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  created() {
    this.getAllArea()
    this.getModelList()
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
    getType(row) {
      if (row.analysisType) {
        let arr = row.analysisType.split(',')
        let str = ''
        arr.forEach(v => {
          if (v === '1') {
            v = '月度'
          }
          if (v === '2') {
            v = '季度'
          }
          if (v === '3') {
            v = '年度'
          }
          str += v + ','
        })
        str = str.slice(0, str.length - 1)
        return str
      }
    },
    // 获取园区
    async getAllArea() {
      const params = 'pageNo=-1&pageSize=1000'
      let dept = this.getCookie('dept_id')
      const res = await this.$request.danger.getArea({
        params: {
          deptId: dept
        }
      })
      this.addAreaOptions = res.data
      const obj = { areaName: '全部园区', areaId: '' }
      this.options.push(obj)
      res.data.forEach(v => {
        this.options.push(v)
      })
    },
    // 获取隐患统计模型
    async getModelList() {
      this.obj.pageNo = this.currentPage
      this.obj.pageSize = this.pagesize
      const res = await this.$request.danger.getModelList({
        params: this.obj
      })
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.totalCount
    },
    changeArea(value) {
      this.obj.areaId = value
      this.currentPage = '1'
      this.getModelList()
    },
    // 实现新增功能
    async add() {
      const params = 'pageNo=-1&pageSize=1000'
      const res = await this.$request.dictionary.getInfolist(
        params + '&parentId=dangeranalysis'
      )
      res.data.rows.forEach(v => {
        if (v.typeName === '小镇区域隐患统计分析')
          this.addList.analysisId = v.id
      })
      this.addList.analysisType = this.checkList.join(',')
      console.log(this.addList)
      await this.$request.danger.addModelInfo(this.addList)
      this.$message({
        type: 'success',
        message: '新增成功',
        duration: 1500
      })
      this.getModelList()
      this.addList = {}
      this.checkList = []
      this.dialogVisible = false
    },
    // 删除隐患模型
    async deleteModel(row) {
      console.log(row)
      try {
        await this.$confirm('你确定要删除该隐患分析模型信息吗？', '温馨提示', {
          type: 'warning'
        })
        await this.$request.danger.deleteModel(row.id)
        this.getModelList()
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 1000
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        })
      }
    },
    async lookInfo(row) {
      console.log(row)
      this.dialogVisible1 = true
      this.lookObj.analysisId = row.analysisId
      this.lookObj.analysisType = row.analysisType
      this.lookObj.areaId = row.parkId
      this.lookObj.archId = row.architectureId
      this.getTwoList(this.lookObj)
    },
    async getTwoList(obj) {
      const res = await this.$request.danger.getAllInfo({
        params: obj
      })
      console.log(res)
      this.tableData1 = res.data
    },
    changhTime(value) {
      this.lookObj.startTime = value[0]
      this.lookObj.endTime = value[1]
      this.getTwoList(this.lookObj)
    },
    // async deleteTwo(row) {
    //   console.log(row)
    //   try {
    //     await this.$confirm('你确定要删除该隐患分析模型信息吗？', '温馨提示', {
    //       type: 'warning'
    //     })
    //     await this.$request.danger.deleteModel(row.id)
    //     this.getTwoList(this.lookObj)
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功',
    //       duration: 1000
    //     })
    //   } catch (e) {
    //     this.$message({
    //       type: 'info',
    //       message: '取消删除',
    //       duration: 1000
    //     })
    //   }
    // },
    // 分页的功能
    currentChange(currentPage) {
      this.currentPage = currentPage
      this.getModelList()
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 10px;
}
.addArea {
  width: 28%;
  margin-right: 10px;
}
.lookOver {
  cursor: pointer;
  color: #117ddd;
}
.delete {
  cursor: pointer;
  color: #909399;
}
</style>

