<template>
  <div id="app">
    <el-header style="background:#fff;" class="box-header" height="70px">
      <template>
        新闻名称:
        <el-input placeholder="请输入" v-model="pageQuery.articleName"  size="medium" class="box-header-sel" @change="handleFilter" suffix-icon="el-icon-search">
        </el-input>
        消息类型:
        <el-select v-model="pageQuery.msgType" placeholder="请选择" clearable class="box-header-sel"  size="medium" @change="handleFilter">
          <el-option v-for="item in msgTypeList" :key="item.code" :label="item.msg" :value="item.code"/>
        </el-select>
        文章类型:
        <el-select v-model="pageQuery.articleType" placeholder="请选择" clearable class="box-header-sel"  size="medium" @change="handleFilter">
          <el-option v-for="item in articleTypeList" :key="item.code" :label="item.msg" :value="item.code"/>
        </el-select>
        <!--发送状态:-->
        <!--<el-select v-model="pageQuery.sendStatus" placeholder="请选择" clearable class="box-header-sel"  size="medium">-->
          <!--<el-option v-for="item in sendStatusList" :key="item.code" :label="item.msg" :value="item.code"/>-->
        <!--</el-select>-->
        <el-button size="medium" class="box-header-btn" @click="handleFilter" type="primary">查询</el-button>
      </template>
      <div style="float: right">
        <el-button type="primary" @click="handleAdd" size="medium"><i class="el-icon-plus el-icon&#45;&#45;right"></i>新增</el-button>
        <el-button type="info" @click="batchDelete" size="medium"><i class="el-icon-delete"></i>批量删除</el-button>
      </div>
    </el-header>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" @selection-change="handleSelectionChange" stripe>
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="title" label="新闻标题"/>
      <el-table-column prop="articleType" label="文章类型" :formatter="articleTypeFormat"/>
      <el-table-column prop="msgType" label="消息类型" :formatter="msgTypeFormat"/>
      <el-table-column prop="sendTime" label="发送时间" :formatter="dateFormat"/>
      <el-table-column prop="receiveCount" label="接收人数" :formatter="countFormat"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="amendSpan" @click="handleUpdate(scope.row)">编辑</span>|
          <span class="amendSpan" @click="handleDelete(scope.row)">删除</span>|
          <span class="amendSpan" @click="handleCheck(scope.row)">预览</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next,total"
        :total="total"
        :page-size="pageQuery.limit"
        :current-page.sync="pageQuery.page"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <el-dialog title="查看封面" :visible.sync="dialogModuleVisible" width="30%">
      <el-image :src="imgPath"></el-image>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="文章类型:" prop="articleType" required>
          <el-select v-model="temp.articleType" placeholder="请选择" clearable class="filter-item" :disabled="edit">
            <el-option v-for="item in articleTypeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型:" prop="msgType" required>
          <el-select v-model="temp.msgType" placeholder="请选择" clearable class="filter-item" :disabled="edit">
            <el-option v-for="item in msgTypeList" :key="item.code" :label="item.msg" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="接收机构:" prop="deptIds">
          <el-select v-model="temp.deptIds" multiple placeholder="请选择" clearable class="filter-item" :disabled="edit">
            <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="接收人:" prop="userIds">
          <el-select v-model="temp.userIds" multiple placeholder="请选择" clearable class="filter-item" :disabled="edit">
            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻标题:" prop="title" required>
          <el-input v-model="temp.title" :disabled="edit" class="filter-item"/>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item label="作者:" prop="author">
              <el-input v-model="temp.author" :disabled="edit"/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="封面路径:" prop="titleImg" v-if="dialogStatus==='update'||dialogStatus==='check'">
              <el-input v-model="temp.titleImg" :disabled="true"/>
            </el-form-item>
            <el-form-item label="新闻封面:" v-if="dialogStatus==='add'">
              <template>
                <div class="upload-demo">
                  <form action="upload" id="form" enctype="multipart/form-data" method="post">
                    <input type="file" @change="getFile($event)">
                  </form>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="新闻内容:" prop="contentText">
          <quill-editor ref="text" v-model="temp.contentText" :options="editorOption" class="ql-editor" :disabled="edit"/>
        </el-form-item>
      </el-form>
      <div v-if="!edit" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        editorOption: {},
        edit: false,
        listLoading: true,
        list: [],
        total: 0,
        deptList: [],
        userList: [],
        msgTypeList: [],
        articleTypeList: [],
        sendStatusList: [
          {msg: '发送中', code: '0'},
          {msg: '已发送', code: '1'},
          {msg: '发送失败', code: '2'},
          {msg: '草稿', code: '3'}
        ],
        msgTypeObj: {},
        articleTypeObj: {},
        pageQuery: {
          page: 1,
          limit: 10,
          articleType: '',
          msgType: '',
          articleName: '',
          order: 'desc',
          sort: 'update_time'
        },
        temp: {
          id: undefined,
          title: '',
          titleImg: '',
          msgType: '',
          articleType: '',
          deptIds: '',
          userIds: '',
          receiveNum: '',
          sendTime: '',
          sendStatus: '',
          author: '',
          contentText: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: ''
        },
        rules: {
            title: [
            {
                message: '请输入新闻标题',
                required: true,
                trigger: ['change', 'blur']
            }
            ],
            articleType: [
            {
                message: '请输入文章类型',
                required: true,
                trigger: ['change', 'blur']
            }
            ],
            msgType : [
            {
                message: '请输入类型类型',
                required: true,
                trigger: ['change', 'blur']
            }
            ]
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑新闻',
          add: '新增新闻',
          check: '查看新闻'
        },
        dialogModuleVisible: false,
        imgPath: '',
        selectedList: [],
        file: ''
      }
    },
    created() {
      this.getOptionList()

    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0]
      },
      getPager() {
        this.listLoading = true
        this.$utils.clean(this.pageQuery)
        this.$request.xwgl.getInfolist(this.pageQuery).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      getOptionList() {
        this.$request.xwgl.getTypes().then((res) => {
          this.msgTypeList = res.data.newsType;
          this.pageQuery.msgType=this.msgTypeList[0].code;
          this.articleTypeList = res.data.articleType
          this.msgTypeObj = this.$utils.getMap(this.msgTypeList, 'code', 'msg')
          this.articleTypeObj = this.$utils.getMap(this.articleTypeList, 'code', 'msg')
            this.getPager();
        })
        const params = { pageNo: -1, pageSize: 1000 }
        this.$request.zzjg.queryInstitutions(params).then(res => {
          this.deptList = res.data.rows
        })
        this.$request.systemUser.demandUser(params).then(res => {
          this.userList = res.data.rows
        })
      },
      handleFilter() {
        this.pageQuery.page = 1
        this.getPager()
      },
      currentChange(currentPage) {
        this.pageQuery.page = currentPage
        this.getPager()
      },
      dateFormat(row, column) {  //yyyy-MM-dd
        const str = row[column.property]
        if (str == null || str === '') {
          return ''
        }
        const date = new Date(str)
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
      },
      msgTypeFormat(row) {
        return this.msgTypeObj.get(row.msgType)
      },
      articleTypeFormat(row) {
        return this.articleTypeObj.get(row.articleType)
      },
      countFormat(row) {
        if (row.userIds === '' || row.userIds === null) {
          return '所有人'
        }
        const arr = row.userIds.split(',')
        return arr.length
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          title: '',
          titleImg: '',
          msgType: '',
          articleType: '',
          deptIds: '',
          userIds: '',
          receiveNum: '',
          sendTime: '',
          sendStatus: '',
          author: '',
          contentText: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: ''
        }
      },
      handleAdd() {
        this.resetTemp()
        this.edit = false
        this.dialogStatus = 'add'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async addData() {
          await this.$refs.dataForm.validate()
        if (this.file === '' || this.file === undefined) {
          this.$message.error('请上传封面!')
          return
        }
        let formData = new FormData()
        formData.append('img', this.file)
        const res = await this.instance.post('/uploadFile', formData)
        this.temp.deptIds = this.temp.deptIds.toString()
        this.temp.userIds = this.temp.userIds.toString()
        this.temp.titleImg = res.data.data
        const resp = await this.addDanger.post("/create",this.temp)
        if (resp.data.code === 200) {
          this.getPager()
          this.dialogFormVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error(resp.message)
        }
      },
      handleUpdate(row) {

        this.edit = false
        this.temp = Object.assign({}, row)
        if (this.temp.deptIds != null)
          this.temp.deptIds = this.temp.deptIds.split(',')
        if (this.temp.userIds != null)
          this.temp.userIds = this.temp.userIds.split(',')
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
        async updateData() {
          await this.$refs.dataForm.validate()
          this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.deptIds = this.temp.deptIds.toString()
            this.temp.userIds = this.temp.userIds.toString()
            const tempData = Object.assign({}, this.temp)
            this.addDanger.post('/update', tempData).then(res => {
              if (res.data.code === 200) {
                this.getPager()
                this.dialogFormVisible = false
                this.$message.success('修改成功')
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm('确认删除此新闻?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.xwgl.deleteInfo(row.id).then((res) => {
            if (res.code === 200) {
              this.getPager()
              this.$message.success('删除成功')
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      handleCheck(row) {
        this.temp = Object.assign({}, row)
        if (this.temp.deptIds != null)
          this.temp.deptIds = this.temp.deptIds.split(',')
        if (this.temp.userIds != null)
          this.temp.userIds = this.temp.userIds.split(',')
        this.edit = true
        this.dialogStatus = 'check'
        this.dialogFormVisible = true
      },
      batchDelete() {
        let ids = ''
        for (let i = 0; i < this.selectedList.length; i++) {
          ids = ids + '=' + this.selectedList[i].id + '&ids'
        }
        ids = ids.substr(0, ids.length - 4)
        this.instance.post('/deleteBatch?ids' + ids).then(res => {
          if (res.data.code === 200) {
            this.getPager()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handleSelectionChange(val) {
        this.selectedList = val
      }
    }
  }
</script>
<style>
  .box-header {
    overflow: hidden;
    padding: 20px 10px;
    height: 20px;
    font-size: 14px;
    color: #606266;
  }
  .box-header-sel {
    width: 12%;
    margin-right: 10px;
  }
  .amendSpan {
    color: #0080d0;
    cursor: pointer;
  }
  .ql-editor{
    height:400px;
  }
</style>
