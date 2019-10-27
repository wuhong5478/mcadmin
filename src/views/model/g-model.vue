<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <template>
        <el-select
          class="area"
          @change="changeArea1"
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
      <!-- 建筑名称 -->
      <el-input v-model="bulidValue" size="medium" class="area" placeholder="请输入建筑名称"></el-input>
      <el-button size="medium" @click="searchInfo" type="primary">查询</el-button>
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
        <el-table-column prop="architectureName" label="建筑名称"></el-table-column>
        <el-table-column prop="parkName" label="所属园区"></el-table-column>
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
    <el-dialog title="新增历史隐患统计分析" :visible.sync="dialogVisible" width="45%">
      <el-form :model="addList">
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
      <template>
        <el-select
          class="area"
          @change="changeArea10"
          v-model="areaValue10"
          size="medium"
          placeholder="请选择园区"
        >
          <el-option
            v-for="item in options10"
            :key="item.id"
            :label="item.areaName"
            :value="item.areaId"
          ></el-option>
        </el-select>
      </template>
      <el-input v-model="bulidValue10" size="medium" class="area" placeholder="请输入建筑名称"></el-input>
      <el-button size="medium" @click="searchInfo10" type="primary">查询</el-button>
      <template>
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column prop="architectureName" label="建筑名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="analysisType" label="生成类型" :formatter="getType1"></el-table-column>
          <el-table-column prop label="操作">
            <template v-slot="{row}">
              <!-- <span class="delete" @click="deleteTwo(row)">删除/</span> -->
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
      bulidValue10: '',
      areaValue10: '',
      options10: [],
      areaValue: '',
      checkList: [],
      options: [], // 筛选条件园区选择
      bulidValue: '',
      tableData: [],
      tableData1: [],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      dialogVisible1: false,
      obj: {
        pageSize: '',
        pageNo: '',
        analysisName: '合规运行分析',
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
        page: ''
      },
      addList: {
        parkId: '',
        analysisId: '',
        analysisType: ''
      },
      addAreaOptions: [],
      addBulidOptions: []
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
    getType1(row) {
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
      this.options10.push(obj)
      res.data.forEach(v => {
        this.options.push(v)
      })
      res.data.forEach(v => {
        this.options10.push(v)
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
    changeArea1(value) {
      this.currentPage = '1'
      this.obj.areaId = value
      this.getModelList()
    },
    searchInfo() {
      this.currentPage = '1'
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
    // 实现新增功能
    async add() {
      const params = 'pageNo=-1&pageSize=1000'
      const res = await this.$request.dictionary.getInfolist(
        params + '&parentId=dangeranalysis'
      )
      res.data.rows.forEach(v => {
        if (v.typeName === '合规运行分析') this.addList.analysisId = v.id
      })
      console.log(this.addList.analysisId)
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
      this.tableData1 = []
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
    // async deleteTwo(row) {
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
    changeArea10(value) {
      this.lookObj.areaId = value
      this.getTwoList(this.lookObj)
    },
    searchInfo10() {
      this.lookObj.archId = this.bulidValue10
      this.getTwoList(this.lookObj)
    },
    // 分页的功能
    currentChange(currentPage) {
      this.currentPage = currentPage
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
.lookOver {
  cursor: pointer;
  color: #117ddd;
}
.delete {
  cursor: pointer;
  color: #909399;
}
.addArea {
  width: 28%;
  margin-right: 10px;
}
</style>

