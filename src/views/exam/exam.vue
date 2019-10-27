<template>
  <div id="app">

    <el-container>
      <el-header style="padding-top:1%; padding-left:2%">
        <div style="float: right">
          考试名称:
          <el-input placeholder="请输入内容" v-model="pageQuery.testName" style="width: 240px" size="small" class="filter-item">
            <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
          </el-input>
          试卷名称:
          <el-input placeholder="请输入内容" v-model="pageQuery.title" style="width: 240px" size="small" class="filter-item">
            <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
          </el-input>
          考试方向:
          <el-select v-model="pageQuery.type"
                     placeholder="请输入"
                     clearable
                     class="filter-item" size="small"
          >
            <el-option v-for="item in typeList" :key="item.code" :label="item.msg" :value="item.code" />
          </el-select>
        </div>
      </el-header>
    </el-container>

    <el-table :data="list" stripe style="width: 100%" stripe>
      <el-table-column prop="testName" label="考试名称" />
      <el-table-column prop="title" label="试卷名称" />
      <el-table-column prop="type" label="考试方向" :formatter="typeFormat" />
      <el-table-column prop="questionCount" label="题目数量" />
      <el-table-column prop="totalScore" label="试卷总分" />
      <el-table-column prop="createTime" label="考试时间" :formatter="dateFormat" />
      <el-table-column prop="userCount" label="考试人数" />
      <el-table-column prop="passRate" label="合格率" />
      <el-table-column prop="excellentRate" label="优秀率" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <span @click="handleView(scope.row)" class="amendSpan">查看</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div style="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next,total"
        :total="total"
        :page-size="pageQuery.pageSize"
        :current-page.sync="pageQuery.pageIndex"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <el-dialog title="查看成绩" :visible.sync="dialogFormVisible" width="40%">
      <div style="overflow:auto;">
        <el-table :data="scoreList" stripe style="width: 100%">
          <el-table-column type="index" label="排名"/>
          <el-table-column prop="userName" label="姓名"/>
          <el-table-column prop="score" label="分数"/>
          <el-table-column prop="level" label="评级" :formatter="levelFormat"/>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import request from '@/api/request'
  import moment from 'moment'
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      pageQuery: {
        pageIndex: 1,
        pageSize: 10,
        title: '',
        testName: '',
        createTime: ''
      },
      typeList: [
        {msg: '消防应急知识', code: '1'},
        {msg: '消防案例', code: '2'},
        {msg: '法律法规', code: '3'},
        {msg: '常见防火灭火小常识', code: '4'},
        {msg: '常用灭火设施器材维护', code: '5'}
      ],
      typeObj: {},
      temp: {
        id: undefined,
        testName: '',
        title: '',
        type : '',
        questionCount: '',
        totalScore: '',
        testTime: '',
        userCount: '',
        passRate: '',
        excellentRate: '',
      },
      rules: {},
      dialogFormVisible: false,
      scoreList: []
    }
  },
  created() {
    this.getPager()
    this.getOptionList()
  },
  methods: {
    handleFilter() {
      this.pageQuery.pageIndex = 1
      this.getPager()
    },
    getPager() {
      this.listLoading = true
      this.$utils.clean(this.pageQuery)
      const params = this.pageQuery
      request.get('/exam', {params}).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    getOptionList() {
      this.typeObj = this.$utils.getMap(this.typeList, 'code', 'msg')
    },
    typeFormat(row) {
      return this.typeObj.get(row.type)
    },
    levelFormat(row) {
      const score = row.score
      if (score === null || score === '') {
        return '未考试'
      } else if (score < 60) {
        return '不及格'
      } else if (score < 90) {
        return '及格'
      } else {
        return '优秀'
      }
    },
    dateFormat(row) {
      if (row.testTime===null || row.testTime==='')
        return ''
      return moment(row.testTime).format('YYYY-MM-DD')
    },
    handleView(row) {
      this.temp = Object.assign({}, row)
      request.get('/exam/score/'+this.temp.id+'?pageIndex=1&pageSize=1000').then(res => {
        this.scoreList = res.data.list;
      })
      this.dialogFormVisible = true
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPager()
    }
  }
}
</script>
<style lang="less" scoped>
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
</style>
