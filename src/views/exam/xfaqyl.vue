<template>
  <div id="app">
    <el-header style="background:#fff;">
      <div style="float: right">
        试卷名称:
        <el-input
          placeholder="请输入内容"
          v-model="pageQuery.title"
          style="width: 240px"
          size="small"
          class="filter-item"
        >
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>考试方向:
        <el-select
          v-model="pageQuery.type"
          placeholder="请输入"
          clearable
          class="filter-item"
          size="small"
        >
          <el-option
            v-for="item in typeList"
            :key="item.code"
            :label="item.msg"
            :value="item.code"
          />
        </el-select>创建时间:
        <el-date-picker
          v-model="pageQuery.createTime"
          type="date"
          placeholder="选择时间"
          value-format="yyyy-MM-dd"
          style="width: 200px;"
          size="small"
        />
        <el-button type="primary" @click="handleAdd" size="mini">新增</el-button>
      </div>
    </el-header>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" stripe>
      <el-table-column prop="title" label="试卷名称" />
      <el-table-column prop="type" label="考试类型" :formatter="typeFormat" />
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" />
      <el-table-column prop="questionCount" label="题目数量" />
      <el-table-column prop="totalScore" label="试卷总分" />
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <span class="amendSpan" @click="handleCheck(scope.row)">查看</span>|
          <span class="amendSpan" @click="handleUpdate(scope.row)">编辑</span>|
          <span class="amendSpan" @click="handleDelete(scope.row)">删除</span>|
          <span class="amendSpan" @click="handleExam(scope.row)">考试</span>
        </template>
      </el-table-column>
    </el-table>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="90px"
      >
        <el-form-item label="试卷名称:" prop="title">
          <el-input v-model="temp.title" style="width: 60%" :disabled="edit" />
        </el-form-item>
        <el-form-item label="考试类型:" prop="type">
          <el-select
            v-model="temp.type"
            placeholder="请选择"
            clearable
            class="filter-item"
            :disabled="edit"
          >
            <el-option
              v-for="item in typeList"
              :key="item.code"
              :label="item.msg"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="总分:" prop="totalScore">
          <el-input v-model="temp.totalScore" style="width: 60%" :disabled="edit" />
        </el-form-item>
        <el-form-item label="阅读材料:" prop="content">
          <el-input rows="8" type="textarea" v-model="temp.content" :disabled="edit" />
        </el-form-item>
      </el-form>
      <el-form :model="subData" :inline="true" ref="subDataForm" label-width="90px" size="medium">
        <el-row
          v-for="(item,index) in subData.questionList"
          :key="index"
          style="border-bottom: 1px solid #f0f0f0;padding: 10px;"
        >
          <el-row>
            <el-form-item
              label="题目1:"
              :prop="'questionList.' + index + '.title'"
              :rules="[{ required: true, message: '题目内容不能为空',trigger: 'change'}]"
            >
              <el-input
                v-model="item.title"
                placeholder="请输入题目内容"
                style="width: 700px"
                :disabled="edit"
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="A:"
              :prop="'questionList.' + index + '.optionA'"
              :rules="[{ required: true, message: '选项不能为空',trigger: 'change'}]"
            >
              <el-input v-model="item.optionA" style="width: 120px" :disabled="edit" />
            </el-form-item>
            <el-form-item
              label="B:"
              label-width="40px"
              :prop="'questionList.' + index + '.optionB'"
              :rules="[{ required: true, message: '选项不能为空',trigger: 'change'}]"
            >
              <el-input v-model="item.optionB" style="width: 120px" :disabled="edit" />
            </el-form-item>
            <el-form-item
              label="C:"
              label-width="40px"
              :prop="'questionList.' + index + '.optionC'"
              :rules="[{ required: true, message: '选项不能为空',trigger: 'change'}]"
            >
              <el-input v-model="item.optionC" style="width: 120px" :disabled="edit" />
            </el-form-item>
            <el-form-item
              label="D:"
              label-width="40px"
              :prop="'questionList.' + index + '.optionD'"
              :rules="[{ required: true, message: '选项不能为空',trigger: 'change'}]"
            >
              <el-input v-model="item.optionD" style="width: 120px" :disabled="edit" />
            </el-form-item>
            <el-form-item
              label="正确答案:"
              :prop="'questionList.' + index + '.answer'"
              :rules="[{ required: true, message: '答案不能为空',trigger: 'change'}]"
            >
              <el-input v-model="item.answer" style="width: 50px" :disabled="edit" />
            </el-form-item>
          </el-row>
          <el-button type="danger" v-if="del" size="medium" @click="removeRow(index)">删除</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" v-if="!edit" size="medium" @click="addRow">增加题目</el-button>
          <!-- <form action="upload" id="form" enctype="multipart/form-data" method="post">
            <a href="javascript:;" class="upload">
              批量新增
              <input class="change" type="file" name="file" ref="fileInt" />
            </a>
          </form>-->
        </el-row>
      </el-form>
      <div v-if="!edit" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="考试信息" :visible.sync="dialogInfoVisible" width="40%">
      <el-form
        ref="infoForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="90px"
      >
        <el-form-item label="考试名称:" prop="testName">
          <el-input v-model="temp.testName" style="width: 60%" />
        </el-form-item>
        <el-form-item label="考试机构:" prop="deptIds">
          <el-select
            v-model="temp.deptIds"
            multiple
            placeholder="请选择"
            clearable
            class="filter-item"
          >
            <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间:" prop="testTime">
          <el-date-picker
            v-model="temp.testTime"
            type="date"
            placeholder="选择时间"
            value-format="yyyy-MM-dd"
            style="width: 200px;"
            size="small"
          />
        </el-form-item>
        <el-form-item label="考试人员:" prop="userIds">
          <el-select
            v-model="temp.userIds"
            multiple
            placeholder="请选择"
            clearable
            class="filter-item"
          >
            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="!edit" slot="footer" class="dialog-footer">
        <el-button @click="dialogInfoVisible = false">取消</el-button>
        <el-button type="primary" @click="infoData()">保存</el-button>
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
      edit: false,
      del: false,
      listLoading: true,
      list: [],
      total: 0,
      pageQuery: {
        pageIndex: 1,
        pageSize: 10,
        title: '',
        type: '',
        createTime: ''
      },
      typeList: [
        { msg: '消防应急知识', code: '1' },
        { msg: '消防案例', code: '2' },
        { msg: '法律法规', code: '3' },
        { msg: '常见防火灭火小常识', code: '4' },
        { msg: '常用灭火设施器材维护', code: '5' }
      ],
      typeObj: {},
      deptList: [],
      userList: [],
      temp: {
        id: undefined,
        title: '',
        type: '',
        totalScore: '',
        content: '',
        createTime: '',
        questionCount: '',
        questionList: [],
        deptIds: '',
        userIds: '',
        userCount: '',
        testTime: '',
        testName: ''
      },
      rules: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑试卷',
        add: '新增试卷',
        check: '查看试卷'
      },
      subData: {
        questionList: [
          {
            id: undefined,
            examId: undefined,
            title: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: ''
          }
        ]
      },
      dialogInfoVisible: false
    }
  },
  created() {
    this.getOptionList()
    this.getPager()
  },
  methods: {
    getPager() {
      this.listLoading = true
      this.$utils.clean(this.pageQuery)
      const params = this.pageQuery
      request.get('/exam', { params }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    getOptionList() {
      this.typeObj = this.$utils.getMap(this.typeList, 'code', 'msg')
      const params = { pageNo: -1, pageSize: 1000 }
      this.$request.zzjg.queryInstitutions(params).then(res => {
        this.deptList = res.data.rows
      })
      this.$request.systemUser.demandUser(params).then(res => {
        this.userList = res.data.rows
      })
    },
    handleFilter() {
      this.pageQuery.pageIndex = 1
      this.getPager()
    },
    currentChange(currentPage) {
      this.pageQuery.pageIndex = currentPage
      this.getUser()
    },
    dateFormat(row, column) {
      //yyyy-MM-dd
      const str = row[column.property]
      if (str == null || str === '') {
        return ''
      }
      const date = new Date(str)
      return (
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      )
    },
    typeFormat(row) {
      return this.typeObj.get(row.type)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        type: '',
        totalScore: '',
        content: '',
        createTime: '',
        questionCount: '',
        questionList: [],
        deptIds: '',
        userIds: '',
        userCount: '',
        testTime: '',
        testName: ''
      }
      this.subData.questionList = [
        {
          id: undefined,
          examId: undefined,
          title: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          answer: ''
        }
      ]
    },
    handleAdd() {
      this.resetTemp()
      this.edit = false
      this.del = false
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs['subDataForm'].clearValidate()
      })
    },
    addData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$refs['subDataForm'].validate(subValid => {
            if (subValid) {
              this.temp.questionList = this.subData.questionList
              this.addDanger.post('/exam', this.temp).then(res => {
                if (res.data.code === 200) {
                  this.getPager()
                  this.dialogFormVisible = false
                  this.$message.success('添加成功')
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          })
        }
      })
    },
    getTestAndQuestionList(row) {
      this.temp = Object.assign({}, row)
      this.instance.get('/question?examId=' + row.id).then(res => {
        if (res.data.code === 200) {
          this.subData.questionList = res.data.data
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.getTestAndQuestionList(row)
      this.edit = false
      if (this.subData.questionList.length > 1) this.del = true
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$refs['subDataForm'].validate(subValid => {
            if (subValid) {
              this.temp.questionList = this.subData.questionList
              this.addDanger.post('/exam', this.temp).then(res => {
                if (res.data.code === 200) {
                  this.getPager()
                  this.dialogFormVisible = false
                  this.$message.success('修改成功')
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除此试卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.instance.delete('/exam/' + row.id).then(res => {
            if (res.data.code === 200) {
              this.getPager()
              this.$message.success('删除成功')
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleCheck(row) {
      this.temp = Object.assign({}, row)
      this.getTestAndQuestionList(row)
      this.edit = true
      this.del = false
      this.dialogStatus = 'check'
      this.dialogFormVisible = true
    },
    handleExam(row) {
      this.temp = Object.assign({}, row)
      if (this.temp.testTime != null)
        this.temp.testTime = moment(this.temp.testTime).format('YYYY-MM-DD')
      if (this.temp.deptIds != null && this.temp.deptIds != '')
        this.temp.deptIds = this.temp.deptIds.split(',')
      if (this.temp.userIds != null && this.temp.userIds != '')
        this.temp.userIds = this.temp.userIds.split(',')
      this.dialogInfoVisible = true
    },
    infoData() {
      this.temp.deptIds = this.temp.deptIds.toString()
      this.temp.userIds = this.temp.userIds.toString()
      this.addDanger
        .post(
          '/exam/start?deptIds=' +
            this.temp.deptIds +
            '&examId=' +
            this.temp.id +
            '&userIds=' +
            this.temp.userIds +
            '&testTime=' +
            this.temp.testTime +
            '&testName=' +
            this.temp.testName
        )
        .then(res => {
          if (res.data.code === 200) {
            this.getPager()
            this.dialogInfoVisible = false
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    addRow() {
      this.subData.questionList.push({
        id: undefined,
        examId: undefined,
        title: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: ''
      })
      if (this.subData.questionList.length > 1) this.del = true
    },
    removeRow(index) {
      if (this.subData.questionList.length === 2) this.del = false
      this.subData.questionList.splice(index, 1)
    }
  }
}
</script>
<style>
.amendSpan {
  color: #0080d0;
  cursor: pointer;
}

.upload {
  padding: 4px 10px;
  height: 20px;
  display: inline-block;

  line-height: 20px;
  position: relative;
  text-decoration: none;
  color: #fff;
  background-color: #409eff;
  border-radius: 4px;
}
.change {
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
}
#form {
  display: inline-block;
}
</style>
