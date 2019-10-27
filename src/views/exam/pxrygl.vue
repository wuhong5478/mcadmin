<template>
  <div id="app">

    <el-table
            :data="list"
            style="width: 100%"
    >
      <el-table-column
              label="考试名称"
      />
      <el-table-column
              label="试卷名称">

      </el-table-column>
      <el-table-column
              label="考试方向"
      />
      <el-table-column
              label="题目数量">
      </el-table-column>
      <el-table-column
              label="试卷总分"
      />
      <el-table-column
              label="考试时间"
      />
      <el-table-column
              label="考试人数"
      />
      <el-table-column
              label="合格率"
      />
      <el-table-column
              label="优秀率"
      />
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">

        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
              background
              layout="prev, pager, next,total"
              :total="total"
              :page-size="pageQuery.pageSize"
              :current-page.sync="pageQuery.pageNo"
              @current-change="currentChange"
      ></el-pagination>
    </div>


  </div>
</template>
<script>

  export default {
    data() {
      return {
        edit: false,
        del: false,
        listLoading: true,
        list: [],
        typeList: [{label: '菜单', value: '0'}, {label: '按钮', value: '1'}],
        total: 0,
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          name: undefined,
          type: undefined,
          createTime: undefined
        },
        temp: {
          id: undefined,
          name: '',
          type: '',
          createTime: '',
          quantity: '',
          totalPoints: ''
        },
        rules: {
          name: [{ required: true, message: '试卷名称非空！', trigger: 'change' }],
          type: [{ required: true, message: '考试非空！', trigger: 'change' }],
          quantity: [{ required: true, message: '题目数量非空！', trigger: 'change' }],
          totalPoints: [{ required: true, message: '试卷总分非空！', trigger: 'change' }]
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑试卷',
          add: '新增试卷',
          check: '查看试卷'
        },
        subData: {
          questionList: [{
            id: undefined,
            testId: undefined,
            question: '',
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
            rightAnswer: ''
          }]
        }
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style>
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
</style>
