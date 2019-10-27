<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <!-- 园区筛选 -->
      <template>
        <el-select
          class="area"
          @change="changeOne"
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
      <!-- 所属行业 -->
      <template>
        <el-select
          class="area"
          @change="changeTrade"
          v-model="tradeValue"
          size="medium"
          placeholder="请选择行业"
        >
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 建筑名称 -->
      <template>
        <!-- <el-select
          class="area"
          @change="changeBulid"
          v-model="bulidValue"
          size="medium"
          placeholder="请选择建筑名称"
        >
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.areaName"
            :value="item.areaName"
          ></el-option>
        </el-select>-->
        <el-input v-model="bulidValue" size="medium" class="area" placeholder="请输入建筑名称"></el-input>
        <el-button size="medium" @click="searchInfo" type="primary">查询</el-button>
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
        stripe
        :header-cell-style="{background:'#FAFAFA'}"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="industryId" :formatter="getHy1" label="所属行业"></el-table-column>
        <el-table-column prop="parkName" label="所属园区"></el-table-column>
        <el-table-column prop="architectureName" label="建筑名称"></el-table-column>
        <el-table-column prop="analysisType" label="生成类型" :formatter="getType"></el-table-column>
        <el-table-column label="操作">
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
    <!-- 新增行业隐患统计 -->
    <el-dialog title="新增行业隐患统计分析" :visible.sync="dialogVisible" width="45%">
      <el-form :model="addList">
        <el-form-item label="行业类型:">
          <template>
            <el-select
              v-model="addList.industryId"
              class="addArea"
              size="medium"
              placeholder="请选择行业类型"
            >
              <el-option
                v-for="item in addTradeOptions"
                :key="item.value"
                :label="item.typeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="针对建筑:">
          <template>
            <el-select
              v-model="addList.parkId "
              @change="changeArea"
              class="addArea"
              size="medium"
              placeholder="请选择园区"
            >
              <el-option
                v-for="item in addAreaOptions"
                :key="item.value"
                :label="item.areaName"
                :value="item.areaId"
              ></el-option>
            </el-select>
          </template>
          <template>
            <el-select
              v-model="addList.architectureId"
              class="addArea"
              size="medium"
              placeholder="请选择建筑"
            >
              <el-option
                v-for="item in addBulidOptions"
                :key="item.id"
                :label="item.architectureName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="生成类型:">
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
          <el-table-column prop="analysisType" :formatter="getHy1" label="行业"></el-table-column>
          <el-table-column prop="architectureName" label="建筑名称"></el-table-column>
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
      valueTime: '',
      checkList: [],
      dialogVisible: false,
      dialogVisible1: false,
      options: [], // 筛选条件园区选择
      areaValue: '', // 园区绑定
      options1: [
        {
          typeName: '所有行业类型',
          id: ''
        }
      ], // 行业筛选
      tradeValue: '', // 行业绑定
      options2: [], // 建筑筛选
      bulidValue: '', // 建筑绑定
      tableData: [],
      tableData1: [],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      pagesize1: 10,
      currentPage1: 1,
      total1: 0,
      addAreaOptions: [],
      addTradeOptions: [],
      addBulidOptions: [],
      obj: {
        pageSize: '',
        pageNo: '',
        analysisName: '行业隐患统计分析',
        archName: '',
        areaId: '',
        industryId: ''
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
      },
      addList: {
        parkId: '',
        architectureId: '',
        analysisType: '',
        industryId: '',
        modelName: +new Date(),
        analysisId: ''
      },
      msgTypeObj: {},
      id: ''
    }
  },
  created() {
    this.getAllArea()
    this.getModelList()
    this.getHy()
  },
  methods: {
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
    getHy1(row) {
      return this.msgTypeObj.get(row.industryId)
    },
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
    // 获取行业
    getHy() {
      const params = 'pageNo=-1&pageSize=1000'
      this.$request.dictionary
        .getInfolist(params + '&parentId=industry')
        .then(res => {
          // this.options1 = res.data.rows
          res.data.rows.forEach(v => {
            this.options1.push(v)
          })
          this.addTradeOptions = res.data.rows
          console.log(this.options1)
          this.msgTypeObj = this.$utils.getMap(this.options1, 'id', 'typeName')
        })
    },
    // 获取园区
    async getAllArea() {
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
    // 根据园区进行筛选
    changeOne(value) {
      console.log(value)
      this.obj.areaId = value
      this.getModelList()
    },
    // 根据行业进行筛选
    changeTrade(value) {
      console.log(value)
      this.obj.industryId = value
      this.getModelList()
    },
    // 实现新增功能
    async add() {
      const params = 'pageNo=-1&pageSize=1000'
      const res = await this.$request.dictionary.getInfolist(
        params + '&parentId=dangeranalysis'
      )
      res.data.rows.forEach(v => {
        if (v.typeName === '行业隐患统计分析') this.addList.analysisId = v.id
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
    searchInfo() {
      console.log(this.bulidValue)
      this.obj.archName = this.bulidValue
      this.getModelList()
    },

    // 切换园区获取建筑信息
    async changeArea(value) {
      const res = await this.$request.danger.getBulid({
        areaId: value
      })
      console.log(res)
      this.addBulidOptions = res.data
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
    // async deleteTwo(row) {
    //   console.log(row)
    //   console.log(this.lookObj)
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
  .area {
    width: 16%;
    margin-right: 10px;
  }
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

