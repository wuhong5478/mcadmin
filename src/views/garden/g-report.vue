<template>
  <div class="box">
    <!-- 头部筛选框 -->
    <div class="box-header">
      <!-- 报告性质选择 -->
      <template>
        <el-select
          @change="changeStatus"
          v-model="inputStatus"
          class="area"
          size="medium"
          placeholder="请选择报告性质"
        >
          <el-option label="全部性质" value="0"></el-option>
          <el-option label="周" value="1"></el-option>
          <el-option label="月" value="2"></el-option>
          <el-option label="季度" value="3"></el-option>
          <el-option label="年" value="4"></el-option>
        </el-select>
      </template>
      <!-- 生成时间选择 -->
      <template>
        <el-date-picker
          v-model="valueTime"
          class="searchInputTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          size="medium"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </template>
      <el-input v-model="searchInputName" size="medium" class="area" placeholder="请输入单位名称"></el-input>
      <el-button size="medium" @click="searchInfo" type="primary">查询</el-button>
    </div>
    <!-- 数据列表 -->
    <template>
      <el-table
        :header-cell-style="{background:'#FAFAFA'}"
        stripe
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="parkName" label="单位名称"></el-table-column>
        <el-table-column prop="status" label="报告性质"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="createTime" label="生成时间"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <span @click="exportTable(row)" class="searchSpan">导出</span>
            <span class="searchSpan">/</span>
            <span @click="lookOver(row)" class="searchSpan">查看</span>
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
    <!-- 查看详情的对话框 -->
    <el-dialog title="巡检报告" :visible.sync="dialogVisible" width="60%">
      <h2 class="title">云栖小镇{{area}}巡检报告</h2>
      <ul>
        <li>巡检报告:</li>
        <li>巡检报告公司:</li>
        <li>报告内容:</li>
      </ul>
      <div id="myCharts" class="chartMin"></div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>-->
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
      dialogVisible: false,
      inputStatus: '',
      pagesize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      valueTime: '', // 生成时间筛选
      searchInputName: '', // 单位名称筛选
      pickerOptions: {
        shortcuts: [
          {
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      obj: {
        // 查询巡检报告所需参数
        endTime: '',
        pageNo: '',
        pageSize: '',
        parkName: '',
        reportNature: '',
        startTime: ''
      },
      area: '',
      week: '',
      option: {
        // title: {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.getReport()
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
    // 查询巡检报告列表
    async getReport() {
      this.obj.pageNo = this.currentPage
      this.obj.pageSize = this.pagesize
      const res = await this.$request.weibaoPlan.getReport(this.obj)
      if (res.data === null || res.data === '') {
        this.tableData = []
        this.total = 0
      }
      this.tableData = res.data.rows
      this.total = res.data.totalCount
      this.tableData.forEach(v => {
        if (v.reportNature === '1') {
          v.status = '周'
        }
        if (v.reportNature === '2') {
          v.status = '月'
        }
        if (v.reportNature === '3') {
          v.status = '季度'
        }
        if (v.reportNature === '4') {
          v.status = '年'
        }
      })
    },
    // 根据性质进行筛选
    changeStatus(value) {
      console.log(value)
      if (value === '0') {
        value = ''
      }
      this.currentPage = '1'
      this.obj.reportNature = value
      this.getReport()
    },
    // 根据时间和单位名称筛选
    searchInfo() {
      if (this.valueTime) {
        this.obj.startTime = this.valueTime[0]
        this.obj.endTime = this.valueTime[1]
        this.currentPage = '1'
      }
      if (this.searchInputName) {
        this.obj.parkName = this.searchInputName
        this.currentPage = '1'
      }
      console.log(this.obj)
      this.getReport()
    },
    // 一键导出表格
    exportTable(row) {
      console.log(row.id)
      this.exportForm
        .post('/deviceReport/DownloadQcodeUrl', {
          Id: row.id
        })
        .then(res => {
          const link = document.createElement('a')
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers['content-disposition'] //下载后文件名
          link.download = '维保报告表.xls' //下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查看详情
    lookOver(row) {
      console.log(row)
      this.dialogVisible = true
      this.area = row.parkName
      this.week = row.status
      console.log(this)
      // debugger
      setTimeout(() => {
        this.$chart.myChart('myCharts', this.option)
      }, 50)
    },
    // 分页的功能
    currentChange(currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  padding: 20px 10px;
  .area {
    width: 16%;
    margin-right: 10px;
  }
}
.searchInputTime {
  width: 36%;
  margin: 0 10px;
}
.searchSpan {
  color: #409eff;
  cursor: pointer;
}
.title {
  text-align: center;
  border-top: 1px solid #e6e6e6;
  line-height: 60px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    line-height: 30px;
  }
}
.chartMin {
  padding-top: 0;
  padding-left: 15px;
  height: 263px;
  background-color: #fff;
  text-align: center;
}
</style>

